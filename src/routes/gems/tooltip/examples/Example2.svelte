<script lang="ts">
	import { Tooltip, Button } from "$lib";
</script>

<div class="flex gap-3 items-center flex-wrap">
	<Tooltip label="Default tooltip" delay={0}>
		<Button label="Default"/>
	</Tooltip>
	<Tooltip label="Inverted tooltip" inverted delay={0}>
		<Button label="Inverted" ghost/>
	</Tooltip>
</div>

