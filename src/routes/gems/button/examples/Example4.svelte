<script lang="ts">
	import {Button} from "$lib";
	import {Download, ArrowRight, Trash, Pencil, Plus} from "lucide-svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button icon={Download} label="Download"/>
	<Button label="Next" endIcon={ArrowRight}/>
	<Button icon={Plus}/>
	<Button icon={Pencil} outline/>
	<Button icon={Trash} destructive/>
	<Button icon={Trash} destructive outline/>
	<Button icon={Plus} pill/>
</div>
