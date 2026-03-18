<script lang="ts">
	import type { Snippet } from 'svelte';
	import {twMerge} from "tailwind-merge";

	let { children, class: classes, ...props } = $props<{
		children: Snippet;
		class?: string;
		[key: string]: any;
	}>();
</script>

<h2 class={twMerge("text-3xl font-semibold mb-4 text-base-900 dark:text-base-100", classes)} {...props}>
	{@render children()}
</h2>
