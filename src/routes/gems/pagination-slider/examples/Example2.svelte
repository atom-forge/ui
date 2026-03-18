<script lang="ts">
	import { PaginationSlider } from '$lib';

	const total    = 500;
	const pageSize = 25;
	const totalPages = Math.ceil(total / pageSize);

	let page1 = $state(1);
	let page2 = $state(1);
	let page3 = $state(1);

	const start = (p: number) => (p - 1) * pageSize + 1;
	const end   = (p: number) => Math.min(p * pageSize, total);
</script>

<div class="flex flex-col gap-6 w-96">
	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Normal</p>
		<PaginationSlider bind:page={page1} {total} {pageSize}/>
		<p class="text-xs text-muted-contrast tabular-nums">
			<span class="text-canvas-contrast font-medium">{page1}/{totalPages}</span>
			&middot; {start(page1)}–{end(page1)} of {total}
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Compact</p>
		<PaginationSlider bind:page={page2} {total} {pageSize} compact/>
		<p class="text-xs text-muted-contrast tabular-nums">
			<span class="text-canvas-contrast font-medium">{page2}/{totalPages}</span>
			&middot; {start(page2)}–{end(page2)} of {total}
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Small</p>
		<PaginationSlider bind:page={page3} {total} {pageSize} small/>
		<p class="text-xs text-muted-contrast tabular-nums">
			<span class="text-canvas-contrast font-medium">{page3}/{totalPages}</span>
			&middot; {start(page3)}–{end(page3)} of {total}
		</p>
	</div>
</div>
