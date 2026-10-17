<script lang="ts">
	import { Root } from '@atom-forge/ui';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<Root>{@render children()}</Root>
