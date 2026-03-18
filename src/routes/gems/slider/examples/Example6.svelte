<script lang="ts">
	import {Range} from '$lib';
	let value: [number, number] = $state([40, 60]);
</script>

<div class="flex flex-col gap-4 w-full">
	<Range bind:value distance={{ min: 10, max: 30 }} />
	<div class="text-center mt-2">Value: [{value[0]}, {value[1]}]</div>
</div>
