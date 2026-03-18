<script lang="ts">
	import {Button, ButtonBar, ButtonBarItem, Slider, Switch} from "$lib";
	import {Settings} from "lucide-svelte";

	let enabled = $state(true);
	let volume = $state(60);
</script>

<ButtonBar>
	<ButtonBarItem>
		<Switch bind:value={enabled}/>
	</ButtonBarItem>
	<ButtonBarItem>
		<Slider bind:value={volume} class="w-32"/>
	</ButtonBarItem>
	<Button icon={Settings}/>
</ButtonBar>
