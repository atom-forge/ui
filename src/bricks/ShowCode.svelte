<script module lang="ts">
	export type CodeFile = { name: string; code: string };
</script>

<script lang="ts">
	import Highlight from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import {twMerge} from "tailwind-merge";
	import {Tab, TabList, TabPanel, Tabs} from "$lib";

	let {code, file, class: classes, displayCode = (c: string) => c}: {
		code: string | CodeFile[];
		file?: string;
		class?: string;
		displayCode?: (code: string) => string;
	} = $props();

	const isMultiFile = $derived(Array.isArray(code) && (code as CodeFile[]).length > 1);
	const files = $derived(Array.isArray(code) ? code as CodeFile[] : [{name: file ?? '', code: code as string}]);
</script>

<div class={twMerge("rounded-lg overflow-hidden border border-frame", classes)}>
	{#if isMultiFile}
		<Tabs initialTabId={files[0].name}>
			<TabList class="bg-secondary px-2">
				{#each files as f}
					<Tab id={f.name}>{f.name}</Tab>
				{/each}
			</TabList>
			{#each files as f}
				<TabPanel id={f.name}>
					<Highlight language={typescript} code={displayCode(f.code)}/>
				</TabPanel>
			{/each}
		</Tabs>
	{:else}
		{#if file}
			<div class="bg-secondary text-muted-contrast px-4 py-2 font-mono text-sm border-b border-frame">
				{file}
			</div>
		{/if}
		<Highlight language={typescript} code={displayCode(files[0].code)}/>
	{/if}
</div>
