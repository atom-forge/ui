<script lang="ts">
	import { Accordion, AccordionItem } from "$lib";
	import {Home} from "lucide-svelte";
</script>

<div class="space-y-2 flex flex-col w-full">

	<Accordion>
		<AccordionItem title="Normal" icon={Home}>
			<p class="p-4">Content for normal accordion.</p>
		</AccordionItem>
	</Accordion>
	<Accordion compact>
		<AccordionItem title="Compact" icon={Home}>
			<p class="p-4">Content for compact accordion.</p>
		</AccordionItem>
	</Accordion>
	<Accordion small>
		<AccordionItem title="Small" icon={Home}>
			<p class="p-4">Content for small accordion.</p>
		</AccordionItem>
	</Accordion>

</div>
