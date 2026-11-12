<script lang="ts">
	import {twMerge} from 'tailwind-merge';
	import type {ChildrenProp, ClassProp} from '@atom-forge/svelte-helpers';

	let {
		children,
		class: classes,
	}: ChildrenProp & ClassProp = $props();
</script>

<!-- Spans both grid columns inside a FieldGroup -->
<div class={twMerge('col-span-2', classes)}>
	{@render children()}
</div>

