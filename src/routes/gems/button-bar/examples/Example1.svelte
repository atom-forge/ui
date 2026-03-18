<script lang="ts">
	import {Button, ButtonBar} from "$lib";
</script>

<div class="flex flex-col gap-4">
	<ButtonBar class="flex w-full">
		<Button class="flex-1" label="One"/>
		<Button class="flex-1" label="Two"/>
		<Button class="flex-1" label="Three"/>
	</ButtonBar>
	<ButtonBar class="flex w-full">
		<Button compact class="flex-1" label="One"/>
		<Button compact class="flex-1" label="Two"/>
		<Button compact class="flex-1" label="Three"/>
	</ButtonBar>
	<ButtonBar class="flex w-full">
		<Button small class="flex-1" label="One"/>
		<Button small class="flex-1" label="Two"/>
		<Button small class="flex-1" label="Three"/>
	</ButtonBar>
</div>
