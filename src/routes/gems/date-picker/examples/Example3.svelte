<script lang="ts">
	import {DatePicker} from '$lib';

	let v1: Date | null = $state(null);
	let v2: Date | null = $state(null);
	let v3: Date | null = $state(null);

	const huFormat = (d: Date) => d.toLocaleDateString('hu-HU');
</script>

<div class="flex flex-col gap-3 max-w-xs">
	<DatePicker bind:value={v1} format={huFormat} placeholder="Normal (hu-HU format)" clearable/>
	<DatePicker bind:value={v2} format={huFormat} placeholder="Compact" clearable compact/>
	<DatePicker bind:value={v3} format={huFormat} placeholder="Small" clearable small/>
</div>
