<script lang="ts">
	import DocText from '../../bricks/DocText.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		...props
	} = $props<{
		children: Snippet;
		[key: string]: any;
	}>();
</script>

<DocText {...props}>
	{@render children()}
</DocText>
