<script lang="ts">
	import type {ClassProp} from "$lib/tools/types";
	import {Icon, type IconDefinition} from "$lib/gems/icon";
	import type {Snippet} from 'svelte';
	import {twMerge} from "tailwind-merge";

	let {
		icon,
		title,
		description,
		class: classes,
		children,
	}: ClassProp & {
		icon: IconDefinition
		title: string
		description?: string
		children?: Snippet
	} = $props();
</script>

<div class={twMerge('flex flex-col items-center justify-center gap-3 py-12 text-center', classes)}>
	<div class="text-muted-c opacity-40">
		<Icon {icon} size="12"/>
	</div>
	<p class="text-base font-medium text-control-c">{title}</p>
	{#if description}
		<p class="text-sm text-muted-c max-w-xs">{description}</p>
	{/if}
	{#if children}
		<div class="mt-1">
			{@render children()}
		</div>
	{/if}
</div>
