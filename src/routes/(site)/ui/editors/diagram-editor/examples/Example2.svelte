<script lang="ts">
	import { DiagramEditor, diagramEditor } from '@atom-forge/ui';
	import type { DiagramEditorTypes } from '@atom-forge/ui';

	let value = $state(diagramEditor.makeDefaultDiagramData());
	let savedAt = $state<string | null>(null);

	function handleChange(v: DiagramEditorTypes.DiagramData) {
		value = v;
		savedAt = new Date().toLocaleTimeString();
	}
</script>

<div class="w-full max-w-2xl space-y-3">
	<DiagramEditor {value} onchange={handleChange} />
	{#if savedAt}
		<p class="text-xs text-muted-contrast">Last saved: {savedAt}</p>
	{/if}
</div>
