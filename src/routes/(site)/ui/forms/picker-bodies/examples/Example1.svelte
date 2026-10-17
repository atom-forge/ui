<script lang="ts">
	import { Button, Card, DatePickerBody, TimePickerBody } from '@atom-forge/ui';

	let date = $state<Date | null>(new Date(2026, 9, 4));
	let time = $state<string | null>('09:30:00');
</script>

<div class="flex flex-wrap items-start gap-6">
	<Card class="p-4 space-y-3">
		<DatePickerBody value={date} weekStart={0} disabledDays={[0, 6]} onselect={(next) => date = next}/>
		<p class="text-xs text-muted-contrast">Date: {date?.toLocaleDateString() ?? '—'}</p>
		<Button label="Clear date" secondary compact onclick={() => date = null}/>
	</Card>
	<Card class="p-4 space-y-3">
		<TimePickerBody value={time} seconds round={[0, 15, 30, 45]} onselect={(next) => time = next}/>
		<p class="text-xs text-muted-contrast">Time: {time ?? '—'}</p>
	</Card>
</div>
