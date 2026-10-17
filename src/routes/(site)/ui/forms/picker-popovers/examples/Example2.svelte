<script lang="ts">
	import { Button, DateTimePopover } from '@atom-forge/ui';

	let appointment = $state<Date | null>(new Date(2026, 9, 4, 9, 30));
	let saved = $state(false);

	async function confirm(next: Date) {
		await new Promise<void>((resolve) => setTimeout(resolve, 500));
		appointment = next;
		saved = true;
	}
</script>

<div class="space-y-3">
	<DateTimePopover value={appointment} round={15} title="Reschedule appointment" confirmLabel="Save appointment" onconfirm={confirm}>
		{#snippet trigger(open, isOpen)}
			<Button label="Reschedule" accent onclick={(event) => open(event)} aria-expanded={isOpen}/>
		{/snippet}
	</DateTimePopover>
	<p class="text-sm text-muted-contrast">{appointment?.toLocaleString() ?? '—'}{saved ? ' — saved' : ''}</p>
</div>
