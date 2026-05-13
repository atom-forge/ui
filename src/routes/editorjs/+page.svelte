<script lang="ts">
	import { EditorJsEditor } from '../../lib/dev/editorjs-editor/index.ts';
	import '../../lib/dev/editorjs-editor/theme.css';
	import type { OutputData } from '@editorjs/editorjs';

	const initialData: OutputData = {
		blocks: [
			{ type: 'header',    data: { text: 'EditorJS in Svelte', level: 1 } },
			{ type: 'paragraph', data: { text: 'Ez egy teszt bekezdés. A szerkesztő az <b>atom-forge/ui</b> színrendszerét használja.' } },
			{ type: 'header',    data: { text: 'Lista példa', level: 2 } },
			{ type: 'list',      data: { style: 'unordered', items: ['Első elem', 'Második elem', 'Harmadik elem'] } },
			{ type: 'quote',     data: { text: 'Egy idézet szövege ide kerül.', caption: 'Szerző neve', alignment: 'left' } },
			{ type: 'code',      data: { code: 'function hello() {\n  console.log("Hello, EditorJS!");\n}' } },
			{ type: 'delimiter', data: {} },
			{ type: 'paragraph', data: { text: 'Egy újabb bekezdés az elválasztó után.' } },
		],
	};

	let data = $state<OutputData>(initialData);
	let jsonVisible = $state(false);
</script>

<div class="min-h-screen bg-canvas p-8">
	<div class="mx-auto max-w-3xl space-y-6">
		<header>
			<h1 class="text-2xl font-bold text-canvas-contrast">EditorJS — dev sandbox</h1>
			<p class="mt-1 text-sm text-muted-contrast">Svelte wrapper tesztelése az atom-forge/ui témarendszerével.</p>
		</header>

		<EditorJsEditor bind:data placeholder="Kezdj el írni…" />

		<div class="flex items-center gap-3">
			<button
				class="rounded-control bg-secondary px-3 py-1.5 text-sm text-secondary-contrast transition-all hover:brightness-95 dark:hover:brightness-110"
				onclick={() => (jsonVisible = !jsonVisible)}
			>
				{jsonVisible ? 'JSON elrejtése' : 'Mentett JSON mutatása'}
			</button>
			<span class="text-xs text-muted-contrast">{data.blocks.length} blokk</span>
		</div>

		{#if jsonVisible}
			<pre class="overflow-auto rounded-control border border-frame bg-muted p-4 text-xs text-surface-contrast">{JSON.stringify(data, null, 2)}</pre>
		{/if}
	</div>
</div>
