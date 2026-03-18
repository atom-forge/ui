<script lang="ts">
	import {Range} from '$lib';

	let value: [number, number] = $state([25, 75]);
</script>

<div class="flex flex-col gap-4 w-full">
	<Range bind:value={value}/>
	<div class="text-center mt-2">Value: [{value[0]}, {value[1]}]</div>
</div>
