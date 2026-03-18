<script lang="ts">
	import InlineCode from '../../bricks/InlineCode.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		...props
	} = $props<{
		children: Snippet;
		[key: string]: any;
	}>();
</script>

<InlineCode {...props}>
	{@render children()}
</InlineCode>
