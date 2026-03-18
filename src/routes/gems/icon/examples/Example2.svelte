<script lang="ts">
	import { Icon, defineIcon } from "$lib";
	import { Sliders, User } from "lucide-svelte";
</script>

<div class="flex gap-4 items-center">
	<!-- Case 1: Stroke set in definition via defineIcon() -->
	<Icon icon={defineIcon(Sliders, 2)} />
	<Icon icon={defineIcon(Sliders, 8)} />

	<!-- Case 2: Stroke set on usage-site (only for direct components) -->
	<Icon icon={User} stroke="2" />
	<Icon icon={User} stroke="10" />
</div>
