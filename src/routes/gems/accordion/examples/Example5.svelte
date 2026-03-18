<script lang="ts">
	import { Accordion, AccordionItem } from "$lib";
	import {Settings, User} from "lucide-svelte";
</script>

<Accordion>
	<AccordionItem title="User Profile" icon={User}>
		<p class="p-4">User profile settings.</p>
	</AccordionItem>
	<AccordionItem title="General Settings" icon={Settings}>
		<p class="p-4">General application settings.</p>
	</AccordionItem>
</Accordion>
