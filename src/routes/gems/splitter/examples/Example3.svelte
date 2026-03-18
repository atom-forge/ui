<script lang="ts">
	import { Splitter } from '$lib';

	let sizes = $state({ start: 30, end: 70 });
</script>

<div class="space-y-2">
	<div class="h-56 w-full border border-frame rounded-lg overflow-hidden">
		<Splitter
			initialSize={30}
			minSize={20}
			class="w-2 bg-accent/10 hover:bg-accent/30 cursor-col-resize"
			onresize={(d) => (sizes = d)}
		>
			{#snippet start()}
				<div class="p-4 h-full bg-surface text-xs text-muted-contrast overflow-auto">
					<p class="font-semibold text-canvas-contrast mb-1">Sidebar</p>
					<p>Item 1</p>
					<p>Item 2</p>
					<p>Item 3</p>
				</div>
			{/snippet}
			{#snippet end()}
				<div class="p-4 h-full overflow-auto">
					<p class="font-semibold text-sm text-canvas-contrast mb-1">Content</p>
					<p class="text-xs text-muted-contrast">Panel sizes: {sizes.start.toFixed(1)}% / {sizes.end.toFixed(1)}%</p>
				</div>
			{/snippet}
		</Splitter>
	</div>
</div>
