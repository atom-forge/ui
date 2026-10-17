<script lang="ts">
	import { ProseText, ProseTitle } from '@atom-forge/ui';
</script>

<div>
	<ProseTitle>Page Title</ProseTitle>
	<ProseTitle level={2}>Section Heading</ProseTitle>
	<ProseTitle level={3}>Subsection</ProseTitle>
	<ProseText>
		Body text rendered as a paragraph with consistent spacing. Use <strong>bold</strong> or <em>italic</em> inline.
	</ProseText>
	<ProseTitle level={2} subtitle="Optional subtitle below the heading">With Subtitle</ProseTitle>
</div>
