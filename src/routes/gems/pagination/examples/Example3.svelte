<script lang="ts">
	import { Pagination } from '$lib';

	let page = $state(4);
</script>

<div class="flex flex-col gap-5 items-start">
	<div>
		<p class="text-xs text-muted-contrast mb-2">Normal</p>
		<Pagination {page} total={10} onchange={p => page = p}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">Compact</p>
		<Pagination {page} total={10} compact onchange={p => page = p}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">Small</p>
		<Pagination {page} total={10} small onchange={p => page = p}/>
	</div>
</div>
