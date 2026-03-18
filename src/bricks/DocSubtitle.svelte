<script lang="ts">
	import type { Snippet } from 'svelte';
	import {twMerge} from "tailwind-merge";

	let { children, class: classes, ...props } = $props<{
		children: Snippet;
		class?: string;
		[key: string]: any;
	}>();
</script>

<h3 class={twMerge("text-xl font-semibold mt-8 mb-4 text-base-900 dark:text-base-100", classes)} {...props}>
	{@render children()}
</h3>
