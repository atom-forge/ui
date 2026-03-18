<script lang="ts">
	import { PaginationSlider } from '$lib';

	let page = $state(1);
	const total = 142;
	const pageSize = 20;

	const totalPages = $derived(Math.ceil(total / pageSize));
	const start      = $derived((page - 1) * pageSize + 1);
	const end        = $derived(Math.min(page * pageSize, total));
</script>

<div class="flex flex-col gap-3 w-96">
	<PaginationSlider bind:page {total} {pageSize}/>
	<p class="text-xs text-muted-contrast tabular-nums">
		<span class="text-canvas-contrast font-medium">{page}/{totalPages}</span>
		&middot; {start}–{end} of {total}
	</p>
</div>
