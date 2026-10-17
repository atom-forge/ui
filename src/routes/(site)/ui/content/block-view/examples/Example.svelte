<script lang="ts">
	import { BlockView, defaultPreviewComponents, type Block } from '@atom-forge/ui';

	const blocks: Block[] = [
		{ id: 'title', type: 'heading', data: { text: 'Release overview', level: 2 } },
		{ id: 'intro', type: 'markdown', data: { text: 'A **read-only** document built from the same blocks as the editor.' } },
		{ id: 'note', type: 'callout', data: { icon: 'Lightbulb', color: 'tip', title: 'Reusable content', text: 'Persist the block array and render it independently of the editor.' } },
		{ id: 'divider', type: 'divider', data: null },
		{ id: 'quote', type: 'quote', data: { text: 'Build once, present anywhere.' } },
	];
</script>

<div class="w-full">
	<BlockView {blocks} previewComponents={defaultPreviewComponents} />
</div>
