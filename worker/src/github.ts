import { Octokit } from "@octokit/rest";
import { config, GH_OWNER, GH_REPO } from "./config.js";

const octokit = new Octokit({ auth: config.githubToken });
const committer = { name: config.botName, email: config.botEmail };

export interface RepoFile {
	content: string;
	sha: string;
}

/** Read a file at the sync branch. Returns null if it doesn't exist. */
export async function getFile(path: string, ref = config.githubBranch): Promise<RepoFile | null> {
	try {
		const res = await octokit.repos.getContent({ owner: GH_OWNER, repo: GH_REPO, path, ref });
		const data = res.data as { type?: string; content?: string; sha: string };
		if (Array.isArray(data) || data.type !== "file" || typeof data.content !== "string") {
			return null;
		}
		return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
	} catch (err) {
		if ((err as { status?: number }).status === 404) return null;
		throw err;
	}
}

/** List subdirectory names under a path. Returns [] if the path doesn't exist. */
export async function listDir(path: string, ref = config.githubBranch): Promise<string[]> {
	try {
		const res = await octokit.repos.getContent({ owner: GH_OWNER, repo: GH_REPO, path, ref });
		if (!Array.isArray(res.data)) return [];
		return res.data.filter((e) => e.type === "dir").map((e) => e.name);
	} catch (err) {
		if ((err as { status?: number }).status === 404) return [];
		throw err;
	}
}

/** Create or update a file. Pass the current sha when updating. Marker is appended so the Action ignores the echo. */
export async function putFile(path: string, content: string, message: string, sha?: string): Promise<string> {
	const res = await octokit.repos.createOrUpdateFileContents({
		owner: GH_OWNER,
		repo: GH_REPO,
		path,
		branch: config.githubBranch,
		message: `${message} ${config.commitMarker}`,
		content: Buffer.from(content, "utf8").toString("base64"),
		sha,
		committer,
		author: committer,
	});
	return res.data.commit.sha ?? "";
}

/** Raise a conflict / comment-loss flag as a GitHub issue. */
export async function createIssue(title: string, body: string, labels = ["skills-sync"]): Promise<string> {
	const res = await octokit.issues.create({ owner: GH_OWNER, repo: GH_REPO, title, body, labels });
	return res.data.html_url;
}

/** Was the latest commit touching `path` authored by our sync bot? Used as a secondary echo guard. */
export async function lastCommitWasBot(path: string): Promise<boolean> {
	const res = await octokit.repos.listCommits({ owner: GH_OWNER, repo: GH_REPO, path, per_page: 1 });
	const msg = res.data[0]?.commit.message ?? "";
	const email = res.data[0]?.commit.author?.email ?? "";
	return msg.includes(config.commitMarker) || email === config.botEmail;
}
