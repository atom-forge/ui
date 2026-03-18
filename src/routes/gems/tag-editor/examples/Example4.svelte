<script lang="ts">
	import {Field, TagEditor} from '$lib';

	const techSuggestions = [
		'Svelte', 'TypeScript', 'JavaScript', 'React', 'Vue', 'Angular',
		'TailwindCSS', 'Node.js', 'Vite', 'SvelteKit', 'Rust', 'Go',
		'Python', 'Docker', 'PostgreSQL', 'GraphQL',
	];

	let tagsStatic = $state(['Svelte', 'TypeScript']);

	async function fetchOptions(query: string): Promise<string[]> {
		await new Promise(r => setTimeout(r, 200));
		return techSuggestions.filter(s =>
			s.toLowerCase().includes(query.toLowerCase())
		);
	}

	let tagsAsync = $state<string[]>([]);
	let tagsRestricted = $state<string[]>([]);
</script>

<div class="flex flex-col gap-4 w-96">
	<Field label="Static options">
		<TagEditor bind:value={tagsStatic} options={techSuggestions} placeholder="Type to filter…"/>
	</Field>

	<Field label="Async options (200ms delay)">
		<TagEditor bind:value={tagsAsync} options={fetchOptions} placeholder="Type to search…"/>
	</Field>

	<Field label="Options only — no free input">
		<TagEditor bind:value={tagsRestricted} options={techSuggestions} allowNew={false} placeholder="Pick from list…"/>
	</Field>
</div>
