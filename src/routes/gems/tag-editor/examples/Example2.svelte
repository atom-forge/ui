<script lang="ts">
	import {Field, TagEditor} from '$lib';

	let tagsNormal  = $state(['design', 'ui']);
	let tagsCompact = $state(['design', 'ui']);
	let tagsSmall   = $state(['design', 'ui']);
</script>

<div class="flex flex-col gap-4 w-96">
	<Field label="Normal">
		<TagEditor bind:value={tagsNormal} placeholder="Add tag…"/>
	</Field>
	<Field label="Compact">
		<TagEditor bind:value={tagsCompact} compact placeholder="Add tag…"/>
	</Field>
	<Field label="Small">
		<TagEditor bind:value={tagsSmall} small placeholder="Add tag…"/>
	</Field>
</div>
