<script lang="ts">
	import { Field, Textarea } from '$lib';

	let v1 = $state('');
	let v2 = $state('');
	let v3 = $state('');
</script>

<div class="flex flex-col gap-3 w-80">
	<Field label="Normal">
		<Textarea bind:value={v1} placeholder="Normal size" rows={2}/>
	</Field>
	<Field label="Compact">
		<Textarea bind:value={v2} placeholder="Compact size" rows={2} compact/>
	</Field>
	<Field label="Small">
		<Textarea bind:value={v3} placeholder="Small size" rows={2} small/>
	</Field>
	<Field label="Invalid">
		<Textarea value="bad input" invalid rows={2}/>
	</Field>
	<Field label="Disabled">
		<Textarea value="Cannot edit this" disabled rows={2}/>
	</Field>
</div>

