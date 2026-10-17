<script lang="ts">
	import { DiagramEditor, diagramEditor } from '@atom-forge/ui';

	let value = $state(diagramEditor.makeDefaultDiagramData());
</script>

<div class="w-full max-w-2xl">
	<DiagramEditor {value} onchange={(next) => value = next} />
</div>
