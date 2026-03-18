<script lang="ts">
	import { Checkbox } from "$lib";
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-center gap-4">
		<Checkbox label="Default checked" value={true}/>
		<Checkbox primary label="Primary checked" value={true}/>
		<Checkbox accent label="Accent checked" value={true}/>
	</div>
	<div class="flex flex-wrap items-center gap-4">
		<Checkbox label="Default unchecked" value={false}/>
		<Checkbox primary label="Primary unchecked" value={false}/>
		<Checkbox accent label="Accent unchecked" value={false}/>
	</div>
</div>
