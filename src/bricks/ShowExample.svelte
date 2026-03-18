<script lang="ts">
	import {Accordion, AccordionItem, Card} from "$lib";
	import {Code} from "lucide-svelte";
	import {type Component} from "svelte";
	import ShowCode, {type CodeFile} from "./ShowCode.svelte";

	let {component: Control, code, displayCode}: {
		component?: Component;
		code: string | CodeFile[];
		displayCode?: (code: string) => string;
	} = $props();
</script>

<div class="flex flex-col gap-4">
	{#if Control}
		<Card class="p-4 flex justify-center">
			<Control/>
		</Card>
	{/if}
	<Accordion compact>
		<AccordionItem title="Show Code" icon={Code}>
			<ShowCode {code} {displayCode} class="border-0 rounded-none"/>
		</AccordionItem>
	</Accordion>
</div>
