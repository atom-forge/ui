<script lang="ts">
	import DocTitle from '../../bricks/DocTitle.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		...props
	} = $props<{
		children: Snippet;
		[key: string]: any;
	}>();
</script>

<DocTitle {...props}>
	{@render children()}
</DocTitle>
