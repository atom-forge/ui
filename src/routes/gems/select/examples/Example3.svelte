<script lang="ts">
	import {Select} from '$lib';

	const ALL = [
		{value: 'ts',  label: 'TypeScript'},
		{value: 'js',  label: 'JavaScript'},
		{value: 'py',  label: 'Python'},
		{value: 'rs',  label: 'Rust'},
		{value: 'go',  label: 'Go'},
		{value: 'kt',  label: 'Kotlin'},
		{value: 'sw',  label: 'Swift'},
		{value: 'rb',  label: 'Ruby'},
		{value: 'php', label: 'PHP'},
	];

	const source = {
		search: async (q: string) => {
			await new Promise(r => setTimeout(r, 300));
			return ALL.filter(o => !q || o.label.toLowerCase().includes(q.toLowerCase()));
		},
		get: async (values: (string | number)[]) => {
			return ALL.filter(o => values.includes(o.value));
		},
	};

	let value = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs space-y-2">
	<Select options={source} bind:value placeholder="Search a language..."/>
	<p class="text-xs text-muted-contrast">value: <span class="text-canvas-contrast">{value ?? '—'}</span></p>
</div>
