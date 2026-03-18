<script lang="ts">
	import ApiBlock from '../../bricks/ApiBlock.svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		children,
		...props
	} = $props<{
		title: string;
		children: Snippet;
		[key: string]: any;
	}>();
</script>

<ApiBlock {title} {...props}>
	{@render children()}
</ApiBlock>
