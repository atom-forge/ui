<script lang="ts">
	import {Select} from '$lib';

	const options = [
		{value: 'apple',  label: 'Apple'},
		{value: 'banana', label: 'Banana'},
		{value: 'cherry', label: 'Cherry'},
	];

	let value = $state<string>('apple');
</script>

<div class="max-w-xs flex flex-col gap-3">
	<Select {options} bind:value placeholder="Normal (default)"/>
	<Select {options} bind:value compact placeholder="Compact"/>
	<Select {options} bind:value small placeholder="Small"/>
</div>
