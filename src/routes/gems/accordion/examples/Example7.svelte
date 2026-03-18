<script lang="ts">
	import { Collapsible, Button } from "$lib";

	let open = $state(false);
</script>

<div class="space-y-3 w-full">
	<Collapsible title="Basic Collapsible">
		<p class="p-4">A standalone collapsible — no <code>Accordion</code> wrapper needed.</p>
	</Collapsible>

	<Collapsible title="Controlled — open: {open}" bind:open>
		<p class="p-4">This panel is controlled via <code>bind:open</code>. Toggle it from outside too.</p>
	</Collapsible>

	<Button secondary compact onclick={() => open = !open}>
		Toggle from outside
	</Button>
</div>
