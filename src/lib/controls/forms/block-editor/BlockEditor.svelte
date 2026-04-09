<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { ClassProp } from '../../../helpers/types';
	import type { Block } from './types.ts';

	let {
		value = $bindable(''),
		class: classes,
	}: ClassProp & { value?: string } = $props();

	// ── Serialization ──────────────────────────────────────────────────────────

	function makeBlock(content: string): Block {
		return { id: crypto.randomUUID(), type: 'text', content, metadata: undefined };
	}

	function parse(md: string): Block[] {
		const trimmed = md.trim();
		if (!trimmed) return [makeBlock('')];
		return trimmed.split(/\n\n/).map(makeBlock);
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

	// Fire-once action: sets initial innerText on block creation.
	// Content is managed imperatively after that — no update handler.
	function initBlock(node: HTMLDivElement, content: string) {
		node.innerText = content;
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

	// ── Event handlers ─────────────────────────────────────────────────────────

	function onInput(e: Event, i: number) {
		// innerText may append a trailing \n for a <br> at end — strip it
		blocks[i].content = (e.target as HTMLDivElement).innerText.replace(/\n$/, '');
	}

	function onKeydown(e: KeyboardEvent, i: number) {
		const el = e.currentTarget as HTMLDivElement;

		// Shift+Enter — soft line break within the block
		if (e.key === 'Enter' && e.shiftKey) {
			e.preventDefault();
			document.execCommand('insertText', false, '\n');
			blocks[i].content = el.innerText.replace(/\n$/, '');
			return;
		}

		// Enter — create a new block below, splitting content at cursor
		if (e.key === 'Enter') {
			e.preventDefault();
			const pos    = getCursorOffset(el);
			const text   = el.innerText.replace(/\n$/, '');
			const before = text.slice(0, pos);
			const after  = text.slice(pos);

			// Update current block and its DOM immediately (before splice)
			blocks[i].content = before;
			el.innerText = before;

			const next = makeBlock(after);
			blocks.splice(i + 1, 0, next);

			// Focus the new block after Svelte renders it
			const nextId = next.id;
			setTimeout(() => {
				const nextEl = getBlockEl(nextId);
				if (!nextEl) return;
				nextEl.focus();
				const r = document.createRange();
				r.setStart(nextEl, 0);
				r.collapse(true);
				const s = window.getSelection();
				s?.removeAllRanges();
				s?.addRange(r);
			});
			return;
		}

		// Backspace at start of block — merge into the previous block
		if (e.key === 'Backspace' && isAtStart(el) && i > 0) {
			e.preventDefault();
			const prev        = blocks[i - 1];
			const prevContent = prev.content;
			const curContent  = el.innerText.replace(/\n$/, '');
			const merged      = prevContent + curContent;
			const cursorAt    = prevContent.length;

			blocks[i - 1].content = merged;
			blocks.splice(i, 1);

			const prevId = prev.id;
			setTimeout(() => {
				const prevEl = getBlockEl(prevId);
				if (!prevEl) return;
				prevEl.innerText = merged;
				setCursorPosition(prevEl, cursorAt);
			});
			return;
		}
	}

	// ── Styles ─────────────────────────────────────────────────────────────────

	const containerCls = $derived(twMerge(
		'w-full rounded-control border border-frame bg-surface-primary p-4 space-y-3',
		classes,
	));
</script>

<div bind:this={editorEl} class={containerCls}>
	{#each blocks as block, i (block.id)}
		<div
			data-block-id={block.id}
			contenteditable="true"
			role="textbox"
			aria-multiline="true"
			tabindex="0"
			spellcheck={false}
			class="w-full font-mono text-sm leading-relaxed text-canvas-contrast whitespace-pre-wrap break-words focus:outline-none min-h-[1.25em]"
			use:initBlock={block.content}
			oninput={(e) => onInput(e, i)}
			onkeydown={(e) => onKeydown(e, i)}
		></div>
	{/each}
</div>
