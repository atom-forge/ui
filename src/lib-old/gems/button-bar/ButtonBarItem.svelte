<script lang="ts">
	import type {AnyProp, ChildrenProp, ClassProp} from "$lib/tools/types";
	import {twMerge} from "tailwind-merge";

	let {
		children,
		class: classes = '',
		...props
	}: ChildrenProp & ClassProp & AnyProp = $props();
</script>

<div class={twMerge('flex items-center self-stretch bg-control px-2', classes)} {...props}>
	{@render children()}
</div>
