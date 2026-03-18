<script lang="ts">
	import {MultiSelect} from '$lib';

	const tags = [
		{ label: 'Bug', value: '1' },
		{ label: 'Feature', value: '2' },
		{ label: 'Enhancement', value: '3' },
		{ label: 'Documentation', value: '4' },
		{ label: 'Question', value: '5' },
	];

	let selected = $state(['1', '2']);
</script>

<div class="flex flex-col gap-3 w-80">
	<MultiSelect options={tags} value={['1', '3']} disabled placeholder="Disabled"/>
	<MultiSelect options={tags} bind:value={selected} max={3} clearable placeholder="Max 3 items (clearable)"/>
	<p class="text-xs text-muted-contrast">Selected: <code>{JSON.stringify(selected)}</code></p>
</div>
