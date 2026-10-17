<script lang="ts">
	import { Slider } from "@atom-forge/ui";

	let sliderValue = $state(50);
</script>

<div class="flex flex-col gap-4 w-full">
	<Slider bind:value={sliderValue}/>
	<span>Selected value: <span class="font-mono">{sliderValue}</span></span>
</div>
