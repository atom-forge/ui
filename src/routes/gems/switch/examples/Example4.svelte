<script lang="ts">
	import {defineIcon, Switch} from "$lib";
	import {Check, X} from "lucide-svelte";
</script>
<div class="flex flex-row gap-4">
	<Switch icons={ {on: defineIcon(Check, 8), off: defineIcon(X, 8)} }/>
	<!-- Icons are not visible in smaller sizes -->
	<Switch icons={ {on: Check, off: X} } compact/>
	<Switch icons={ {on: Check, off: X} } small/>
</div>
