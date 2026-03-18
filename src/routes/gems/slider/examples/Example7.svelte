<script lang="ts">
	import {Slider} from '$lib';
	let value = $state(5);
</script>

<div class="flex flex-col gap-4 w-full">
	<Slider bind:value={value} min={0} max={10} step={1} drawStops />
	<div class="text-center">Value: {value}</div>
</div>
