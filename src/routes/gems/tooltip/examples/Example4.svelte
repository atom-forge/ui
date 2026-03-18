<script lang="ts">
	import { Tooltip, Button } from "$lib";
</script>

<div class="flex gap-3 items-center flex-wrap">
	<Tooltip label="Instant (delay: 0)" immediate>
		<Button label="Immediate"/>
	</Tooltip>
	<Tooltip label="Default (1000ms)">
		<Button label="Default delay" ghost/>
	</Tooltip>
	<Tooltip label="Custom (300ms)" delay={300}>
		<Button label="300ms" ghost/>
	</Tooltip>
</div>

