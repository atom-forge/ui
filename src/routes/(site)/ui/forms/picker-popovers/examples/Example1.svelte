<script lang="ts">
	import { Button, DatePopover, TimePopover } from '@atom-forge/ui';

	let date = $state<Date | null>(null);
	let time = $state<string | null>('09:00');
	let cancelled = $state(false);
</script>

<div class="flex flex-wrap items-center gap-3">
	<DatePopover value={date} title="Choose a delivery day" confirmLabel="Use date"
		onconfirm={(next) => { date = next; cancelled = false; }} oncancel={() => cancelled = true}>
		{#snippet trigger(open, isOpen)}
			<Button label={date?.toLocaleDateString() ?? 'Delivery date'} secondary
				onclick={(event) => open(event)} aria-expanded={isOpen}/>
		{/snippet}
	</DatePopover>
	<TimePopover value={time} round={15} title="Choose a delivery time" confirmLabel="Use time" onconfirm={(next) => { time = next; }}>
		{#snippet trigger(open, isOpen)}
			<Button label={time ?? 'Delivery time'} outline onclick={(event) => open(event)} aria-expanded={isOpen}/>
		{/snippet}
	</TimePopover>
	{#if cancelled}<span class="text-xs text-muted-contrast">Date selection cancelled with Escape.</span>{/if}
</div>
