<script lang="ts">
	import {Select} from '$lib';

	const options = [
		{value: 'apple',  label: 'Apple'},
		{value: 'banana', label: 'Banana'},
		{value: 'cherry', label: 'Cherry'},
	];

	let value = $state<string>('banana');
</script>

<div class="max-w-xs flex flex-col gap-3">
	<p class="text-xs text-muted-contrast">Disabled</p>
	<Select {options} bind:value disabled/>
	<p class="text-xs text-muted-contrast">No search input (<code>searchable={'{false}'}</code>)</p>
	<Select {options} bind:value searchable={false}/>
</div>
