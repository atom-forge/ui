<script lang="ts">
	import type {Snippet} from "svelte";

	let {children}: {children: Snippet} = $props();
</script>

<div class="max-w-5xl mx-auto py-8">
	{@render children()}
</div>
