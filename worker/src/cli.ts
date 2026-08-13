/**
 * Local sync CLI — exercise the worker without ntn/deploy. Loads worker/.env.
 *
 *   npx tsx src/cli.ts dry        <pageId|url>     # read-only: print composed SKILL.md (needs NOTION_TOKEN only)
 *   npx tsx src/cli.ts to-github  <pageId|url>     # Notion -> GitHub (needs NOTION_TOKEN + GITHUB_TOKEN)
 *   npx tsx src/cli.ts to-notion  <repoPath>       # GitHub -> Notion (needs NOTION_TOKEN + GITHUB_TOKEN)
 */
import { pushToGitHub, pushToNotion, dryRunCompose } from "./sync.js";

async function main() {
	const [cmd, arg] = process.argv.slice(2);
	if (!cmd || !arg) {
		console.error("usage: tsx src/cli.ts dry|to-github <pageId>  |  to-notion <repoPath>");
		process.exit(1);
	}
	if (cmd === "dry") {
		console.log(await dryRunCompose(arg));
	} else if (cmd === "to-github") {
		console.log(JSON.stringify(await pushToGitHub(arg), null, 2));
	} else if (cmd === "to-notion") {
		console.log(JSON.stringify(await pushToNotion(arg), null, 2));
	} else {
		console.error(`unknown command: ${cmd}`);
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
