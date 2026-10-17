<script lang="ts">
	import { ImgEditor, imgEditor, type ImgEditorTypes } from '@atom-forge/ui';

	let data = $state<ImgEditorTypes.ImgEditorData>(imgEditor.makeDefaultImgEditorData('https://picsum.photos/seed/portrait/1080/1440'));
</script>

<div class="space-y-3">
	<ImgEditor
		src={data.src}
		value={data}
		onchange={(v) => data = v}
	/>

	<details class="text-xs">
		<summary class="text-muted-contrast cursor-pointer select-none">ImgEditorData output</summary>
		<pre class="mt-2 p-3 bg-surface rounded-lg border border-frame overflow-auto text-canvas-contrast">{JSON.stringify(data, null, 2)}</pre>
	</details>
</div>
