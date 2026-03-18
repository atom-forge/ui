<script lang="ts">
	import type {ChildrenProp} from "$lib";
	import {Icon, type IconDefinition} from "$lib/gems/icon";
	import type {TabsVariant} from '$lib/gems/tabs/Tabs.svelte';
	import {getContext} from 'svelte';
	import {twMerge} from 'tailwind-merge';

	let {
		id,
		icon,
		children
	}: ChildrenProp & {
		id: string
		icon?: IconDefinition
	} = $props();

	const context = getContext<{ isActive: (id: string) => boolean; selectTab: (id: string) => void; variant: TabsVariant }>('tabs-context');
	const isLine = context.variant === 'line';
	const isActive = $derived(context.isActive(id));

	const classes = $derived(twMerge(
		'flex items-center gap-2 transition-all duration-150 cursor-pointer',
		isLine  && 'px-4 py-2 -mb-px text-sm font-medium border-b-2',
		!isLine && 'px-3 py-1 rounded-md text-sm',
		isLine  &&  isActive && 'border-accent text-control-c',
		isLine  && !isActive && 'border-transparent text-muted-c hover:text-control-c hover:base-b',
		!isLine &&  isActive && 'bg-control text-control-c shadow-sm',
		!isLine && !isActive && 'text-muted-c hover:bg-secondary/50',
	));
</script>

<button class={classes} onclick={() => context.selectTab(id)}>
	{#if icon}
		<Icon {icon} size="5"/>
	{/if}
	{@render children()}
</button>
