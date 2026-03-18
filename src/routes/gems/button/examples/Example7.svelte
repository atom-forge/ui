<script lang="ts">
	import {Button} from "$lib";
	import {Plus, ArrowRight} from "lucide-svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button label="Pill" pill/>
	<Button label="Pill Outline" outline pill/>
	<Button icon={Plus} pill/>
	<Button icon={Plus} outline pill/>
	<Button label="Full width" grow/>
	<Button label="Next" endIcon={ArrowRight} borderless/>
</div>
