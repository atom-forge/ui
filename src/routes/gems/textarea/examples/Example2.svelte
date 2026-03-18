<script lang="ts">
	import { Field, Textarea } from '$lib';

	let code = $state('function hello() {\n  console.log("Hello, world!");\n}');
	let dirty = $state(false);
</script>

<div class="flex flex-col gap-2 w-96">
	<Field label="CSS Snippet">
		<Textarea bind:value={code} bind:dirty monospace handleTab tabSize={2} rows={5}/>
	</Field>
	<p class="text-xs text-muted-contrast">
		{#if dirty}
			<span class="text-accent">● Modified</span>
		{:else}
			No changes
		{/if}
	</p>
</div>

