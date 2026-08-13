/**
 * Proves the comment-preservation mechanism: a targeted update_content edit to ONE block
 * leaves every OTHER block's ID unchanged (comments anchor to block IDs, so they survive).
 * Makes a reverted edit on the live Deal body page — net-zero change.
 *
 *   npx tsx src/verify-comments.ts
 */
import { notion, updatePageMarkdown } from "./notion.js";

const PAGE = "350b35e6e67f81ef818ccac8a8fef74f"; // Deal body page
const TARGET = "Salesforce stage, iARR, #of seats, inbound/outbound";
const MARK = " (sync-test)";

async function listBlocks(blockId: string, acc: { id: string; text: string }[] = []) {
	let cursor: string | undefined;
	do {
		const res = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor });
		for (const b of res.results as Array<Record<string, unknown>>) {
			const type = b.type as string;
			const payload = b[type] as { rich_text?: Array<{ plain_text?: string }> } | undefined;
			const text = (payload?.rich_text ?? []).map((r) => r.plain_text ?? "").join("");
			acc.push({ id: b.id as string, text });
			if (b.has_children) await listBlocks(b.id as string, acc);
		}
		cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
	} while (cursor);
	return acc;
}

async function main() {
	const before = await listBlocks(PAGE);
	const beforeIds = new Set(before.map((b) => b.id));
	const target = before.find((b) => b.text.includes(TARGET));
	console.log(`before: ${before.length} blocks; target block ${target?.id ?? "NOT FOUND"}`);
	if (!target) throw new Error("target block not found");

	// 1) Edit ONE block via targeted update_content.
	await updatePageMarkdown(PAGE, [{ old_str: TARGET, new_str: TARGET + MARK }]);
	const after = await listBlocks(PAGE);
	const afterIds = new Set(after.map((b) => b.id));

	// 2) Which of the OTHER blocks kept their exact ID? (These are the ones a comment would survive on.)
	const others = before.filter((b) => b.id !== target.id);
	const preserved = others.filter((b) => afterIds.has(b.id)).length;
	const editedKeptId = afterIds.has(target.id);
	console.log(`after edit: ${after.length} blocks`);
	console.log(`  untouched blocks preserved: ${preserved}/${others.length}  <-- comments on these survive`);
	console.log(`  edited block kept same id:  ${editedKeptId}`);

	// 3) Revert so the live skill is unchanged.
	const editedNow = after.find((b) => b.text.includes(TARGET + MARK));
	await updatePageMarkdown(PAGE, [{ old_str: TARGET + MARK, new_str: TARGET }]);
	const final = await listBlocks(PAGE);
	const reverted = !final.some((b) => b.text.includes(MARK));
	console.log(`revert: applied; mark gone = ${reverted}; final block count = ${final.length}`);

	const pass = preserved === others.length && reverted;
	console.log(pass ? "\nPASS: untouched block IDs stable -> comments preserved; live page reverted" : "\nFAIL");
	console.log(`(beforeIds==finalIds: ${JSON.stringify([...beforeIds].sort()) === JSON.stringify([...new Set(final.map((b) => b.id))].sort())})`);
	process.exit(pass ? 0 : 1);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
