<script lang="ts">
	import { Checkbox } from "$lib";
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-center gap-4">
		<Checkbox label="Normal" value={true}/>
		<Checkbox compact label="Compact" value={true}/>
		<Checkbox small label="Small" value={true}/>
	</div>
	<div class="flex flex-wrap items-center gap-4">
		<Checkbox label="Normal" value={false}/>
		<Checkbox compact label="Compact" value={false}/>
		<Checkbox small label="Small" value={false}/>
	</div>
</div>
