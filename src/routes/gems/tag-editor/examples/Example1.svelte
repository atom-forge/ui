<script lang="ts">
	import {Field, TagEditor} from '$lib';

	let tags = $state(['svelte', 'typescript']);
</script>

<div class="w-96">
	<Field label="Technologies">
		<TagEditor bind:value={tags} placeholder="Add tag…"/>
	</Field>
	<p class="mt-2 text-xs text-muted-contrast">Value: {JSON.stringify(tags)}</p>
</div>
