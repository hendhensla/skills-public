/**
 * Token-free self-test of the custom logic (diff engine + frontmatter).
 * Imports only diff.ts and frontmatter.ts (type-only Notion imports are erased),
 * so it runs without any Notion/GitHub credentials.   npx tsx src/selftest.ts
 */
import { computeDiff } from "./diff.js";
import { parseSkillFile, composeSkillFile } from "./frontmatter.js";

let failures = 0;
function check(name: string, cond: boolean, extra?: unknown) {
	if (cond) console.log(`  ok  ${name}`);
	else {
		console.error(`  XX  ${name}`, extra ?? "");
		failures++;
	}
}

const base = "# Title\n\nAlpha paragraph.\n\nBeta paragraph.\n\nGamma paragraph.\n";

console.log("modify a paragraph:");
{
	const next = base.replace("Beta paragraph.", "Beta paragraph edited.");
	const d = computeDiff(base, next);
	check("not ambiguous", !d.ambiguous, d);
	check(
		"update rewrites Beta -> Beta edited",
		d.updates.some((u) => u.old_str.includes("Beta paragraph.") && u.new_str.includes("Beta paragraph edited.")),
		d.updates,
	);
	check("no deletion flagged", d.hasDeletions === false, d);
}

console.log("delete a paragraph:");
{
	const next = base.replace("Beta paragraph.\n\n", "");
	const d = computeDiff(base, next);
	check("hasDeletions true", d.hasDeletions === true, d);
	check("removedSegments includes Beta", d.removedSegments.some((s) => s.includes("Beta paragraph.")), d.removedSegments);
	check("update empties Beta", d.updates.some((u) => u.old_str.includes("Beta paragraph.") && !u.new_str.includes("Beta paragraph.")), d.updates);
}

console.log("insert a paragraph:");
{
	const next = base + "\nDelta paragraph.\n";
	const d = computeDiff(base, next);
	check("not ambiguous", !d.ambiguous, d);
	check("adds Delta", d.updates.some((u) => u.new_str.includes("Delta paragraph.")), d.updates);
}

console.log("comment-delete guard logic:");
{
	const next = base.replace("Beta paragraph.\n\n", "");
	const d = computeDiff(base, next);
	const onDeleted = [{ text: "Beta paragraph." }].filter((cb) => d.removedSegments.some((seg) => seg.includes(cb.text)));
	check("detects comment on deleted Beta", onDeleted.length === 1, onDeleted);
	const onSurviving = [{ text: "Gamma paragraph." }].filter((cb) => d.removedSegments.some((seg) => seg.includes(cb.text)));
	check("ignores comment on surviving Gamma", onSurviving.length === 0, onSurviving);
}

console.log("frontmatter parse/compose roundtrip:");
{
	const md = [
		"---",
		"name: deal",
		"skill: Deal",
		"description: test desc",
		"status: Active",
		"category:",
		"  - Research",
		"notion_row: https://www.notion.so/abc",
		"notion_doc: https://www.notion.so/def",
		"---",
		"",
		"Body line one.",
		"",
	].join("\n");
	const p = parseSkillFile(md);
	check("slug=deal", p.slug === "deal", p.slug);
	check("skill=Deal", p.meta.skill === "Deal", p.meta);
	check("category=[Research]", JSON.stringify(p.meta.category) === JSON.stringify(["Research"]), p.meta.category);
	check("docUrl mapped", p.meta.docUrl === "https://www.notion.so/def", p.meta.docUrl);
	check("body parsed", p.body.trim() === "Body line one.", JSON.stringify(p.body));
	const reparsed = parseSkillFile(composeSkillFile(p));
	check("roundtrip slug", reparsed.slug === "deal", reparsed.slug);
	check("roundtrip status", reparsed.meta.status === "Active", reparsed.meta.status);
	check("roundtrip body", reparsed.body.trim() === "Body line one.", JSON.stringify(reparsed.body));
}

console.log(failures === 0 ? "\nALL PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
