<script lang="ts">
	import { NativeSelect } from "$lib";

	const options = [
		{value: '1', label: 'Option 1'},
		{value: '2', label: 'Option 2'},
		{value: '3', label: 'Option 3'},
	];
</script>

<NativeSelect {options} borderless/>
