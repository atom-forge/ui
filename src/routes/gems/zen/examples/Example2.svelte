<script lang="ts">
	import { Zen, Field, Textarea, Button, ButtonBar } from '$lib';
	import type { TextareaAPI } from '$lib';
	import { Bold, Italic, Code, Maximize } from 'lucide-svelte';

	let code = $state('# Hello World\n\nThis is a **markdown** editor.\n\nStart typing...');
	let zenActive = $state(false);
	let api: TextareaAPI;
</script>

<div class="flex flex-col gap-2 w-96">
	<Field label="Markdown">
		<Textarea bind:value={code} bind:this={api} rows={5} handleTab showCounter {toolbar}/>
	</Field>
	<div class="flex justify-end">
		<Button compact ghost icon={Maximize} label="Zen mode" onclick={() => zenActive = true}/>
	</div>
</div>

<Zen bind:active={zenActive}>
	<Textarea bind:value={code} bind:this={api} rows={10} handleTab showCounter {toolbar} class="flex-1"/>
</Zen>

{#snippet toolbar()}
	<ButtonBar>
		<Button compact ghost icon={Bold}   onclick={() => api.wrapSelection('**', true)}/>
		<Button compact ghost icon={Italic} onclick={() => api.wrapSelection('*', true)}/>
		<Button compact ghost icon={Code}   onclick={() => api.wrapSelection('`', true)}/>
	</ButtonBar>
{/snippet}
