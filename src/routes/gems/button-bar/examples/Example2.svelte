<script lang="ts">
	import {Button, ButtonBar, Input} from "$lib";
	import {Search} from "lucide-svelte";

	let query = $state('');
</script>

<div class="flex flex-col gap-4">
	<ButtonBar>
		<Input bind:value={query} placeholder="Search..." class="min-w-48"/>
		<Button label="Search" icon={Search}/>
	</ButtonBar>
	<ButtonBar class="flex w-full">
		<Input compact bind:value={query} placeholder="Search..." class="flex-1"/>
		<Button compact label="Search" icon={Search}/>
	</ButtonBar>
	<ButtonBar class="flex w-full">
		<Input bind:value={query} placeholder="Search..." class="flex-1"/>
		<Button label="Search" icon={Search}/>
	</ButtonBar>
</div>
