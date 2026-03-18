<script lang="ts">
	import { Splitter } from '$lib';
</script>

<div class="h-64 w-full border border-frame rounded-lg overflow-hidden">
	<Splitter>
		{#snippet start()}
			<div class="p-4 h-full bg-surface">
				<p class="font-medium text-sm text-canvas-contrast mb-2">Left Panel</p>
				<p class="text-xs text-muted-contrast">Drag the divider to resize. You can also focus it and use arrow keys.</p>
			</div>
		{/snippet}
		{#snippet end()}
			<div class="p-4 h-full">
				<p class="font-medium text-sm text-canvas-contrast mb-2">Right Panel</p>
				<p class="text-xs text-muted-contrast">The right panel fills the remaining space.</p>
			</div>
		{/snippet}
	</Splitter>
</div>
