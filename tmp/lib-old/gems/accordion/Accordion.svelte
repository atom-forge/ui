<script lang="ts">
	import {createAccordionManager} from '$lib/gems/accordion/accordion-manager.svelte.js';
	import type {AnyProp, ChildrenProp, ClassProp, XOR} from "$lib/tools/types";
	import {untrack} from 'svelte';
	import {twMerge} from "tailwind-merge";

	let {
		multiple,
		compact,
		borderless,
		joined,
		small,
		class: classes,
		children,
		...props
	}: & ClassProp
		& AnyProp
		& ChildrenProp
		& XOR<{ small: true }, { compact: true }, {}>
		& {
		multiple?: boolean
		borderless?: boolean
		joined?: boolean
	} = $props();

	createAccordionManager(
		untrack(() => !!multiple),
		untrack(() => small ? 'small' : compact ? 'compact' : 'normal'),
		untrack(() => !!borderless),
		untrack(() => !!joined)
	);

	const wrapperClass = $derived(twMerge(
		'w-full',
		joined  && 'border border-base-b rounded-lg overflow-hidden divide-y divide-base-b',
		!joined && 'space-y-2',
		classes
	));
</script>

<div class={wrapperClass} {...props}>
	{@render children()}
</div>
