<script lang="ts">
	import { DateTimePicker } from '@atom-forge/ui';

	const min = new Date(2026, 9, 1);
	const max = new Date(2026, 9, 31, 23, 59, 59);
	let value = $state<Date | null>(new Date(2026, 9, 4, 9, 30, 15));
	const format = (date: Date) => date.toLocaleString('en-US', {
		year: 'numeric', month: 'short', day: 'numeric',
		hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
	});
</script>

<div class="max-w-sm space-y-3">
	<DateTimePicker bind:value {min} {max} seconds round={15} {format} clearable/>
	<DateTimePicker bind:value compact {format}/>
	<DateTimePicker bind:value small {format}/>
	<DateTimePicker {value} disabled {format}/>
	<p class="text-xs text-muted-contrast">Local date and time: {value ? format(value) : '—'}</p>
</div>
