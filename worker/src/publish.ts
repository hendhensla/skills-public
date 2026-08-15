/**
 * Publish guard for the public mirror.
 *
 * A Worker row documents the callable tool surface of a deployed Worker, which is what an
 * outside agent needs. Some of those tools drive an agent browser: they open a signed-in
 * session, read authenticated pages, and act as the account owner. A document that spells out
 * how to do that is an operating runbook for a logged-in browser, so it must not reach a public
 * repository, although the row itself is fine to keep in Notion.
 *
 * Decision order:
 *   1. PUBLISH_BROWSER_DOCS=1 in worker env -> allow. Use it when every target repo is trusted.
 *   2. A "publish: public" line on the page -> allow. An explicit, per-row human override.
 *   3. The target repo is private           -> allow. Nothing becomes public.
 *   4. The text names agent-browser usage   -> block, reported as a no-op with the reason.
 *
 * The check reads the fully composed SKILL.md (frontmatter plus body), so it also catches a
 * browser tool that is only named in prose. This module has no static imports on purpose: the
 * detection half stays pure, so the token-free self-test can exercise it.
 */

interface Signal {
	label: string;
	re: RegExp;
}

// Deliberately narrow. "web" or "http" alone would block most of the catalog, so every pattern
// below names browser control or a browser-automation runtime explicitly.
const SIGNALS: Signal[] = [
	{ label: "agent browser", re: /\bagent[- ]browser\b|\bbrowser[- ]agent\b|\bbrowser use\b/i },
	{
		label: "browser control",
		re: /\bbrowser (automation|control|session|profile|cookies?|login|credentials|tab)\b/i,
	},
	{ label: "browser tool call", re: /terminalWithBrowser|browser[-_]?user[-_]?input|browserbase|browserless/i },
	{ label: "headless browser", re: /\bheadless (browser|chrome|chromium|firefox|webkit)\b/i },
	{ label: "browser driver", re: /\bplaywright\b|\bpuppeteer\b|\bselenium\b|\bwebdriver\b|\bchrome devtools protocol\b/i },
	{ label: "signed-in browsing", re: /\b(signed[- ]in|logged[- ]in|authenticated) (browser|browsing|session)\b/i },
	{ label: "web scraping", re: /\bweb scrap(e|es|ing|er)\b|\bscrape (the )?(web|site|page)\b/i },
];

const OVERRIDE = /^[\t >]*(?:<!--\s*)?publish:\s*public\b/im;

const truthy = (v: string | undefined): boolean => v === "1" || v?.toLowerCase() === "true";

/** Every browser-usage signal found in the text. Pure, so the self-test can call it. */
export function browserSignals(text: string): string[] {
	return SIGNALS.filter((s) => s.re.test(text)).map((s) => s.label);
}

/** True when the page carries the explicit per-row override. */
export function hasPublishOverride(text: string): boolean {
	return OVERRIDE.test(text);
}

/**
 * The reason this composed file must not be written to the configured repo, or null to allow.
 * Repo visibility comes from GitHub and is cached, so this half needs GITHUB_TOKEN like the rest
 * of the sync. The import is dynamic to keep the detection half credential-free.
 */
export async function publishBlock(text: string): Promise<string | null> {
	if (truthy(process.env.PUBLISH_BROWSER_DOCS)) return null;
	if (hasPublishOverride(text)) return null;
	const signals = browserSignals(text);
	if (!signals.length) return null;
	const { repoIsPrivate } = await import("./github.js");
	if (await repoIsPrivate()) return null;
	return `documents agent-browser usage (${signals.join(", ")}) and the target repo is public`;
}
