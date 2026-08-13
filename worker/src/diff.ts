import { diffLines, type Change } from "diff";
import type { ContentUpdate } from "./notion.js";

export interface DiffResult {
	/** Minimal targeted edits for PATCH .../markdown update_content. */
	updates: ContentUpdate[];
	/** Text removed from the old body (used by the comment-deletion guard). */
	removedSegments: string[];
	/** True if any edit removes text (pure deletion or shrinking modification). */
	hasDeletions: boolean;
	/** An old_str could not be made unique within the old body — caller must not auto-apply. */
	ambiguous: boolean;
}

function lastLine(s: string): string {
	const lines = s.split("\n").filter((l) => l.trim().length > 0);
	return lines.length ? lines[lines.length - 1]! : "";
}
function firstLine(s: string): string {
	const lines = s.split("\n").filter((l) => l.trim().length > 0);
	return lines.length ? lines[0]! : "";
}
function count(haystack: string, needle: string): number {
	if (!needle) return 0;
	let n = 0;
	let i = haystack.indexOf(needle);
	while (i !== -1) {
		n++;
		i = haystack.indexOf(needle, i + needle.length);
	}
	return n;
}

/**
 * Turn an old->new body change into targeted content_updates so that unchanged
 * blocks keep their Notion block IDs (and the comments anchored to them).
 *
 * `oldBody` must be the last-synced snapshot (== current Notion markdown when there's
 * no conflict), so each `old_str` matches the live page exactly.
 */
export function computeDiff(oldBody: string, newBody: string): DiffResult {
	const parts: Change[] = diffLines(oldBody, newBody);
	const updates: ContentUpdate[] = [];
	const removedSegments: string[] = [];
	let hasDeletions = false;
	let ambiguous = false;

	const ensureUnique = (oldStr: string, prevCtx: string, nextCtx: string): string | null => {
		if (count(oldBody, oldStr) === 1) return oldStr;
		// expand with neighbor context until unique
		let expanded = (prevCtx ? prevCtx + "\n" : "") + oldStr + (nextCtx ? "\n" + nextCtx : "");
		if (count(oldBody, expanded) === 1) return expanded;
		return null;
	};

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i]!;
		if (!part.added && !part.removed) continue; // unchanged

		const prevCtx = i > 0 ? lastLine(parts[i - 1]!.value) : "";

		if (part.removed) {
			const next = parts[i + 1];
			if (next?.added) {
				// modification
				const oldStr = ensureUnique(part.value, prevCtx, "");
				if (!oldStr) {
					ambiguous = true;
				} else {
					updates.push({ old_str: oldStr, new_str: oldStr === part.value ? next.value : part.value /*replaced below*/ });
					// keep new_str aligned to the (possibly expanded) old_str
					updates[updates.length - 1]!.new_str = oldStr.replace(part.value, next.value);
					if (next.value.length < part.value.length) hasDeletions = true;
				}
				removedSegments.push(part.value);
				i++; // consume the paired added part
			} else {
				// pure deletion
				hasDeletions = true;
				removedSegments.push(part.value);
				const oldStr = ensureUnique(part.value, prevCtx, "");
				if (!oldStr) ambiguous = true;
				else updates.push({ old_str: oldStr, new_str: oldStr.replace(part.value, "") });
			}
		} else if (part.added) {
			// pure insertion — anchor to a neighbor so update_content can place it
			const nextCtx = i + 1 < parts.length ? firstLine(parts[i + 1]!.value) : "";
			if (prevCtx) {
				const anchor = ensureUnique(prevCtx, "", "");
				if (!anchor) ambiguous = true;
				else updates.push({ old_str: anchor, new_str: `${anchor}\n${part.value.replace(/\n+$/, "")}` });
			} else if (nextCtx) {
				const anchor = ensureUnique(nextCtx, "", "");
				if (!anchor) ambiguous = true;
				else updates.push({ old_str: anchor, new_str: `${part.value.replace(/\n+$/, "")}\n${anchor}` });
			} else {
				ambiguous = true; // empty old body — caller should use replace_content instead
			}
		}
	}

	return { updates, removedSegments, hasDeletions, ambiguous };
}
