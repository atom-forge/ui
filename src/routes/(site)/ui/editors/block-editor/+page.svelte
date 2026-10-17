<script lang="ts">
	import { BlockEditCallout, BlockEditCode, BlockEditDiagram, BlockEditDivider, BlockEditHeading, BlockEditLinkCard, BlockEditMarkdown, BlockEditQuote, BlockEditTable, BlockEditYoutube, BlockEditor, DocApiBlock, DocApiTable, DocInlineCode, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, ProseTitle as ProseSubtitle, type Block, type PropDef } from '@atom-forge/ui';
	import { untrack } from 'svelte'; 	import type { Component } from 'svelte'; 	

	import { Undo2, Redo2, Eye, ChevronsDownUp, ChevronsUpDown } from 'lucide-svelte';

	const props: PropDef[] = [
		{ group: 'Props', name: 'blocks',     type: 'Block[]',                        default: '[]',        description: 'Bindable array of blocks. Each block has <code>id</code>, <code>type</code>, and <code>data</code>.' },
		{ group: 'Props', name: 'components', type: 'Record&lt;string, Component&gt;',                      description: 'Map of block type names to Svelte components. Required — determines which component renders each block type.' },
		{ group: 'Props', name: 'joinable',   type: 'string',                         default: "''",        description: 'Block type that participates in merge/split on Backspace, Delete, and Shift+Enter. Typically <code>"markdown"</code>.' },
		{ group: 'Props', name: 'typeLabels', type: 'Record&lt;string, string&gt;',   default: '{}',        description: 'Human-readable labels for block type names shown in the block menu. Falls back to the type key if not provided.' },
		{ group: 'Props', name: 'previewComponents', type: 'Record&lt;string, Component&gt;', default: 'defaultPreviewComponents', description: 'Preview renderer map. Spread the exported <code>defaultPreviewComponents</code> and extend it for custom block types.' },
		{ group: 'Props', name: 'onchange',   type: '(blocks: Block[]) => void',                            description: 'Called on structural changes (add, remove, reorder). Not called on <code>updateData</code>.' },
	];

	const blockProps: PropDef[] = [
		{ group: 'Block component props', name: 'id',   type: 'string',  description: 'Unique block identifier injected by BlockEditor.' },
		{ group: 'Block component props', name: 'data', type: 'any',     description: 'Block-specific data object injected by BlockEditor. Shape is defined per block type.' },
	];

	const components: Record<string, Component<any>> = {
		markdown: BlockEditMarkdown,
		heading:  BlockEditHeading,
		quote:    BlockEditQuote,
		divider:  BlockEditDivider,
		youtube:  BlockEditYoutube,
		table:    BlockEditTable,
		diagram:  BlockEditDiagram,
		callout:  BlockEditCallout,
		code:     BlockEditCode,
		link:     BlockEditLinkCard,
	};

	const demoDiagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="background: transparent; background-color: transparent; color-scheme: var(--diagram-scheme, light);" width="370px" height="80px" viewBox="0 0 370 80"><defs><marker id="arr" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#666" style="fill: light-dark(#666, #aaa);"/></marker></defs><rect x="10" y="20" width="80" height="40" rx="20" fill="#dae8fc" stroke="#6c8ebf" style="fill: light-dark(#dae8fc, #1e3a5f); stroke: light-dark(#6c8ebf, #4a7ab5);"/><text x="50" y="45" text-anchor="middle" font-size="12" font-family="sans-serif" style="fill: light-dark(#333, #e0e0e0);">Request</text><line x1="90" y1="40" x2="120" y2="40" stroke="#666" style="stroke: light-dark(#666, #aaa);" marker-end="url(#arr)"/><rect x="120" y="20" width="80" height="40" rx="4" fill="#fff2cc" stroke="#d6b656" style="fill: light-dark(#fff2cc, #4d3d00); stroke: light-dark(#d6b656, #b8960c);"/><text x="160" y="45" text-anchor="middle" font-size="12" font-family="sans-serif" style="fill: light-dark(#333, #e0e0e0);">Validate</text><line x1="200" y1="40" x2="230" y2="40" stroke="#666" style="stroke: light-dark(#666, #aaa);" marker-end="url(#arr)"/><rect x="230" y="20" width="80" height="40" rx="4" fill="#fff2cc" stroke="#d6b656" style="fill: light-dark(#fff2cc, #4d3d00); stroke: light-dark(#d6b656, #b8960c);"/><text x="270" y="45" text-anchor="middle" font-size="12" font-family="sans-serif" style="fill: light-dark(#333, #e0e0e0);">Process</text><line x1="310" y1="40" x2="340" y2="40" stroke="#666" style="stroke: light-dark(#666, #aaa);" marker-end="url(#arr)"/><rect x="340" y="20" width="80" height="40" rx="20" fill="#d5e8d4" stroke="#82b366" style="fill: light-dark(#d5e8d4, #1a3d1a); stroke: light-dark(#82b366, #5a9a5a); transform: translate(-50,0);"/><text x="370" y="45" text-anchor="middle" font-size="12" font-family="sans-serif" style="fill: light-dark(#333, #e0e0e0); transform: translate(-50%,0);">Response</text></svg>`;
	const demoDiagramXml = `<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="Request" style="rounded=1;" vertex="1" parent="1"><mxGeometry x="10" y="20" width="80" height="40" as="geometry"/></mxCell><mxCell id="3" value="Validate" vertex="1" parent="1"><mxGeometry x="120" y="20" width="80" height="40" as="geometry"/></mxCell><mxCell id="4" value="Process" vertex="1" parent="1"><mxGeometry x="230" y="20" width="80" height="40" as="geometry"/></mxCell><mxCell id="5" value="Response" style="rounded=1;" vertex="1" parent="1"><mxGeometry x="340" y="20" width="80" height="40" as="geometry"/></mxCell><mxCell id="6" edge="1" source="2" target="3" parent="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="7" edge="1" source="3" target="4" parent="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="8" edge="1" source="4" target="5" parent="1"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>`;

	let blocks = $state<Block[]>([
		{ id: crypto.randomUUID(), type: 'heading',  data: { text: 'Block Editor', level: 1 } },
		{ id: crypto.randomUUID(), type: 'markdown', data: { text: 'This editor supports **Markdown**, tables, diagrams, YouTube embeds, quotes, and dividers.\nBlocks can be reordered by dragging the grip handle on the left.' } },
		{ id: crypto.randomUUID(), type: 'callout',  data: { icon: 'Lightbulb', color: 'tip', title: 'Pro tip', text: 'You can **drag** blocks to reorder them using the grip handle on the left. Press `Shift+Enter` inside a Markdown block to split it.' } },
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading',  data: { text: 'Q2 Budget Overview', level: 2 } },
		{
			id: crypto.randomUUID(), type: 'table', data: {
				rows: [
					['Department',  'Budget',  'Spent',   'Remaining'],
					['Engineering', '120 000', '87 400',  '32 600'],
					['Design',      '45 000',  '38 200',  '6 800'],
					['Marketing',   '60 000',  '51 000',  '9 000'],
					['Total',       '225 000', '176 600', '48 400'],
				],
				colStyles: [
					{ align: 'left',  prefix: '',  postfix: '', sumDecorator: false },
					{ align: 'right', prefix: '$', postfix: '', sumDecorator: true  },
					{ align: 'right', prefix: '$', postfix: '', sumDecorator: true  },
					{ align: 'right', prefix: '$', postfix: '', sumDecorator: true  },
				],
				headingRow: true, headingCol: false, sumRow: true, sumCol: false,
			},
		},
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading', data: { text: 'Request Flow', level: 2 } },
		{ id: crypto.randomUUID(), type: 'diagram', data: { xml: demoDiagramXml, svg: demoDiagramSvg, scheme: 'light' } },
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading', data: { text: 'Code Examples', level: 2 } },
		{
			id: crypto.randomUUID(),
			type: 'code',
			data: {
				title: 'Full-stack example',
				open: true,
				files: [
					{
						filename: 'api-handler.ts',
						language: 'typescript',
						source: `import { defineHandler } from '@atom-forge/rpc';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const getUser = defineHandler<{ userId: string }, User>(
  async ({ userId }) => {
    const user = await db.users.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
);`,
					},
					{
						filename: 'data-processor.py',
						language: 'python',
						source: `import pandas as pd
from typing import List, Dict, Optional

class DataProcessor:
    def __init__(self, data: pd.DataFrame):
        self.data = data
        self.cache: Dict[str, pd.DataFrame] = {}

    def filter_by_status(self, status: str) -> pd.DataFrame:
        """Filter records by status field."""
        if status in self.cache:
            return self.cache[status]

        result = self.data[self.data['status'] == status].copy()
        self.cache[status] = result
        return result

    def aggregate_metrics(self, group_by: List[str]) -> pd.DataFrame:
        """Aggregate data by specified columns."""
        return self.data.groupby(group_by).agg({
            'revenue': 'sum',
            'users': 'count'
        }).reset_index()`,
					},
				],
			},
		},
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading', data: { text: 'Sprint Planning', level: 2 } },
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading', data: { text: 'Resources', level: 2 } },
		{
			id: crypto.randomUUID(),
			type: 'link',
			data: {
				url: 'https://svelte.dev/docs/svelte/overview',
				title: 'Svelte 5 Documentation',
				description: 'Official documentation for Svelte 5 — learn about runes, components, reactivity, and more.',
				favicon: 'https://www.google.com/s2/favicons?domain=svelte.dev&sz=64',
			},
		},
		{
			id: crypto.randomUUID(),
			type: 'link',
			data: {
				url: 'https://tailwindcss.com/docs',
				title: 'Tailwind CSS Documentation',
				description: 'Rapidly build modern websites without ever leaving your HTML with utility-first CSS framework.',
				favicon: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
			},
		},
		{ id: crypto.randomUUID(), type: 'divider', data: null },
		{ id: crypto.randomUUID(), type: 'heading', data: { text: 'Tutorial Video', level: 2 } },
		{ id: crypto.randomUUID(), type: 'youtube', data: { url: 'https://www.youtube.com/watch?v=bsYp9q3QNaQ', title: 'Svelte 5 Runes Explained' } },
	]);

	let history      = $state<string[]>([untrack(() => JSON.stringify(blocks))]);
	let historyIndex = $state(0);

	function handleChange(newBlocks: Block[]) {
		history      = [...history.slice(0, historyIndex + 1), JSON.stringify(newBlocks)];
		historyIndex = history.length - 1;
	}
	function undo() { if (historyIndex > 0) { historyIndex--; blocks = JSON.parse(history[historyIndex]); } }
	function redo() { if (historyIndex < history.length - 1) { historyIndex++; blocks = JSON.parse(history[historyIndex]); } }
	const addBlock = (type: string, data: any = null) => {
		blocks = [...blocks, { id: crypto.randomUUID(), type, data }];
	};

	let editorRef = $state<ReturnType<typeof BlockEditor> | undefined>(undefined);
</script>

<svelte:window onkeydown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); } }}/>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Block Editor</ProseTitle>
		<ProseText>
			A composable block-based editor. Content is a flat array of typed blocks — each block type is a regular Svelte component.
			Supports drag-to-reorder, block type switching, undo/redo, and keyboard navigation between blocks.
		</ProseText>

		<DocApiBlock title="BlockEditor props">
			<DocApiTable props={props} />
		</DocApiBlock>

		<DocApiBlock title="Block component interface">
			<DocApiTable props={blockProps} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseSubtitle level={3}>Demo</ProseSubtitle>
				<ProseText>
					Drag the grip handle to reorder blocks. Use the buttons below to add new blocks.
					<DocInlineCode>Shift+Enter</DocInlineCode> splits a Markdown block, <DocInlineCode>Backspace</DocInlineCode> at the start merges with the previous block.
					<DocInlineCode>⌘Z</DocInlineCode> / <DocInlineCode>⌘⇧Z</DocInlineCode> undo/redo structural changes.
				</ProseText>

				<div class="border border-frame rounded-xl bg-surface">
					<div class="flex items-center justify-between px-4 py-2 border-b border-frame">
						<span class="text-xs text-muted-contrast">Interactive demo</span>
						<div class="flex gap-1">
							<button class="flex items-center gap-1 px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast disabled:opacity-30 cursor-pointer disabled:cursor-default" disabled={historyIndex <= 0} onclick={undo}>
								<Undo2 size={12}/> Undo
							</button>
							<button class="flex items-center gap-1 px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast disabled:opacity-30 cursor-pointer disabled:cursor-default" disabled={historyIndex >= history.length - 1} onclick={redo}>
								<Redo2 size={12}/> Redo
							</button>
							<div class="w-px bg-frame mx-0.5"></div>
							<button class="flex items-center gap-1 px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast cursor-pointer" onclick={() => editorRef?.closeAll()} title="Collapse all blocks">
								<ChevronsDownUp size={12}/> Close all
							</button>
							<button class="flex items-center gap-1 px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast cursor-pointer" onclick={() => editorRef?.openAll()} title="Expand all blocks">
								<ChevronsUpDown size={12}/> Open all
							</button>
							<div class="w-px bg-frame mx-0.5"></div>
							<button class="flex items-center gap-1 px-2 py-1 text-xs border border-frame rounded text-muted-contrast hover:text-canvas-contrast cursor-pointer" onclick={() => editorRef?.openPreview()}>
								<Eye size={12}/> Preview
							</button>
						</div>
					</div>
					<div class="p-4">
						<BlockEditor bind:this={editorRef} bind:blocks {components} joinable="markdown" typeLabels={{ youtube: 'YouTube', markdown: 'Markdown', diagram: 'Diagram', callout: 'Callout', code: 'Code', todo: 'Todo', link: 'Link' }} onchange={handleChange} />
					</div>
				</div>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseSubtitle level={3}>Built-in block types</ProseSubtitle>
				<ProseText>
					All built-in block components are exported from <DocInlineCode>@atom-forge/ui</DocInlineCode> and can be used individually or combined.
					Import only the components you need and pass them in the <DocInlineCode>components</DocInlineCode> map.
				</ProseText>
				<div class="mt-3 overflow-x-auto rounded-lg border border-frame">
					<table class="w-full text-sm border-collapse">
						<thead><tr class="bg-muted/50 text-left">
							<th class="px-3 py-2 font-medium text-canvas-contrast border-b border-frame">Type key</th>
							<th class="px-3 py-2 font-medium text-canvas-contrast border-b border-frame">Component</th>
							<th class="px-3 py-2 font-medium text-canvas-contrast border-b border-frame">data shape</th>
							<th class="px-3 py-2 font-medium text-canvas-contrast border-b border-frame">Joinable</th>
						</tr></thead>
						<tbody class="text-muted-contrast">
							{#each [
								['text',     'BlockEditTextarea',  '{ text: string }',                    'yes'],
																['code',     'BlockEditCode',      '{ files: { filename, language, source: string }[]; title: string; open: boolean }', '—'],
																['link',     'BlockEditLinkCard',  '{ url, title, description, favicon: string }', '—'],
																['markdown', 'BlockEditMarkdown',  '{ text: string }',                    'yes'],
								['heading',  'BlockEditHeading',   '{ text: string; level: 1|2|3 }',      '—'],
								['quote',    'BlockEditQuote',     '{ text: string }',                    '—'],
								['divider',  'BlockEditDivider',   'null',                                '—'],
								['youtube',  'BlockEditYoutube',   '{ url: string; title?: string }',     '—'],
								['table',    'BlockEditTable',     'TableData',                           '—'],
								['diagram',  'BlockEditDiagram',   'DiagramData',                         '—'],
								['callout',  'BlockEditCallout',   '{ icon, color, title, text: string }', '—'],
							] as [type, comp, shape, join]}
								<tr class="border-t border-frame">
									<td class="px-3 py-2 font-mono text-accent">{type}</td>
									<td class="px-3 py-2 font-mono">{comp}</td>
									<td class="px-3 py-2 font-mono text-xs">{shape}</td>
									<td class="px-3 py-2">{join}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseSubtitle level={3}>Keyboard shortcuts</ProseSubtitle>
				<ProseText>
					<DocInlineCode>Shift+Enter</DocInlineCode> — split the current joinable block at the cursor into two.<br/>
					<DocInlineCode>Backspace</DocInlineCode> at start — merge with the previous block (if same joinable type) or focus it.<br/>
					<DocInlineCode>Delete</DocInlineCode> at end — merge the next block into the current one.<br/>
					<DocInlineCode>ArrowUp</DocInlineCode> / <DocInlineCode>ArrowDown</DocInlineCode> at edges — move focus to the previous/next block.<br/>
					<DocInlineCode>Tab</DocInlineCode> / <DocInlineCode>Shift+Tab</DocInlineCode> — navigate between blocks in Markdown mode.
				</ProseText>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseSubtitle level={3}>Custom block types</ProseSubtitle>
				<ProseText>
					Any Svelte component with <DocInlineCode>id: string</DocInlineCode> and <DocInlineCode>data: any</DocInlineCode> props can be a block.
					Call <DocInlineCode>api.register(id, controller)</DocInlineCode> in an <DocInlineCode>$effect</DocInlineCode> to opt into focus management.
					Use <DocInlineCode>api.updateData(id, newData)</DocInlineCode> to persist changes back to the block array.
					Import <DocInlineCode>getBlockAPI</DocInlineCode> from <DocInlineCode>@atom-forge/ui</DocInlineCode> and call it during component initialization. Unregister the controller when the block is destroyed.
				</ProseText>
	</ProseParagraph>
</ProsePage>
