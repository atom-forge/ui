<script lang="ts">
	import { DateTimePicker } from '@atom-forge/ui';

	let value = $state<Date | null>(null);
</script>

<div class="max-w-sm space-y-3">
	<DateTimePicker bind:value clearable/>
	<p class="text-sm text-muted-contrast">{value ? value.toLocaleString() : 'No appointment selected.'}</p>
</div>
