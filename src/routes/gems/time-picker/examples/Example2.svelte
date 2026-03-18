<script lang="ts">
	import { TimePicker } from '$lib';

	let value = $state<string | null>('09:30:00');
</script>

<div class="flex flex-col gap-4 w-56">
	<TimePicker bind:value seconds clearable/>
	<p class="text-xs text-muted-contrast">Selected: {value ?? '—'}</p>
</div>

