<script lang="ts">
	import { Root } from '$lib';
	let { children } = $props();
</script>

<Root dark>
	{@render children()}
</Root>
