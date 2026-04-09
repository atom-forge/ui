<script lang="ts">
	import Root from '../lib/core/Root.svelte';
	import '../lib/core/theme.css';
	import type {ChildrenProp} from '../lib/helpers/types';

	let {children}: ChildrenProp = $props();
</script>

<Root>
	{@render children()}
</Root>
