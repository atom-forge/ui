<script lang="ts">
	import { Icon, defineIcon } from "$lib";
	import { Heart } from "lucide-svelte";
</script>

<div class="flex gap-4">
	<!-- Color set in definition -->
	<Icon icon={defineIcon(Heart, 6).class('text-red-500')} />
	<Icon icon={defineIcon(Heart, 6).class('text-blue-500')} />

	<!-- Color set on usage-site -->
	<Icon icon={defineIcon(Heart, 6)} class="text-purple-500" />

	<!-- Override example: definition (red) overrides usage (blue) -->
	<Icon icon={defineIcon(Heart, 6).class('text-red-500')} class="text-blue-500" />

	<!-- Hover effect example -->
	<Icon icon={defineIcon(Heart, 6)} class="text-gray-400 hover:text-red-500 transition-colors" />
</div>
