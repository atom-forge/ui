<script lang="ts">
	import {Select} from '$lib';

	const options = [
		{value: 'apple',  label: 'Apple'},
		{value: 'banana', label: 'Banana'},
		{value: 'cherry', label: 'Cherry'},
		{value: 'mango',  label: 'Mango'},
		{value: 'grape',  label: 'Grape'},
	];

	let value = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs space-y-2">
	<Select {options} bind:value placeholder="Pick a fruit..."/>
	<p class="text-xs text-muted-contrast">value: <span class="text-canvas-contrast">{value ?? '—'}</span></p>
</div>
