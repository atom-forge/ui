<script lang="ts">
	import {Button, DatePicker, Input, NativeSelect, getModalManager, getToastManager, Field} from "$lib";

	const modal = getModalManager();
	const toast = getToastManager();

	let {resource}: {resource: {name: string; type: string}} = $props();

	let date = $state<Date | null>(null);
	let timeFrom = $state('09:00');
	let timeTo = $state('10:00');
	let purpose = $state('');
	let attendees = $state('1');

	const timeOptions = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
		'12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00']
		.map(t => ({value: t, label: t}));

	const attendeeOptions = Array.from({length: 10}, (_, i) => ({value: String(i+1), label: `${i+1} person${i>0?'s':''}`}));

	function book() {
		if (!date) return;
		const dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
		toast.show(`${resource.name} booked for ${dateStr} ${timeFrom}–${timeTo}`, {type: 'success'});
		modal.close();
	}
</script>

<div class="p-6 bg-surface rounded-lg shadow-lg w-96 flex flex-col gap-4">
	<div>
		<h2 class="text-lg font-semibold text-canvas-contrast">Book {resource.name}</h2>
		<p class="text-xs text-muted-contrast">{resource.type}</p>
	</div>

	<Field label="Date">
		<DatePicker bind:value={date}/>
	</Field>

	<div class="grid grid-cols-2 gap-3">
		<Field label="From">
			<NativeSelect options={timeOptions} bind:value={timeFrom}/>
		</Field>
		<Field label="To">
			<NativeSelect options={timeOptions} bind:value={timeTo}/>
		</Field>
	</div>

	{#if resource.type === 'Meeting Room'}
		<Field label="Attendees">
			<NativeSelect options={attendeeOptions} bind:value={attendees}/>
		</Field>
	{/if}

	<Field label="Purpose (optional)">
		<Input bind:value={purpose} placeholder="e.g. Sprint planning, 1:1"/>
	</Field>

	<div class="flex justify-end gap-2">
		<Button label="Cancel" ghost onclick={() => modal.close()}/>
		<Button label="Confirm Booking" accent onclick={book}/>
	</div>
</div>
