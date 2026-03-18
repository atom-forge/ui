<script lang="ts">
	import {Button} from "$lib";
	import {Settings} from "lucide-svelte";
</script>

<div class="flex flex-wrap items-end gap-3">
	<Button label="Normal"/>
	<Button label="Compact" compact/>
	<Button label="Small" small/>
	<Button label="Micro" micro/>
	<Button icon={Settings}/>
	<Button icon={Settings} compact/>
	<Button icon={Settings} small/>
	<Button icon={Settings} micro/>
</div>
