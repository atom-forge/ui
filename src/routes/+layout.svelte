<script lang="ts">
	import Root from '../lib/core/Root.svelte';
	import '../site/site.css';
	import type {ChildrenProp} from '@atom-forge/svelte-helpers';

	let {children}: ChildrenProp = $props();
</script>

<Root>
	{@render children()}
</Root>
