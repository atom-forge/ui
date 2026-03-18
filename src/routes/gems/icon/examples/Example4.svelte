<script lang="ts">
	import { Icon } from "$lib";
	import { User } from "lucide-svelte";
</script>

<div class="flex gap-4 items-center">
	<!-- `size` is an abstract unit (size * 4px) -->
	<Icon icon={User} size="5" />
	<Icon icon={User} size="8" />

	<!-- `pxSize` sets the size directly in pixels -->
	<Icon icon={User} pxSize="50" />
</div>
