<script lang="ts">
	import { Pagination } from '$lib';

	let page1 = $state(5);
	let page2 = $state(5);
	let page3 = $state(5);
</script>

<div class="flex flex-col gap-6 items-start">
	<div>
		<p class="text-xs text-muted-contrast mb-2">siblings=0 — minimal</p>
		<Pagination page={page1} total={20} siblings={0} onchange={p => page1 = p}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">siblings=1 — default</p>
		<Pagination page={page2} total={20} siblings={1} onchange={p => page2 = p}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">siblings=2 — wider</p>
		<Pagination page={page3} total={20} siblings={2} onchange={p => page3 = p}/>
	</div>
</div>
