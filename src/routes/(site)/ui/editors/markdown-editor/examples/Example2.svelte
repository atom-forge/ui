<script lang="ts">
	import { MarkdownEditor } from '@atom-forge/ui';

	let value = $state(
`# Release Notes

Welcome to **v2.0**! This release brings *major* improvements:

- Faster rendering engine
- New \`dark mode\` support
- Redesigned settings panel

> Breaking change: the old API has been removed. See migration guide.`
	);
</script>

<div class="w-full">
	<MarkdownEditor {value} onchange={(next) => value = next} />
</div>
