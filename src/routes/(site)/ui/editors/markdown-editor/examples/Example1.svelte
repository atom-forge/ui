<script lang="ts">
	import { MarkdownEditor } from '@atom-forge/ui';

	let value = $state('');
</script>

<div class="w-full">
	<MarkdownEditor {value} onchange={(next) => value = next} />
</div>
