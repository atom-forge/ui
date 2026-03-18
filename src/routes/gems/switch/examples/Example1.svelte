<script lang="ts">
	import { Switch } from "$lib";

	let switchValue = false;
</script>

<div class="flex items-center gap-4">
	<Switch bind:value={switchValue}/>
	<span>Value: <span class="font-mono">{switchValue}</span></span>
</div>
