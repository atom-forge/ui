<script lang="ts">
	import { Checkbox } from "$lib";

	let isChecked = $state(false);
</script>

<div class="flex flex-col gap-2">
	<Checkbox bind:value={isChecked} label="Accept terms and conditions" />
	<p>Current value: {isChecked}</p>
</div>
