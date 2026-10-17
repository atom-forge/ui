<script lang="ts">
	import { ProseCallout } from '@atom-forge/ui';
</script>

<div class="space-y-3">
	<ProseCallout variant="info"    title="Info"    content="Informational message for the reader." />
	<ProseCallout variant="warning" title="Warning" content="Something may need your attention here." />
	<ProseCallout variant="success" title="Success" content="The operation completed successfully." />
	<ProseCallout variant="error"   title="Error"   content="Something went wrong. Check your input." />
	<ProseCallout variant="tip"     title="Tip"     content="Here is a helpful tip to improve your workflow." />
	<ProseCallout variant="note"    title="Note"    content="A general note with neutral styling." />
</div>
