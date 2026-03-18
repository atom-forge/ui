<script lang="ts">
	import { TimePicker } from '$lib';

	let value = $state<string | null>(null);
</script>

<div class="flex flex-col gap-4 w-56">
	<TimePicker bind:value clearable placeholder="Select time"/>
	<p class="text-xs text-muted-contrast">Selected: {value ?? '—'}</p>
</div>

