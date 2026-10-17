<script lang="ts">
	import { Icon, svgIcon } from '@atom-forge/ui';

	const diamond = svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 22 12 12 22 2 12Z"/></svg>')
		.class('text-accent');
	const colored = svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>')
		.color('var(--color-error)');
</script>

<div class="flex items-center gap-4" aria-hidden="true">
	<Icon icon={diamond} pxSize={24}/>
	<Icon icon={colored} pxSize={32}/>
</div>
