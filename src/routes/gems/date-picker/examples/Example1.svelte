<script lang="ts">
	import {DatePicker} from '$lib';

	let selected: Date | null = $state(null);
</script>

<div class="flex flex-col gap-4 max-w-xs">
	<DatePicker bind:value={selected} clearable/>
	<p class="text-sm text-muted-contrast">
		{selected ? `Selected: ${selected.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}` : 'No date selected.'}
	</p>
</div>
