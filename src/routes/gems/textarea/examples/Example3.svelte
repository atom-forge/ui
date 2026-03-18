<script lang="ts">
	import {Field, Textarea, Button, ButtonBar, defineIcon} from '$lib';
	import type {TextareaAPI} from '$lib';
	import {Bold, Italic, Code} from 'lucide-svelte';

	let text = $state('Hello **world**!');
	let api: TextareaAPI;
</script>

<div class="w-96 flex flex-col gap-1">
	<div class="flex items-center gap-1 px-1">
		<ButtonBar class="bg-secondary">
			<Button small outline icon={defineIcon(Bold, 9)} class="px-4" onclick={() => api.wrapSelection('**', true)}/>
			<Button small outline icon={defineIcon(Italic, 9)} class="px-4" onclick={() => api.wrapSelection('*', true)}/>
			<Button small outline icon={defineIcon(Code, 9)} class="px-4" onclick={() => api.wrapSelection('`', true)}/>
		</ButtonBar>
		<span class="ml-auto text-[10px] text-muted-contrast/60 select-none">Markdown</span>
	</div>
	<Field label="Article">
		<Textarea bind:value={text} bind:this={api} rows={5} showCounter/>
	</Field>
</div>
