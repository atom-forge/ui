<script lang="ts">
	import {MultiSelect} from '$lib';

	const skills = [
		{ label: 'TypeScript', value: 'ts' },
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Node.js', value: 'node' },
		{ label: 'Python', value: 'python' },
		{ label: 'Rust', value: 'rust' },
		{ label: 'Go', value: 'go' },
	];

	let selected = $state(['ts', 'svelte', 'react']);
</script>

<div class="flex flex-col gap-3 w-96">
	<MultiSelect options={skills} bind:value={selected} sortable placeholder="Select skills…"/>
	<p class="text-xs text-muted-contrast">Order: <code>{JSON.stringify(selected)}</code></p>
</div>
