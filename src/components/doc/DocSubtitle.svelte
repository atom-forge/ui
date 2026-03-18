<script lang="ts">
	import DocSubtitle from '../../bricks/DocSubtitle.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		...props
	} = $props<{
		children: Snippet;
		[key: string]: any;
	}>();
</script>

<DocSubtitle {...props}>
	{@render children()}
</DocSubtitle>
