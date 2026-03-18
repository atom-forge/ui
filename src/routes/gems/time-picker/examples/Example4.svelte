<script lang="ts">
	import { TimePicker } from '$lib';

	let v1 = $state<string | null>(null);
	let v2 = $state<string | null>(null);
	let v3 = $state<string | null>(null);
	let v4 = $state<string | null>(null);
</script>

<div class="flex flex-col gap-3 w-64">
	<div class="flex items-center gap-3">
		<TimePicker bind:value={v1} round={0} clearable class="flex-1"/>
		<span class="text-xs text-muted-contrast w-20">hour — {v1 ?? '—'}</span>
	</div>
	<div class="flex items-center gap-3">
		<TimePicker bind:value={v2} round={15} clearable class="flex-1"/>
		<span class="text-xs text-muted-contrast w-20">15 min — {v2 ?? '—'}</span>
	</div>
	<div class="flex items-center gap-3">
		<TimePicker bind:value={v3} round={30} clearable class="flex-1"/>
		<span class="text-xs text-muted-contrast w-20">30 min — {v3 ?? '—'}</span>
	</div>
	<div class="flex items-center gap-3">
		<TimePicker bind:value={v4} round={[0, 15, 30, 45]} clearable class="flex-1"/>
		<span class="text-xs text-muted-contrast w-20">list — {v4 ?? '—'}</span>
	</div>
</div>

