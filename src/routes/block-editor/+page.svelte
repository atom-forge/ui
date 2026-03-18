<script lang="ts">
	import { untrack } from 'svelte';
	import type { Component } from 'svelte';
	import BlockEditor   from '../../pro/block-editor/BlockEditor.svelte';
	import TextareaBlock from '../../pro/block-editor/blocks/TextareaBlock.svelte';
	import HeadingBlock  from '../../pro/block-editor/blocks/HeadingBlock.svelte';
	import QuoteBlock    from '../../pro/block-editor/blocks/QuoteBlock.svelte';
	import DividerBlock  from '../../pro/block-editor/blocks/DividerBlock.svelte';
	import YoutubeBlock  from '../../pro/block-editor/blocks/YoutubeBlock.svelte';
	import type { Block } from '../../pro/block-editor/types.js';

	const components: Record<string, Component<any>> = {
		text:    TextareaBlock,
		heading: HeadingBlock,
		quote:   QuoteBlock,
		divider: DividerBlock,
		youtube: YoutubeBlock,
	};

	let blocks = $state<Block[]>([
		{ id: '1', type: 'heading',  data: { text: 'Block Editor', level: 1 } },
		{ id: '2', type: 'text',     data: { text: 'This is a plain text block. Press Shift+Enter to split it into two.' } },
		{ id: '3', type: 'quote',    data: { text: 'A quote block with an accent border on the left.' } },
		{ id: '4', type: 'divider',  data: null },
		{ id: '5', type: 'heading',  data: { text: 'YouTube embed', level: 2 } },
		{ id: '6', type: 'youtube',  data: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Rick Astley — Never Gonna Give You Up' } },
		{ id: '7', type: 'text',     data: { text: '' } },
	]);

	// Snapshot history for undo/redo
	let history      = $state<string[]>([untrack(() => JSON.stringify(blocks))]);
	let historyIndex = $state(0);

	function handleChange(newBlocks: Block[]) {
		history      = [...history.slice(0, historyIndex + 1), JSON.stringify(newBlocks)];
		historyIndex = history.length - 1;
	}

	function undo() {
		if (historyIndex <= 0) return;
		historyIndex--;
		blocks = JSON.parse(history[historyIndex]);
	}

	function redo() {
		if (historyIndex >= history.length - 1) return;
		historyIndex++;
		blocks = JSON.parse(history[historyIndex]);
	}

	const addBlock = (type: string, data: any = null) => {
		blocks = [...blocks, { id: crypto.randomUUID(), type, data }];
	};
</script>

<svelte:window
	onkeydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
			e.preventDefault();
			if (e.shiftKey) redo(); else undo();
		}
	}}
/>

<div class="max-w-2xl mx-auto p-8 space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-lg font-semibold text-canvas-contrast">Block Editor</h1>
		<div class="flex gap-1">
			<button
				class="px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast disabled:opacity-30 cursor-pointer disabled:cursor-default"
				disabled={historyIndex <= 0}
				onclick={undo}
			>Undo</button>
			<button
				class="px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast disabled:opacity-30 cursor-pointer disabled:cursor-default"
				disabled={historyIndex >= history.length - 1}
				onclick={redo}
			>Redo</button>
		</div>
	</div>

	<div class="border border-frame rounded-xl p-4 bg-surface">
		<BlockEditor
			bind:blocks
			{components}
			joinable="text"
			typeLabels={{ youtube: 'YouTube' }}
			onchange={handleChange}
		/>
	</div>

	<div class="flex flex-wrap gap-2">
		<button class="px-3 py-1.5 text-sm border border-frame rounded text-canvas-contrast hover:bg-secondary cursor-pointer" onclick={() => addBlock('text',    { text: '' })}>+ Text</button>
		<button class="px-3 py-1.5 text-sm border border-frame rounded text-canvas-contrast hover:bg-secondary cursor-pointer" onclick={() => addBlock('heading', { text: '', level: 2 })}>+ Heading</button>
		<button class="px-3 py-1.5 text-sm border border-frame rounded text-canvas-contrast hover:bg-secondary cursor-pointer" onclick={() => addBlock('quote',   { text: '' })}>+ Quote</button>
		<button class="px-3 py-1.5 text-sm border border-frame rounded text-canvas-contrast hover:bg-secondary cursor-pointer" onclick={() => addBlock('divider', null)}>+ Divider</button>
		<button class="px-3 py-1.5 text-sm border border-frame rounded text-canvas-contrast hover:bg-secondary cursor-pointer" onclick={() => addBlock('youtube', null)}>+ YouTube</button>
	</div>

	<details class="text-xs">
		<summary class="text-muted-contrast cursor-pointer select-none">blocks state</summary>
		<pre class="mt-2 p-3 bg-surface rounded border border-frame overflow-auto text-canvas-contrast">{JSON.stringify(blocks, null, 2)}</pre>
	</details>
</div>
