import { Octokit } from "@octokit/rest";
import { config, requireEnv } from "./config.js";

const committer = { name: config.botName, email: config.botEmail };

/**
 * The client is built on FIRST USE, never at import. The Workers platform imports this bundle
 * during deploy (capability introspection) BEFORE any secrets are set, so constructing Octokit at
 * module scope could capture an empty auth string — and GitHub answers an empty credential with the
 * same 401 "Bad credentials" a genuinely dead PAT produces, making the two indistinguishable.
 * Reading the secret lazily via requireEnv() means an unset GITHUB_TOKEN names itself instead.
 */
let client: Octokit | undefined;
function api(): Octokit {
	if (!client) client = new Octokit({ auth: requireEnv("GITHUB_TOKEN") });
	return client;
}

/**
 * owner/repo resolved at use time. Resolving at import turned an unset GITHUB_REPO into
 * `undefined/undefined`, which GitHub answers with 404 — and getFile() maps 404 to null, so a
 * missing or stale repo config surfaced as a silent no-op rather than an error.
 */
function repoRef(): { owner: string; repo: string } {
	const [owner, name] = (config.githubRepo || "").split("/");
	if (!owner || !name) {
		throw new Error(
			`GITHUB_REPO is not a valid "owner/repo" value ` +
				`(got ${config.githubRepo ? `"${config.githubRepo}"` : "empty"}) ` +
				`(set via 'ntn workers env set GITHUB_REPO=owner/name')`,
		);
	}
	return { owner, repo: name };
}

/** Strip anything shaped like a GitHub credential so no token material can reach a log or an issue. */
function redact(text: string): string {
	return text.replace(/\b(github_pat_|ghp_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9_]+/g, "$1<redacted>");
}

/**
 * Turn GitHub's opaque credential rejections into a message naming the credential, the status, and
 * the operation. Everything else — 404 in particular — passes through untouched, because callers
 * translate 404 into null/[] deliberately.
 */
function explain(err: unknown, operation: string): unknown {
	const status = (err as { status?: number } | null)?.status;
	if (status !== 401 && status !== 403) return err;

	// Octokit appends " - https://docs.github.com/rest" to API messages; drop it as noise.
	const apiMessage = redact(String((err as { message?: string }).message ?? ""))
		.replace(/\s+-\s+https?:\/\/\S+$/, "")
		.trim();
	const [verb, hint] =
		status === 401
			? ["rejected", "the token is invalid, expired, or revoked — mint a new one and re-run 'ntn workers env set GITHUB_TOKEN=...'"]
			: ["refused", "check the token's repository permissions (Contents R/W, Metadata R, Issues R/W) and its expiry"];

	const wrapped = new Error(
		`GITHUB_TOKEN ${verb} by GitHub (${status} ${apiMessage || (status === 401 ? "Bad credentials" : "Forbidden")}) ` +
			`while ${operation} — ${hint}`,
	);
	(wrapped as { status?: number }).status = status;
	(wrapped as { cause?: unknown }).cause = err;
	return wrapped;
}

async function call<T>(operation: string, fn: (octokit: Octokit) => Promise<T>): Promise<T> {
	try {
		return await fn(api());
	} catch (err) {
		throw explain(err, operation);
	}
}

export interface RepoFile {
	content: string;
	sha: string;
}

/** Read a file at the sync branch. Returns null if it doesn't exist. */
export async function getFile(path: string, ref = config.githubBranch): Promise<RepoFile | null> {
	const { owner, repo } = repoRef();
	try {
		return await call(`reading ${path} from ${owner}/${repo} (ref ${ref})`, async (octokit) => {
			const res = await octokit.repos.getContent({ owner, repo, path, ref });
			const data = res.data as { type?: string; content?: string; sha: string };
			if (Array.isArray(data) || data.type !== "file" || typeof data.content !== "string") {
				return null;
			}
			return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
		});
	} catch (err) {
		if ((err as { status?: number }).status === 404) return null;
		throw err;
	}
}

/** List subdirectory names under a path. Returns [] if the path doesn't exist. */
export async function listDir(path: string, ref = config.githubBranch): Promise<string[]> {
	const { owner, repo } = repoRef();
	try {
		return await call(`listing ${path} in ${owner}/${repo} (ref ${ref})`, async (octokit) => {
			const res = await octokit.repos.getContent({ owner, repo, path, ref });
			if (!Array.isArray(res.data)) return [];
			return res.data.filter((e) => e.type === "dir").map((e) => e.name);
		});
	} catch (err) {
		if ((err as { status?: number }).status === 404) return [];
		throw err;
	}
}

/** Create or update a file. Pass the current sha when updating. Marker is appended so the Action ignores the echo. */
export async function putFile(path: string, content: string, message: string, sha?: string): Promise<string> {
	const { owner, repo } = repoRef();
	return call(`writing ${path} to ${owner}/${repo} (branch ${config.githubBranch})`, async (octokit) => {
		const res = await octokit.repos.createOrUpdateFileContents({
			owner,
			repo,
			path,
			branch: config.githubBranch,
			message: `${message} ${config.commitMarker}`,
			content: Buffer.from(content, "utf8").toString("base64"),
			sha,
			committer,
			author: committer,
		});
		return res.data.commit.sha ?? "";
	});
}

let repoPrivate: boolean | null = null;

/**
 * Is the sync target repo private? Cached for the life of the run: visibility rarely changes and
 * the publish guard asks on every push. A failed lookup answers "public", which keeps the guard
 * fail-safe — publishBlock() then blocks the write rather than risking a leak. That means this one
 * call deliberately swallows auth errors instead of surfacing them like the rest of this module.
 */
export async function repoIsPrivate(): Promise<boolean> {
	if (repoPrivate !== null) return repoPrivate;
	const { owner, repo } = repoRef();
	try {
		const res = await api().repos.get({ owner, repo });
		repoPrivate = Boolean(res.data.private);
	} catch {
		repoPrivate = false;
	}
	return repoPrivate;
}

/** Raise a conflict / comment-loss flag as a GitHub issue. */
export async function createIssue(title: string, body: string, labels = ["skills-sync"]): Promise<string> {
	const { owner, repo } = repoRef();
	return call(`opening an issue on ${owner}/${repo}`, async (octokit) => {
		const res = await octokit.issues.create({ owner, repo, title, body, labels });
		return res.data.html_url;
	});
}

/** Was the latest commit touching `path` authored by our sync bot? Used as a secondary echo guard. */
export async function lastCommitWasBot(path: string): Promise<boolean> {
	const { owner, repo } = repoRef();
	return call(`listing commits for ${path} in ${owner}/${repo}`, async (octokit) => {
		const res = await octokit.repos.listCommits({ owner, repo, path, per_page: 1 });
		const msg = res.data[0]?.commit.message ?? "";
		const email = res.data[0]?.commit.author?.email ?? "";
		return msg.includes(config.commitMarker) || email === config.botEmail;
	});
}
