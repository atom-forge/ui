<script lang="ts">
	import { NativeSelect } from "$lib";

	let selectedValue = '2';
	const options = [
		{value: '1', label: 'Option 1'},
		{value: '2', label: 'Option 2'},
		{value: '3', label: 'Option 3'},
	];
</script>

<div class="flex items-center gap-4">
	<NativeSelect {options} bind:value={selectedValue}/>
	<span>Selected value: <span class="font-mono">{selectedValue}</span></span>
</div>
