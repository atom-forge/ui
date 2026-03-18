<script lang="ts">
	import {Field, TagEditor} from '$lib';

	let tags = $state(['Svelte', 'TypeScript', 'TailwindCSS', 'Vite', 'SvelteKit']);
</script>

<div class="w-96">
	<Field label="Drag to reorder">
		<TagEditor bind:value={tags} sortable placeholder="Add tag…"/>
	</Field>
	<p class="mt-2 text-xs text-muted-contrast">Order: {JSON.stringify(tags)}</p>
</div>
