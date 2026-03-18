<script lang="ts">
	import { ColorPicker } from "$lib";

	let color = '#ff0000';
</script>

<div class="flex items-center gap-4">
	<ColorPicker bind:value={color}/>
	<span>Selected color: <span class="font-mono">{color}</span></span>
</div>
