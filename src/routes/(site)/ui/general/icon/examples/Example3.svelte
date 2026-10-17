<script lang="ts">
	import { Icon, defineIcon } from "@atom-forge/ui";
	import { Heart } from "lucide-svelte";
</script>

<div class="flex gap-4">
	<!-- Color set in definition -->
	<Icon icon={defineIcon(Heart, 6).class('text-error')} />
	<Icon icon={defineIcon(Heart, 6).class('text-accent')} />

	<!-- Color set on usage-site -->
	<Icon icon={defineIcon(Heart, 6)} class="text-primary" />

	<!-- Definition error color overrides usage-site accent color -->
	<Icon icon={defineIcon(Heart, 6).class('text-error')} class="text-accent" />

	<!-- Hover effect example -->
	<Icon icon={defineIcon(Heart, 6)} class="text-muted-contrast hover:text-error transition-colors" />
</div>
