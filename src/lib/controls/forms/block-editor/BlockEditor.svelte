<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { ClassProp } from '../../../helpers/types';
	import type { Block, BlockPlugin } from './types.ts';
	import { highlight } from './highlight.ts';

	let {
		value = $bindable(''),
		class: classes,
		plugins = [],
	}: ClassProp & { value?: string; plugins?: BlockPlugin[] } = $props();

	// ── Serialization ──────────────────────────────────────────────────────────

	// Infers block type from content — mirrors the detection logic in highlight.ts.
	// Used at parse time and on every edit so block.type stays current.
	// Plugin blocks are identified by the `block:<type>` prefix on the first line.
	function detectType(content: string): string {
		const lines = content.split('\n');
		const first = lines[0];
		if (first.startsWith('block:')) return first.slice(6).trim() || 'text';
		if (first.startsWith('```')) return 'code';
		if (lines.every(l => l.startsWith('|'))) return 'table';
		if (/^(-{3,}|\*{3,}|_{3,})$/.test(content)) return 'hr';
		if (/^#{1,6} /.test(first)) return 'heading';
		if (first.startsWith('> ') || first === '>') return 'blockquote';
		if (/^\s*[-*] /.test(first) || /^\s*\d+\. /.test(first)) return 'list';
		return 'text';
	}

	function makeBlock(content: string): Block {
		return { id: crypto.randomUUID(), type: detectType(content), content, metadata: undefined };
	}

	// Splits a code block's content at the first closing ``` line (after the opener).
	// Returns [closedBlock, rest, ...]; always appends an empty successor so the
	// cursor has somewhere to land. Recurses on the rest to handle chained fences.
	function splitOnFenceClose(content: string): string[] {
		const lines = content.split('\n');
		const closeIdx = lines.findIndex((l, idx) => idx > 0 && l.trim() === '```');
		if (closeIdx === -1) return [content];
		const closed = lines.slice(0, closeIdx + 1).join('\n');
		const after  = lines.slice(closeIdx + 1).join('\n').trimStart();
		return [closed, ...(after ? splitOnFenceClose(after) : [''])];
	}

	// Fence-aware parser: splits on blank lines (\n\n) but never inside a fenced
	// code block (``` opener ... ``` closer). A code block with internal blank
	// lines is kept as a single block.
	function parse(md: string): Block[] {
		const trimmed = md.trim();
		if (!trimmed) return [makeBlock('')];

		const chunks: string[] = [];
		let current = '';
		let inFence = false;

		for (const line of trimmed.split('\n')) {
			if (!inFence && line.startsWith('```')) {
				inFence = true;
				// Flush any preceding text as its own block
				if (current.trim()) { chunks.push(current); current = ''; }
				current = line;
			} else if (inFence) {
				current += '\n' + line;
				if (line.trim() === '```') inFence = false;
			} else if (line === '') {
				// Blank line outside a fence = block boundary
				if (current.trim()) { chunks.push(current); current = ''; }
			} else {
				current = current ? current + '\n' + line : line;
			}
		}
		if (current.trim()) chunks.push(current);

		return chunks.map(makeBlock);
	}

	function serialize(blockList: Block[]): string {
		return blockList.map(b => b.content).join('\n\n');
	}

	// ── Internal state ─────────────────────────────────────────────────────────

	let blocks: Block[] = $state(parse(value));
	// Initialized to the raw value; Effect 1 normalizes it on first run.
	// Plain let (non-reactive) is intentional — used only for change detection.
	let lastSerialized = value;

	// Sync blocks → bound value (user edits)
	$effect(() => {
		const s = serialize(blocks);
		lastSerialized = s;
		value = s;
	});

	// Sync external value changes → blocks (e.g. parent reset)
	$effect(() => {
		if (value !== lastSerialized) {
			blocks = parse(value);
			lastSerialized = value;
		}
	});

	// ── DOM ────────────────────────────────────────────────────────────────────

	let editorEl = $state<HTMLDivElement | undefined>(undefined);

	function getBlockEl(blockId: string): HTMLDivElement | null {
		return editorEl?.querySelector<HTMLDivElement>(`[data-block-id="${blockId}"]`) ?? null;
	}

	// Sets the block's innerHTML to highlighted content.
	// Appends an extra \n when content ends with \n so the browser renders the
	// trailing empty line and the cursor appears on it (single trailing \n in a
	// text node is invisible in contenteditable without the extra push).
	function setBlockHTML(el: HTMLDivElement, content: string) {
		el.innerHTML = highlight(content) + (content.endsWith('\n') ? '\n' : '');
	}

	// Fire-once action: sets initial innerHTML (with syntax highlighting) on block
	// creation. Content is managed imperatively after that — no update handler.
	function initBlock(node: HTMLDivElement, content: string) {
		setBlockHTML(node, content);
	}

	// ── Cursor helpers ─────────────────────────────────────────────────────────

	function getCursorOffset(el: HTMLDivElement): number {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) return 0;
		const range = sel.getRangeAt(0);
		const pre = range.cloneRange();
		pre.selectNodeContents(el);
		pre.setEnd(range.startContainer, range.startOffset);
		return pre.toString().length;
	}

	function isAtStart(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		return getCursorOffset(el) === 0;
	}

	function isAtEnd(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		return getCursorOffset(el) >= el.innerText.replace(/\n$/, '').length;
	}

	function setCursorPosition(el: HTMLDivElement, offset: number) {
		el.focus();
		const sel = window.getSelection();
		if (!sel) return;
		const range = document.createRange();
		let remaining = offset;
		let placed = false;
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		let node: Node | null;
		while ((node = walker.nextNode()) !== null) {
			const text = node as Text;
			if (remaining <= text.length) {
				range.setStart(text, remaining);
				range.collapse(true);
				placed = true;
				break;
			}
			remaining -= text.length;
		}
		if (!placed) {
			range.selectNodeContents(el);
			range.collapse(false);
		}
		sel.removeAllRanges();
		sel.addRange(range);
	}

	// ── Cross-block navigation state ──────────────────────────────────────────

	// Non-reactive flags used across keydown calls.
	// lastWasEnter: tracks double Enter gesture for block splitting.
	// stickyX: preserves the original caret X across consecutive ArrowUp/Down jumps.
	let lastWasEnter = false;
	let stickyX: number | null = null;

	function getCaretX(): number | null {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) return null;
		const rect = sel.getRangeAt(0).getBoundingClientRect();
		// Zero rect: empty element or edge case — caller should fall back
		if (rect.width === 0 && rect.height === 0) return null;
		return rect.left;
	}

	// Returns true when the cursor is on the topmost visual line of `el`.
	function isOnFirstLine(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		const caretRect = sel.getRangeAt(0).getBoundingClientRect();
		if (caretRect.height === 0) {
			// Empty line: only the first line if cursor is at the very start
			return getCursorOffset(el) === 0;
		}
		const elRect = el.getBoundingClientRect();
		return caretRect.top <= elRect.top + caretRect.height * 0.5;
	}

	// Returns true when the cursor is on the bottommost visual line of `el`.
	function isOnLastLine(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		const caretRect = sel.getRangeAt(0).getBoundingClientRect();
		if (caretRect.height === 0) {
			// Empty line: only the last line if cursor is at the very end
			return getCursorOffset(el) >= el.innerText.replace(/\n$/, '').length;
		}
		const elRect = el.getBoundingClientRect();
		return caretRect.bottom >= elRect.bottom - caretRect.height * 0.5;
	}

	// Focuses `el` and places the caret at horizontal position `x` on either the
	// topmost (`atTop=true`) or bottommost (`atTop=false`) visual line.
	// Uses caretRangeFromPoint (Chrome/Safari) with caretPositionFromPoint (Firefox)
	// as fallback, then a start/end fallback if neither is available.
	function setCursorAtX(el: HTMLDivElement, x: number, atTop: boolean) {
		el.focus();
		const elRect = el.getBoundingClientRect();
		// Target a point mid-line height from the top or bottom edge
		const lineH = parseFloat(getComputedStyle(el).lineHeight) || 20;
		const y = atTop ? elRect.top + lineH / 2 : elRect.bottom - lineH / 2;
		// Clamp x to keep inside element bounds
		const cx = Math.max(elRect.left + 1, Math.min(elRect.right - 1, x));

		let range: Range | null = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const doc = document as any;
		if (typeof doc.caretRangeFromPoint === 'function') {
			range = doc.caretRangeFromPoint(cx, y) as Range | null;
		} else if (typeof doc.caretPositionFromPoint === 'function') {
			const pos = doc.caretPositionFromPoint(cx, y);
			if (pos) {
				range = document.createRange();
				range.setStart(pos.offsetNode as Node, pos.offset as number);
				range.collapse(true);
			}
		}
		if (!range) {
			range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(atTop);
		}
		const sel = window.getSelection();
		sel?.removeAllRanges();
		sel?.addRange(range);
	}

	// ── Syntax highlighting ────────────────────────────────────────────────────

	// Saves cursor position, replaces innerHTML with highlighted content,
	// then restores cursor. Must be called while `el` is focused and has a
	// valid selection (i.e. synchronously inside an event handler).
	function applyHighlight(el: HTMLDivElement, content: string) {
		const offset = getCursorOffset(el);
		setBlockHTML(el, content);
		setCursorPosition(el, offset);
	}

	// ── Event handlers ─────────────────────────────────────────────────────────

	function onInput(e: Event, i: number) {
		const el = e.target as HTMLDivElement;
		// innerText may append a trailing \n for a <br> at end — strip it
		const prevContent = blocks[i].content;
		const content     = el.innerText.replace(/\n$/, '');
		blocks[i].content = content;
		blocks[i].type    = detectType(content);

		// Code block fence-close detection: split the block when the user types
		// a closing ``` line, but ONLY if the block didn't already have one
		// (to avoid re-splitting a properly-loaded, already-closed code block).
		if (blocks[i].type === 'code') {
			const parts = splitOnFenceClose(content);
			if (parts.length > 1) {
				// Split if:
				//   (a) block had no closer before this keystroke → user just typed it, OR
				//   (b) there is non-empty content after the closer → user typed inside a
				//       loaded (already-closed) block and pushed content past the closer
				const hadCloser      = prevContent.split('\n').some((l, idx) => idx > 0 && l.trim() === '```');
				const hasContentAfter = parts[1].trim() !== '';
				if (!hadCloser || hasContentAfter) {
					blocks[i].content = parts[0];
					blocks[i].type    = detectType(parts[0]);
					setBlockHTML(el, parts[0]);

					const newBlocks = parts.slice(1).map(makeBlock);
					blocks.splice(i + 1, 0, ...newBlocks);

					const firstNewId = newBlocks[0].id;
					setTimeout(() => {
						const newEl = getBlockEl(firstNewId);
						if (!newEl) return;
						newEl.focus();
						const r = document.createRange();
						r.setStart(newEl, 0);
						r.collapse(true);
						window.getSelection()?.removeAllRanges();
						window.getSelection()?.addRange(r);
					});
					return;
				}
			}
		}

		applyHighlight(el, content);
	}

	// ── Tab / Shift+Tab helpers ────────────────────────────────────────────────

	// Returns both start and end character offsets of the current selection.
	function getCursorRange(el: HTMLDivElement): { start: number; end: number } {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) return { start: 0, end: 0 };
		const r = sel.getRangeAt(0);
		const pre = r.cloneRange();
		pre.selectNodeContents(el);
		pre.setEnd(r.startContainer, r.startOffset);
		const start = pre.toString().length;
		pre.setEnd(r.endContainer, r.endOffset);
		const end = pre.toString().length;
		return { start, end };
	}

	// Sets a selection range (or a collapsed cursor when start === end).
	function setCursorRange(el: HTMLDivElement, start: number, end: number) {
		if (start === end) { setCursorPosition(el, start); return; }
		el.focus();
		const sel = window.getSelection();
		if (!sel) return;
		const range = document.createRange();
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		let pos = 0, node: Node | null;
		let sNode: Text | null = null, sOff = 0;
		let eNode: Text | null = null, eOff = 0;
		while ((node = walker.nextNode()) !== null) {
			const t = node as Text;
			const len = t.length;
			if (!sNode && pos + len >= start) { sNode = t; sOff = start - pos; }
			if (!eNode && pos + len >= end)   { eNode = t; eOff = end   - pos; }
			if (sNode && eNode) break;
			pos += len;
		}
		if (sNode && eNode) { range.setStart(sNode, sOff); range.setEnd(eNode, eOff); }
		else { range.selectNodeContents(el); range.collapse(false); }
		sel.removeAllRanges();
		sel.addRange(range);
	}

	// Tab / Shift+Tab: insert or remove a '\t' at the cursor, or indent/dedent
	// every line touched by the selection.
	function handleTab(e: KeyboardEvent, el: HTMLDivElement, i: number) {
		e.preventDefault();
		const dedent  = e.shiftKey;
		const content = blocks[i].content;
		const TAB     = '\t';
		const { start, end } = getCursorRange(el);

		// ── Collapsed cursor ───────────────────────────────────────────────────
		if (start === end) {
			if (!dedent) {
				// Insert tab at cursor
				const nc = content.slice(0, start) + TAB + content.slice(start);
				blocks[i].content = nc;
				setBlockHTML(el, nc);
				setCursorPosition(el, start + TAB.length);
			} else {
				// Remove tab at start of the current line
				const lineStart = content.lastIndexOf('\n', start - 1) + 1;
				if (content.slice(lineStart).startsWith(TAB)) {
					const nc = content.slice(0, lineStart) + content.slice(lineStart + TAB.length);
					blocks[i].content = nc;
					setBlockHTML(el, nc);
					setCursorPosition(el, Math.max(lineStart, start - TAB.length));
				}
			}
			return;
		}

		// ── Range selection: indent/dedent every touched line ─────────────────
		const lines = content.split('\n');
		let pos    = 0;
		let newStart = start;
		let newEnd   = end;

		const newLines = lines.map((line) => {
			const lineStart = pos;
			const lineEnd   = lineStart + line.length;
			pos = lineEnd + 1;                          // +1 for the '\n'

			// A line is "touched" when the selection overlaps its character span.
			const touched = lineStart < end && lineEnd >= start;
			if (!touched) return line;

			if (!dedent) {
				if (lineStart <= start) newStart += TAB.length;
				newEnd += TAB.length;
				return TAB + line;
			} else {
				if (!line.startsWith(TAB)) return line;
				if (start > lineStart) newStart = Math.max(lineStart, newStart - TAB.length);
				newEnd = Math.max(lineStart, newEnd - TAB.length);
				return line.slice(TAB.length);
			}
		});

		const nc = newLines.join('\n');
		blocks[i].content = nc;
		setBlockHTML(el, nc);
		setCursorRange(el, Math.max(0, newStart), Math.max(0, newEnd));
	}

	function onKeydown(e: KeyboardEvent, i: number) {
		const el = e.currentTarget as HTMLDivElement;

		// ── Reset cross-key state ──────────────────────────────────────────────
		const isArrow = e.key === 'ArrowUp' || e.key === 'ArrowDown';
		if (e.key !== 'Enter') lastWasEnter = false;
		if (!isArrow)          stickyX = null;

		// ── Tab / Shift+Tab — indent / dedent ────────────────────────────────
		if (e.key === 'Tab') { handleTab(e, el, i); return; }

		// ── ArrowUp — jump to previous block when on first visual line ─────────
		if (e.key === 'ArrowUp' && i > 0 && isOnFirstLine(el)) {
			e.preventDefault();
			stickyX = null;
			const prevEl = getBlockEl(blocks[i - 1].id);
			if (prevEl) setCursorPosition(prevEl, blocks[i - 1].content.length);
			return;
		}

		// ── ArrowDown — jump to next block when on last visual line ───────────
		if (e.key === 'ArrowDown' && i < blocks.length - 1 && isOnLastLine(el)) {
			e.preventDefault();
			const x = stickyX ?? getCaretX() ?? el.getBoundingClientRect().left;
			stickyX = x;
			const nextEl = getBlockEl(blocks[i + 1].id);
			if (nextEl) setCursorAtX(nextEl, x, true);
			return;
		}

		// ── ArrowRight at end of block → start of next block ─────────────────
		if (e.key === 'ArrowRight' && i < blocks.length - 1 && isAtEnd(el)) {
			e.preventDefault();
			const nextEl = getBlockEl(blocks[i + 1].id);
			if (nextEl) setCursorPosition(nextEl, 0);
			return;
		}

		// ── ArrowLeft at start of block → end of previous block ──────────────
		if (e.key === 'ArrowLeft' && i > 0 && isAtStart(el)) {
			e.preventDefault();
			const prevEl = getBlockEl(blocks[i - 1].id);
			if (prevEl) setCursorPosition(prevEl, blocks[i - 1].content.length);
			return;
		}

		// ── Enter — soft line break; double Enter splits into a new block ────────
		if (e.key === 'Enter') {
			e.preventDefault();

			// Protected block types (code, table) never split — Enter always
			// inserts a line break regardless of how many times it is pressed.
			if (blocks[i].type === 'code') {
				lastWasEnter = false;
				const pos        = getCursorOffset(el);
				const text       = el.innerText.replace(/\n$/, '');
				const newContent = text.slice(0, pos) + '\n' + text.slice(pos);
				blocks[i].content = newContent;
				setBlockHTML(el, newContent);
				setCursorPosition(el, pos + 1);
				return;
			}

			if (lastWasEnter) {
				// Second consecutive Enter → split block at cursor
				lastWasEnter = false;

				const pos     = getCursorOffset(el);
				const text    = el.innerText.replace(/\n$/, '');
				// pos is right after the \n from the first Enter; remove that \n
				const splitAt = Math.max(0, pos - 1);
				const before  = text.slice(0, splitAt).replace(/\n+$/, '');
				const after   = text.slice(pos).replace(/^\n+/, '');

				blocks[i].content = before;
				setBlockHTML(el, before);

				const next   = makeBlock(after);
				blocks.splice(i + 1, 0, next);

				const nextId = next.id;
				setTimeout(() => {
					const nextEl = getBlockEl(nextId);
					if (!nextEl) return;
					nextEl.focus();
					const r = document.createRange();
					r.setStart(nextEl, 0);
					r.collapse(true);
					window.getSelection()?.removeAllRanges();
					window.getSelection()?.addRange(r);
				});
				return;
			}

			// First Enter — soft line break within the block
			lastWasEnter = true;
			const pos        = getCursorOffset(el);
			const text       = el.innerText.replace(/\n$/, '');
			const newContent = text.slice(0, pos) + '\n' + text.slice(pos);
			blocks[i].content = newContent;
			setBlockHTML(el, newContent);
			setCursorPosition(el, pos + 1);
			return;
		}

		// Backspace at start of block — merge into the previous block
		if (e.key === 'Backspace' && isAtStart(el) && i > 0) {
			e.preventDefault();
			const prev        = blocks[i - 1];
			const prevContent = prev.content;
			const curContent  = blocks[i].content;
			const merged      = prevContent + curContent;
			const cursorAt    = prevContent.length;

			blocks[i - 1].content = merged;
			blocks[i - 1].type    = detectType(merged);
			blocks.splice(i, 1);

			const prevId = prev.id;
			setTimeout(() => {
				const prevEl = getBlockEl(prevId);
				if (!prevEl) return;
				setBlockHTML(prevEl, merged);
				setCursorPosition(prevEl, cursorAt);
			});
			return;
		}

		// Delete at end of block — merge the next block into this one
		if (e.key === 'Delete' && isAtEnd(el) && i < blocks.length - 1) {
			e.preventDefault();
			const curContent  = blocks[i].content;
			const nextContent = blocks[i + 1].content;
			const merged      = curContent + nextContent;
			const cursorAt    = curContent.length;

			blocks[i].content = merged;
			blocks[i].type    = detectType(merged);
			blocks.splice(i + 1, 1);

			const thisId = blocks[i].id;
			setTimeout(() => {
				const thisEl = getBlockEl(thisId);
				if (!thisEl) return;
				setBlockHTML(thisEl, merged);
				setCursorPosition(thisEl, cursorAt);
			});
			return;
		}
	}

	// ── Plugin content update ──────────────────────────────────────────────────

	function updatePluginContent(i: number, newContent: string) {
		blocks[i].content = newContent;
		blocks[i].type    = detectType(newContent);
	}

	// ── Drag and drop ──────────────────────────────────────────────────────────

	// Both are $state: dragFromIdx drives the end-zone conditional and the
	// "don't highlight self" guard; dragOverIdx drives the drop-indicator.
	let dragFromIdx = $state<number | null>(null);
	let dragOverIdx = $state<number | null>(null);

	function onDragStart(e: DragEvent, i: number) {
		dragFromIdx = i;
		e.dataTransfer?.setData('text/plain', String(i));
	}

	function onDragOver(e: DragEvent, i: number) {
		e.preventDefault();
		dragOverIdx = i;
	}

	function onDragLeave() {
		dragOverIdx = null;
	}

	function onDrop(e: DragEvent, dropIdx: number) {
		e.preventDefault();
		if (dragFromIdx === null || dragFromIdx === dropIdx) { resetDrag(); return; }
		const from    = dragFromIdx;
		const [moved] = blocks.splice(from, 1);
		// After removing `from`, indices below it shift down by 1.
		const to      = from < dropIdx ? dropIdx - 1 : dropIdx;
		blocks.splice(to, 0, moved);
		resetDrag();
	}

	function onDragEnd() { resetDrag(); }

	function resetDrag() {
		dragFromIdx = null;
		dragOverIdx = null;
	}

	// ── Styles ─────────────────────────────────────────────────────────────────

	const containerCls = $derived(twMerge(
		'w-full rounded-control border border-frame bg-surface-primary p-4',
		classes,
	));
</script>

<div bind:this={editorEl} class={containerCls}>
	{#each blocks as block, i (block.id)}
		{@const plugin = plugins.find(p => p.type === block.type)}
		<!--
			Drop-zone wrapper: receives dragover/drop for this slot (insert before block i).
			group: makes the drag handle visible on hover of the whole row.
		-->
		<div
			role="presentation"
			class="group my-1.5 flex items-start {dragOverIdx === i && dragFromIdx !== i ? 'border-t-2 border-accent' : 'border-t-2 border-transparent'}"
			ondragover={(e) => onDragOver(e, i)}
			ondragleave={onDragLeave}
			ondrop={(e) => onDrop(e, i)}
		>
			<!-- Drag handle — sibling to the content block, never overlaps ::before bar -->
			<div
				draggable="true"
				role="button"
				tabindex="-1"
				aria-label="Drag to reorder"
				class="shrink-0 w-4 py-0.5 flex items-start justify-center cursor-grab select-none opacity-0 group-hover:opacity-100 text-muted-contrast text-xs leading-relaxed"
				ondragstart={(e) => onDragStart(e, i)}
				ondragend={onDragEnd}
			>⠿</div>

			{#if plugin}
				{@const meta = plugin.parse(block.content)}
				{@const PluginComponent = plugin.component}
				<div
					data-block-id={block.id}
					class="relative min-w-0 flex-1 pl-3 font-mono text-sm leading-relaxed"
				>
					<PluginComponent metadata={meta} oncontent={(c) => updatePluginContent(i, c)} />
				</div>
			{:else}
				<div
					data-block-id={block.id}
					contenteditable="true"
					role="textbox"
					aria-multiline="true"
					tabindex="0"
					spellcheck={false}
					class="relative min-w-0 flex-1 pl-3 font-mono text-sm leading-relaxed text-canvas-contrast whitespace-pre-wrap break-words focus:outline-none min-h-[1.25em]"
					use:initBlock={block.content}
					oninput={(e) => onInput(e, i)}
					onkeydown={(e) => onKeydown(e, i)}
				></div>
			{/if}
		</div>
	{/each}
	<!-- Drop zone at the end of the list -->
	{#if dragFromIdx !== null}
		<div
			role="presentation"
			ondragover={(e) => { e.preventDefault(); dragOverIdx = blocks.length; }}
			ondragleave={onDragLeave}
			ondrop={(e) => onDrop(e, blocks.length)}
			class="h-4 w-full {dragOverIdx === blocks.length ? 'border-t-2 border-accent' : ''}"
		></div>
	{/if}
</div>

<style>
	/* Syntax highlighting tokens — applied to dynamically injected spans. */
	/* Uses :global() because innerHTML is set imperatively, outside Svelte's scope. */
	/* Colors reference semantic CSS custom properties — no hardcoded values. */

	:global([data-block-id]::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 3px;
		bottom: 3px;
		width: 4px;
		border-radius: 2px;
		background-color: var(--color-frame);
	}

	:global([data-hl="heading"]) {
		color: var(--color-accent);
		font-weight: bold;
	}

	:global([data-hl="marker"]) {
		color: var(--color-muted-contrast);
	}

	:global([data-hl="bold"]) {
		font-weight: bold;
	}

	:global([data-hl="italic"]) {
		font-style: italic;
	}

	:global([data-hl="blockquote"]) {
		color: var(--color-muted-contrast);
	}

	:global([data-hl="code"]) {
		color: var(--color-error);
		background-color: color-mix(in srgb, var(--color-muted) 60%, transparent);
		border-radius: 2px;
		padding: 0 2px;
	}

	:global([data-hl="code-lang"]) {
		color: var(--color-accent);
	}

	:global([data-hl="code-block"]) {
		color: var(--color-error);
	}

	:global([data-hl="table-sep"]) {
		color: var(--color-muted-contrast);
	}

	:global([data-hl="hr"]) {
		color: var(--color-muted-contrast);
	}

	:global([data-hl="list-marker"]) {
		color: var(--color-accent);
	}

	:global([data-hl="strikethrough"]) {
		text-decoration: line-through;
		color: var(--color-muted-contrast);
	}

	:global([data-hl="underline"]) {
		text-decoration: underline;
	}

	:global([data-hl="link-text"]) {
		color: var(--color-accent);
	}

	:global([data-hl="link-url"]) {
		color: var(--color-muted-contrast);
	}
</style>
