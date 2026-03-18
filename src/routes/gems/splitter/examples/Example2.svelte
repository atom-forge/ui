<script lang="ts">
	import { Splitter } from '$lib';
</script>

<div class="h-64 w-full border border-frame rounded-lg overflow-hidden">
	<Splitter orientation="horizontal" initialSize={35}>
		{#snippet start()}
			<div class="p-4 h-full bg-surface">
				<p class="font-medium text-sm text-canvas-contrast mb-2">Top Panel</p>
				<p class="text-xs text-muted-contrast">Horizontal orientation — panels stack vertically.</p>
			</div>
		{/snippet}
		{#snippet end()}
			<div class="p-4 h-full">
				<p class="font-medium text-sm text-canvas-contrast mb-2">Bottom Panel</p>
				<p class="text-xs text-muted-contrast">Drag the horizontal divider to resize.</p>
			</div>
		{/snippet}
	</Splitter>
</div>
