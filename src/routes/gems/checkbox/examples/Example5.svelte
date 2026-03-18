<script lang="ts">
	import { Checkbox, CheckboxGroupManager } from "$lib";
</script>

<CheckboxGroupManager>
	<div class="flex flex-col gap-2">
		<Checkbox group="group1" label="Select All" master/>
		<hr>
		<Checkbox group="group1" label="Option 1" value={false}/>
		<Checkbox group="group1" label="Option 2" value={true}/>
		<Checkbox group="group1" label="Option 3" value={true}/>
	</div>
</CheckboxGroupManager>
