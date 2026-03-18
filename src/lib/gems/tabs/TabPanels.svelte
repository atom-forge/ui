<script lang="ts">
	import type {ChildrenProp, ClassProp} from "$lib";
	import {twMerge} from 'tailwind-merge';

	let {
		children,
		class: classes
	}: & ChildrenProp
		& ClassProp = $props();
</script>

<div class={twMerge("py-4", classes)}>
	{@render children()}
</div>
