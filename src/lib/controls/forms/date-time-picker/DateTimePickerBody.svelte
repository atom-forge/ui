<script lang="ts">
	import DatePickerBody from '../date-picker/DatePickerBody.svelte';
	import TimePickerBody from '../time-picker/TimePickerBody.svelte';
	import {untrack} from 'svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
		min,
		max,
		round = false,
		seconds = false,
		disabled = false,
		onselect,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		round?: RoundProp;
		seconds?: boolean;
		disabled?: boolean;
		onselect?: (value: Date | null) => void;
	} = $props();

	function pad(n: number) { return String(n).padStart(2, '0'); }

	function datePart(d: Date | null): Date | null {
		if (!d) return null;
		return new Date(d.getFullYear(), d.getMonth(), d.getDate());
	}

	function timePart(d: Date | null): string | null {
		if (!d) return null;
		return seconds
			? `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
			: `${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}

	function defaultTime() {
		return seconds ? '00:00:00' : '00:00';
	}

	let selectedDate = $state(untrack(() => datePart(value)));
	let selectedTime = $state(untrack(() => timePart(value) ?? defaultTime()));

	$effect(() => {
		selectedDate = datePart(value);
		selectedTime = timePart(value) ?? defaultTime();
	});

	function compose(date: Date | null, time: string | null): Date | null {
		if (!date || !time) return null;
		const [h, m, s] = time.split(':').map(Number);
		if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s ?? 0, 0);
	}

	function emit() {
		onselect?.(compose(selectedDate, selectedTime));
	}

	function handleDate(next: Date | null) {
		selectedDate = next;
		emit();
	}

	function handleTime(next: string | null) {
		selectedTime = next ?? defaultTime();
		emit();
	}
</script>

<div class="flex flex-col gap-4">
	<DatePickerBody value={selectedDate} {min} {max} {disabled} onselect={handleDate}/>

	<div class="border-t border-frame pt-3">
		<TimePickerBody value={selectedTime} {round} {seconds} {disabled} onselect={handleTime}/>
	</div>
</div>
