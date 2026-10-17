<script lang="ts">
	import { ColorPicker } from "@atom-forge/ui";

	let color = $state('#ff0000');
</script>

<div class="flex items-center gap-4">
	<ColorPicker bind:value={color}/>
	<span>Selected color: <span class="font-mono">{color}</span></span>
</div>
