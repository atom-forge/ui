<script lang="ts">
	import { NativeSelect } from "$lib";

	const options = [
		{value: '1', label: 'Option 1'},
		{value: '2', label: 'Option 2'},
		{value: '3', label: 'Option 3'},
	];
</script>

<div class="flex items-center gap-4">
	<NativeSelect {options}/>
	<NativeSelect {options} compact/>
	<NativeSelect {options} small/>
</div>
