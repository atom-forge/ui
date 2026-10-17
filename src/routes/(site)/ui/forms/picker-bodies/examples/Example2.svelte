<script lang="ts">
	import { Card, DateTimePickerBody } from '@atom-forge/ui';

	let value = $state<Date | null>(new Date(2026, 9, 4, 14, 30));
</script>

<Card class="p-4 w-fit space-y-3">
	<DateTimePickerBody {value} round={15} onselect={(next) => value = next}/>
	<p class="text-xs text-muted-contrast">{value?.toLocaleString() ?? 'Select a date to compose a value.'}</p>
</Card>
