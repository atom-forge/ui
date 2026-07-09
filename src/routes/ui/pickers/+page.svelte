<script lang="ts">
	import {
		Button,
		Card,
		DatePicker,
		DatePickerBody,
		DatePopover,
		DateTimePicker,
		DateTimePickerBody,
		DateTimePopover,
		TimePicker,
		TimePickerBody,
		TimePopover,
	} from '../../../lib/index.js';

	let fieldDate = $state<Date | null>(new Date());
	let fieldTime = $state<string | null>('09:30:15');
	let fieldDateTime = $state<Date | null>(new Date(2026, 6, 8, 9, 30, 15));

	let bodyDate = $state<Date | null>(new Date());
	let bodyTime = $state<string | null>('10:15:30');
	let bodyDateTime = $state<Date | null>(new Date(2026, 6, 8, 10, 15, 30));

	let popoverDate = $state<Date | null>(null);
	let popoverTime = $state<string | null>(null);
	let popoverDateTime = $state<Date | null>(null);
	let lastConfirm = $state('Nothing confirmed yet');

	const minDate = new Date(2026, 0, 1);
	const maxDate = new Date(2026, 11, 31);

	function formatDate(value: Date | null) {
		return value ? value.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) : 'null';
	}

	function formatDateTime(value: Date | null) {
		return value ? value.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'}) : 'null';
	}

	function formatTime(value: string | null) {
		return value ?? 'null';
	}

	function wait(ms: number) {
		return new Promise((resolve) => window.setTimeout(resolve, ms));
	}

	async function confirmDate(value: Date) {
		await wait(500);
		popoverDate = value;
		lastConfirm = `Date: ${formatDate(value)}`;
	}

	async function confirmTime(value: string) {
		await wait(500);
		popoverTime = value;
		lastConfirm = `Time: ${value}`;
	}

	async function confirmDateTime(value: Date) {
		await wait(500);
		popoverDateTime = value;
		lastConfirm = `DateTime: ${formatDateTime(value)}`;
	}
</script>

<div class="p-8 flex flex-col gap-8">
	<section class="flex flex-col gap-2">
		<h1 class="text-lg font-semibold">Picker Sandbox</h1>
		<p class="max-w-3xl text-sm text-muted-contrast">
			Date, time, and date-time controls with field, popover, and body-only layers.
		</p>
	</section>

	<section class="grid grid-cols-1 xl:grid-cols-3 gap-4">
		<Card class="p-4 flex flex-col gap-4">
			<div>
				<h2 class="text-sm font-semibold">Field controls</h2>
				<p class="text-xs text-muted-contrast">Regular form controls using popovers internally.</p>
			</div>

			<div class="flex flex-col gap-3">
				<DatePicker bind:value={fieldDate} min={minDate} max={maxDate} clearable/>
				<TimePicker bind:value={fieldTime} round={5} seconds clearable/>
				<DateTimePicker bind:value={fieldDateTime} min={minDate} max={maxDate} round={5} seconds clearable format={formatDateTime}/>
			</div>

			<div class="rounded-control bg-muted p-3 text-xs text-muted-contrast leading-6">
				<div>Date: <span class="text-canvas-contrast">{formatDate(fieldDate)}</span></div>
				<div>Time: <span class="text-canvas-contrast">{formatTime(fieldTime)}</span></div>
				<div>DateTime: <span class="text-canvas-contrast">{formatDateTime(fieldDateTime)}</span></div>
			</div>
		</Card>

		<Card class="p-4 flex flex-col gap-4">
			<div class="flex flex-wrap gap-2">
				<DatePopover value={popoverDate} min={minDate} max={maxDate} onconfirm={confirmDate}>
					{#snippet trigger(open, isOpen)}
						<Button secondary outline label="Choose date" onclick={open} aria-expanded={isOpen}/>
					{/snippet}
				</DatePopover>

				<TimePopover value={popoverTime} round={5} seconds onconfirm={confirmTime}>
					{#snippet trigger(open, isOpen)}
						<Button secondary outline label="Choose time" onclick={open} aria-expanded={isOpen}/>
					{/snippet}
				</TimePopover>

				<DateTimePopover value={popoverDateTime} min={minDate} max={maxDate} round={5} seconds onconfirm={confirmDateTime}>
					{#snippet trigger(open, isOpen)}
						<Button secondary outline label="Choose date and time" onclick={open} aria-expanded={isOpen}/>
					{/snippet}
				</DateTimePopover>
			</div>

			<div class="rounded-control bg-muted p-3 text-xs text-muted-contrast leading-6">
				<div>Last confirm: <span class="text-canvas-contrast">{lastConfirm}</span></div>
				<div>Date: <span class="text-canvas-contrast">{formatDate(popoverDate)}</span></div>
				<div>Time: <span class="text-canvas-contrast">{formatTime(popoverTime)}</span></div>
				<div>DateTime: <span class="text-canvas-contrast">{formatDateTime(popoverDateTime)}</span></div>
			</div>
		</Card>

		<Card class="p-4 flex flex-col gap-4">
			<div>
				<h2 class="text-sm font-semibold">Body components</h2>
				<p class="text-xs text-muted-contrast">Inline picker surfaces without trigger or overlay.</p>
			</div>

			<div class="flex flex-col gap-5">
				<DatePickerBody value={bodyDate} min={minDate} max={maxDate} onselect={(value) => { bodyDate = value; }}/>
				<div class="border-t border-frame pt-4">
					<TimePickerBody value={bodyTime} round={15} seconds onselect={(value) => { bodyTime = value; }}/>
				</div>
				<div class="border-t border-frame pt-4">
					<DateTimePickerBody value={bodyDateTime} min={minDate} max={maxDate} round={15} seconds onselect={(value) => { bodyDateTime = value; }}/>
				</div>
			</div>
		</Card>
	</section>
</div>
