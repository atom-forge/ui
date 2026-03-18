<script lang="ts">
	import { Slider, Range } from '$lib';

	let vol: number = $state(60);
	let temp: [number, number] = $state([18, 26]);
</script>

<div class="flex flex-col gap-8 w-full">
	<div class="flex flex-col gap-3">
		<p class="text-xs text-muted-contrast">Slider — boolean</p>
		<Slider bind:value={vol} showValue/>
	</div>
	<div class="flex flex-col gap-3">
		<p class="text-xs text-muted-contrast">Slider — formatter</p>
		<Slider bind:value={vol} showValue={v => v + ' %'}/>
	</div>
	<div class="flex flex-col gap-3">
		<p class="text-xs text-muted-contrast">Range — formatter</p>
		<Range bind:value={temp} min={0} max={40} showValue={v => v + ' °C'}/>
	</div>
</div>
