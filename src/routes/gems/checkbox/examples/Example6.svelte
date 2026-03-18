<script lang="ts">
	import { createCheckboxGroupManager, Checkbox } from "$lib";

	createCheckboxGroupManager();
</script>

<div class="flex flex-col gap-2">
	<Checkbox group="group1" label="Select All" master/>
	<hr>
	<Checkbox group="group1" label="Option 1" value={false}/>
	<Checkbox group="group1" label="Option 2" value={true}/>
	<Checkbox group="group1" label="Option 3" value={true}/>
</div>
