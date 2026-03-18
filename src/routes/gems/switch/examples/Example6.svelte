<script lang="ts">
	import {Switch} from "$lib";
	import {Sun} from "lucide-svelte";
</script>
<div class="flex flex-row gap-4">
	<Switch disabled/>
	<Switch value={true} disabled/>
	<Switch icons={{on: Sun, off: Sun}} value={false} disabled/>
	<Switch icons={{on: Sun, off: Sun}} value={true} disabled label="Disabled"/>
	<Switch icons={{on: Sun, off: Sun}} value={false} disabled compact label="Disabled"/>
	<Switch icons={{on: Sun, off: Sun}} value={false} disabled small label="Disabled"/>
</div>
