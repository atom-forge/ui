<script lang="ts">
	import { Checkbox } from "$lib";
</script>

<div class="flex flex-col gap-2">
	<Checkbox label="Disabled Unchecked" disabled value={false}/>
	<Checkbox label="Disabled Checked" value={true} disabled/>
</div>
