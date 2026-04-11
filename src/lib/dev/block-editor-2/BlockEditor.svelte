<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { ClassProp } from '../../helpers/types.ts';
	import type { Block, BlockType } from './types.ts';
	import { highlight } from './highlight.ts';
	import { renderPreview } from './preview.ts';

	let {
		value = $bindable(''),
		class: classes,
	}: ClassProp & { value?: string } = $props();

	// ── Block type detection ───────────────────────────────────────────────────

	function detectType(content: string): BlockType {
		const line = content.split('\n')[0];
		if (/^(-{3,}|\*{3,}|_{3,})$/.test(content.trim())) return 'divider';
		if (line.startsWith('```')) return 'code';
		if (/^#{1,6} /.test(line)) return 'heading';
		if (line.startsWith('> ') || line === '>') return 'quote';
		if (/^\s*- \[[ x]\] /i.test(line)) return 'todo-list';
		if (/^\s*[-*] /.test(line)) return 'bullet-list';
		if (/^\s*\d+\. /.test(line)) return 'ordered-list';
		return 'paragraph';
	}

	function makeBlock(content: string): Block {
		return { id: crypto.randomUUID(), type: detectType(content), content, focused: false };
	}

	// ── Parse / serialize ──────────────────────────────────────────────────────

	function splitOnFenceClose(content: string): string[] {
		const lines = content.split('\n');
		const closeIdx = lines.findIndex((l, idx) => idx > 0 && l.trim() === '```');
		if (closeIdx === -1) return [content];
		const closed = lines.slice(0, closeIdx + 1).join('\n');
		const after  = lines.slice(closeIdx + 1).join('\n').trimStart();
		return [closed, ...(after ? splitOnFenceClose(after) : [''])];
	}

	function parse(md: string): Block[] {
		const trimmed = md.trim();
		if (!trimmed) return [makeBlock('')];

		const chunks: string[] = [];
		let current = '';
		let inFence = false;

		for (const line of trimmed.split('\n')) {
			if (!inFence && line.startsWith('```')) {
				inFence = true;
				if (current.trim()) { chunks.push(current); current = ''; }
				current = line;
			} else if (inFence) {
				current += '\n' + line;
				if (line.trim() === '```') inFence = false;
			} else if (line === '') {
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

	// ── State ──────────────────────────────────────────────────────────────────

	let blocks: Block[] = $state(parse(value));
	let lastSerialized = value;

	$effect(() => {
		const s = serialize(blocks);
		lastSerialized = s;
		value = s;
	});

	$effect(() => {
		if (value !== lastSerialized) {
			blocks = parse(value);
			lastSerialized = value;
		}
	});

	let editorEl = $state<HTMLDivElement | undefined>(undefined);

	// Transient map: blockId → desired cursor offset when edit mode mounts.
	// Not reactive — just a side-channel for the initEditBlock action.
	const pendingCursors = new Map<string, number>();

	// ── Focus management ───────────────────────────────────────────────────────

	function focusBlock(i: number, offset?: number) {
		pendingCursors.set(blocks[i].id, offset ?? blocks[i].content.length);
		for (let j = 0; j < blocks.length; j++) {
			blocks[j].focused = j === i;
		}
	}

	function onBlur(i: number) {
		// Delay so a click on another block's preview can call focusBlock first,
		// preventing a flash where both blocks show in preview mode.
		setTimeout(() => {
			if (blocks[i]?.focused) blocks[i].focused = false;
		}, 0);
	}

	// ── DOM helpers ────────────────────────────────────────────────────────────

	function getBlockEl(blockId: string): HTMLDivElement | null {
		return editorEl?.querySelector<HTMLDivElement>(`[data-block-id="${blockId}"]`) ?? null;
	}

	function setBlockHTML(el: HTMLDivElement, content: string) {
		el.innerHTML = highlight(content) + (content.endsWith('\n') ? '\n' : '');
	}

	// use: action — runs once when the edit div is mounted (block becomes focused).
	// Sets highlighted innerHTML, focuses the element, and places the cursor.
	function initEditBlock(node: HTMLDivElement, blockId: string) {
		const block = blocks.find(b => b.id === blockId);
		if (!block) return;
		setBlockHTML(node, block.content);
		node.focus();
		const offset = pendingCursors.get(blockId) ?? block.content.length;
		pendingCursors.delete(blockId);
		setCursorPosition(node, offset);
		return { destroy() {} };
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

	function isOnFirstLine(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		const caretRect = sel.getRangeAt(0).getBoundingClientRect();
		if (caretRect.height === 0) return getCursorOffset(el) === 0;
		const elRect = el.getBoundingClientRect();
		return caretRect.top <= elRect.top + caretRect.height * 0.5;
	}

	function isOnLastLine(el: HTMLDivElement): boolean {
		const sel = window.getSelection();
		if (!sel || !sel.isCollapsed || sel.rangeCount === 0) return false;
		const caretRect = sel.getRangeAt(0).getBoundingClientRect();
		if (caretRect.height === 0) return getCursorOffset(el) >= el.innerText.replace(/\n$/, '').length;
		const elRect = el.getBoundingClientRect();
		return caretRect.bottom >= elRect.bottom - caretRect.height * 0.5;
	}

	function getCaretX(): number | null {
		const sel = window.getSelection();
		if (!sel || sel.rangeCount === 0) return null;
		const rect = sel.getRangeAt(0).getBoundingClientRect();
		if (rect.width === 0 && rect.height === 0) return null;
		return rect.left;
	}

	function setCursorAtX(el: HTMLDivElement, x: number, atTop: boolean) {
		el.focus();
		const elRect = el.getBoundingClientRect();
		const lineH = parseFloat(getComputedStyle(el).lineHeight) || 20;
		const y = atTop ? elRect.top + lineH / 2 : elRect.bottom - lineH / 2;
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

	// ── Syntax highlighting (edit mode) ───────────────────────────────────────

	function applyHighlight(el: HTMLDivElement, content: string) {
		const offset = getCursorOffset(el);
		setBlockHTML(el, content);
		setCursorPosition(el, offset);
	}

	// ── Tab / Shift+Tab ────────────────────────────────────────────────────────

	function handleTab(e: KeyboardEvent, el: HTMLDivElement, i: number) {
		e.preventDefault();
		const dedent  = e.shiftKey;
		const content = blocks[i].content;
		const TAB     = '\t';
		const { start, end } = getCursorRange(el);

		if (start === end) {
			if (!dedent) {
				const nc = content.slice(0, start) + TAB + content.slice(start);
				blocks[i].content = nc;
				setBlockHTML(el, nc);
				setCursorPosition(el, start + TAB.length);
			} else {
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

		const lines = content.split('\n');
		let pos    = 0;
		let newStart = start;
		let newEnd   = end;

		const newLines = lines.map((line) => {
			const lineStart = pos;
			const lineEnd   = lineStart + line.length;
			pos = lineEnd + 1;
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

	// ── Input / Keydown ────────────────────────────────────────────────────────

	let lastWasEnter = false;
	let stickyX: number | null = null;

	function onInput(e: Event, i: number) {
		const el = e.target as HTMLDivElement;
		const prevContent = blocks[i].content;
		const content     = el.innerText.replace(/\n$/, '');
		blocks[i].content = content;
		blocks[i].type    = detectType(content);

		if (blocks[i].type === 'code') {
			const parts = splitOnFenceClose(content);
			if (parts.length > 1) {
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
						focusBlock(blocks.findIndex(b => b.id === firstNewId), 0);
					});
					return;
				}
			}
		}

		applyHighlight(el, content);
	}

	function onKeydown(e: KeyboardEvent, i: number) {
		const el = e.currentTarget as HTMLDivElement;

		const isArrow = e.key === 'ArrowUp' || e.key === 'ArrowDown';
		if (e.key !== 'Enter') lastWasEnter = false;
		if (!isArrow)          stickyX = null;

		if (e.key === 'Tab') { handleTab(e, el, i); return; }

		// ── ArrowUp: jump to previous block ────────────────────────────────────
		if (e.key === 'ArrowUp' && i > 0 && isOnFirstLine(el)) {
			e.preventDefault();
			stickyX = null;
			focusBlock(i - 1, blocks[i - 1].content.length);
			return;
		}

		// ── ArrowDown: jump to next block ───────────────────────────────────────
		if (e.key === 'ArrowDown' && i < blocks.length - 1 && isOnLastLine(el)) {
			e.preventDefault();
			const x = stickyX ?? getCaretX() ?? el.getBoundingClientRect().left;
			stickyX = x;
			// Focus next block then use setCursorAtX after mount
			const nextIdx = i + 1;
			const nextId = blocks[nextIdx].id;
			focusBlock(nextIdx, 0);
			setTimeout(() => {
				const nextEl = getBlockEl(nextId);
				if (nextEl) setCursorAtX(nextEl, x, true);
			});
			return;
		}

		// ── ArrowRight at end → start of next block ─────────────────────────────
		if (e.key === 'ArrowRight' && i < blocks.length - 1 && isAtEnd(el)) {
			e.preventDefault();
			focusBlock(i + 1, 0);
			return;
		}

		// ── ArrowLeft at start → end of previous block ──────────────────────────
		if (e.key === 'ArrowLeft' && i > 0 && isAtStart(el)) {
			e.preventDefault();
			focusBlock(i - 1, blocks[i - 1].content.length);
			return;
		}

		// ── Enter ────────────────────────────────────────────────────────────────
		if (e.key === 'Enter') {
			e.preventDefault();

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
				lastWasEnter = false;
				const pos     = getCursorOffset(el);
				const text    = el.innerText.replace(/\n$/, '');
				const splitAt = Math.max(0, pos - 1);
				const before  = text.slice(0, splitAt).replace(/\n+$/, '');
				const after   = text.slice(pos).replace(/^\n+/, '');

				blocks[i].content = before;
				blocks[i].type    = detectType(before);
				setBlockHTML(el, before);

				const next = makeBlock(after);
				blocks.splice(i + 1, 0, next);

				setTimeout(() => {
					focusBlock(i + 1, 0);
				});
				return;
			}

			lastWasEnter = true;
			const pos        = getCursorOffset(el);
			const text       = el.innerText.replace(/\n$/, '');
			const newContent = text.slice(0, pos) + '\n' + text.slice(pos);
			blocks[i].content = newContent;
			setBlockHTML(el, newContent);
			setCursorPosition(el, pos + 1);
			return;
		}

		// ── Backspace at start: merge into previous ──────────────────────────────
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

			setTimeout(() => {
				focusBlock(i - 1, cursorAt);
			});
			return;
		}

		// ── Delete at end: merge next block ──────────────────────────────────────
		if (e.key === 'Delete' && isAtEnd(el) && i < blocks.length - 1) {
			e.preventDefault();
			const curContent  = blocks[i].content;
			const nextContent = blocks[i + 1].content;
			const merged      = curContent + nextContent;
			const cursorAt    = curContent.length;

			blocks[i].content = merged;
			blocks[i].type    = detectType(merged);
			blocks.splice(i + 1, 1);

			setTimeout(() => {
				focusBlock(i, cursorAt);
			});
			return;
		}
	}

	// ── Drag and drop ──────────────────────────────────────────────────────────

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

	function onDragLeave() { dragOverIdx = null; }

	function onDrop(e: DragEvent, dropIdx: number) {
		e.preventDefault();
		if (dragFromIdx === null || dragFromIdx === dropIdx) { resetDrag(); return; }
		const from    = dragFromIdx;
		const [moved] = blocks.splice(from, 1);
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

	// Shared block content styles — identical in both preview and edit mode to
	// prevent layout shift when toggling focus.
	const blockContentCls = 'relative min-w-0 flex-1 pl-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words min-h-[1.25em]';
</script>

<div bind:this={editorEl} class={containerCls}>
	{#each blocks as block, i (block.id)}
		<div
			role="presentation"
			class="group my-1.5 flex items-start {dragOverIdx === i && dragFromIdx !== i ? 'border-t-2 border-accent' : 'border-t-2 border-transparent'}"
			ondragover={(e) => onDragOver(e, i)}
			ondragleave={onDragLeave}
			ondrop={(e) => onDrop(e, i)}
		>
			<!-- Drag handle -->
			<div
				draggable="true"
				role="button"
				tabindex="-1"
				aria-label="Drag to reorder"
				class="shrink-0 w-4 py-0.5 flex items-start justify-center cursor-grab select-none opacity-0 group-hover:opacity-100 text-muted-contrast text-xs leading-relaxed"
				ondragstart={(e) => onDragStart(e, i)}
				ondragend={onDragEnd}
			>⠿</div>

			{#if block.type === 'divider'}
				<!-- Divider: never editable, just a visual line -->
				<div
					data-block-id={block.id}
					class="{blockContentCls} flex items-center py-2 cursor-default"
					role="separator"
				>
					<hr class="w-full border-frame" />
				</div>
			{:else if block.focused}
				<!-- Edit mode: raw Markdown with syntax highlighting -->
				<div
					data-block-id={block.id}
					contenteditable="true"
					role="textbox"
					aria-multiline="true"
					tabindex="0"
					spellcheck={false}
					class="{blockContentCls} text-canvas-contrast focus:outline-none"
					use:initEditBlock={block.id}
					oninput={(e) => onInput(e, i)}
					onkeydown={(e) => onKeydown(e, i)}
					onblur={() => onBlur(i)}
				></div>
			{:else}
				<!-- Preview mode: rendered Markdown without markers -->
				<div
					data-block-id={block.id}
					class="{blockContentCls} text-canvas-contrast cursor-text"
					role="button"
					tabindex="0"
					onclick={() => focusBlock(i)}
					onfocus={() => focusBlock(i)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') focusBlock(i); }}
				>{@html renderPreview(block.content, block.type)}</div>
			{/if}
		</div>
	{/each}

	<!-- Drop zone at end of list -->
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
	/* Block left-border accent — applied via ::before on both preview and edit divs */
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

	/* Edit mode: syntax highlight tokens (injected via innerHTML) */
	:global([data-hl="heading"])      { color: var(--color-accent); font-weight: bold; }
	:global([data-hl="marker"])       { color: var(--color-muted-contrast); }
	:global([data-hl="bold"])         { font-weight: bold; }
	:global([data-hl="italic"])       { font-style: italic; }
	:global([data-hl="blockquote"])   { color: var(--color-muted-contrast); }
	:global([data-hl="code"])         { color: var(--color-error); background-color: color-mix(in srgb, var(--color-muted) 60%, transparent); border-radius: 2px; padding: 0 2px; }
	:global([data-hl="code-lang"])    { color: var(--color-accent); }
	:global([data-hl="code-block"])   { color: var(--color-error); }
	:global([data-hl="table-sep"])    { color: var(--color-muted-contrast); }
	:global([data-hl="hr"])           { color: var(--color-muted-contrast); }
	:global([data-hl="list-marker"])  { color: var(--color-accent); }
	:global([data-hl="strikethrough"]){ text-decoration: line-through; color: var(--color-muted-contrast); }
	:global([data-hl="underline"])    { text-decoration: underline; }
	:global([data-hl="link-text"])    { color: var(--color-accent); }
	:global([data-hl="link-url"])     { color: var(--color-muted-contrast); }

	/* Preview mode: semantic HTML elements rendered by renderPreview() */
	:global([data-block-id] strong)  { font-weight: bold; }
	:global([data-block-id] em)      { font-style: italic; font-family: inherit; }
	:global([data-block-id] s)       { text-decoration: line-through; color: var(--color-muted-contrast); }
	:global([data-block-id] u)       { text-decoration: underline; }
	:global([data-block-id] code)    { color: var(--color-error); background-color: color-mix(in srgb, var(--color-muted) 60%, transparent); border-radius: 2px; padding: 0 2px; }
	:global([data-block-id] a)       { color: var(--color-accent); text-decoration: underline; }
</style>
