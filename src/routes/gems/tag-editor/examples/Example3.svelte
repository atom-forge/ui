<script lang="ts">
	import {Field, TagEditor} from '$lib';

	let tags = $state(['react', 'vue']);
	let tagsUpper = $state<string[]>([]);
	let tagsLower = $state<string[]>([]);
</script>

<div class="flex flex-col gap-4 w-96">
	<Field label="Disabled">
		<TagEditor value={['locked', 'tag']} disabled/>
	</Field>
	<Field label="Clearable">
		<TagEditor bind:value={tags} clearable placeholder="Add tag…"/>
	</Field>
	<Field label="Uppercase — type in any case">
		<TagEditor bind:value={tagsUpper} uppercase placeholder="hello → HELLO"/>
		<p class="mt-1 text-xs text-muted-contrast">Value: {JSON.stringify(tagsUpper)}</p>
	</Field>
	<Field label="Lowercase — type in any case">
		<TagEditor bind:value={tagsLower} lowercase placeholder="HELLO → hello"/>
		<p class="mt-1 text-xs text-muted-contrast">Value: {JSON.stringify(tagsLower)}</p>
	</Field>
</div>
