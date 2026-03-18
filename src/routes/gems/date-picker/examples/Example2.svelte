<script lang="ts">
	import {DatePicker} from '$lib';

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	let selected: Date | null = $state(null);
</script>

<div class="flex flex-col gap-4 max-w-xs">
	<DatePicker
		bind:value={selected}
		min={today}
		disabledDays={[0, 6]}
		placeholder="Pick a weekday"
		clearable
	/>
	<p class="text-sm text-muted-contrast">
		{selected ? `Selected: ${selected.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}` : 'No date selected.'}
	</p>
</div>
