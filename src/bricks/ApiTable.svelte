<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let { class: className } = $props<{
		class?: string;
	}>();
</script>

<div class={twMerge('overflow-x-auto', className)}>
	<table class="table-auto w-full text-sm border-collapse">
		<slot />
	</table>
</div>
