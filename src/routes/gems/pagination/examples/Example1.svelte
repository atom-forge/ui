<script lang="ts">
	import { Pagination } from '$lib';

	let page = $state(1);
</script>

<div class="flex flex-col gap-4 items-start">
	<Pagination {page} total={10} onchange={p => page = p}/>
	<p class="text-sm text-muted-contrast">Page {page} of 10</p>
</div>
