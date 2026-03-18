<script lang="ts">
	import { Tooltip, Button } from "$lib";
</script>

<div class="flex gap-3 items-center flex-wrap">
	<Tooltip label="Follows the cursor" immediate>
		<Button label="Default (follows cursor)"/>
	</Tooltip>
	<Tooltip label="Anchored to button" fixed immediate>
		<Button label="Fixed (anchored)" ghost/>
	</Tooltip>
</div>

