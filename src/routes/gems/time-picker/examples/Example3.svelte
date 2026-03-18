<script lang="ts">
	import { TimePicker } from '$lib';

	let v1 = $state<string | null>(null);
	let v2 = $state<string | null>(null);
	let v3 = $state<string | null>(null);
</script>

<div class="flex flex-col gap-3 w-56">
	<TimePicker bind:value={v1} placeholder="Normal"/>
	<TimePicker bind:value={v2} compact placeholder="Compact"/>
	<TimePicker bind:value={v3} small placeholder="Small" clearable/>
	<TimePicker value={"00:12"} disabled clearable placeholder="Disabled"/>
</div>

