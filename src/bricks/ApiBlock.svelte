<script lang="ts">
	import { Accordion, AccordionItem } from '$lib';
	import { Binary } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let {
		title,
		children,
		class: className
	} = $props<{
		title: string;
		children: Snippet;
		class?: string;
	}>();
</script>

<Accordion compact class={twMerge('mt-8', className)}>
	<AccordionItem {title} icon={Binary}>
		<div class="overflow-x-auto p-4">
			{@render children()}
		</div>
	</AccordionItem>
</Accordion>
