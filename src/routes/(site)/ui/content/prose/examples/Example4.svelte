<script lang="ts">
	import { ProseMarkdown } from '@atom-forge/ui';

	const md = `## Markdown Content

Renders **bold**, _italic_, \`inline code\`, and [links](https://svelte.dev).

- List item one
- List item two
- List item three

> Blockquotes are also supported.

\`\`\`ts
const greeting = (name: string) => \`Hello, \${name}!\`;
\`\`\``;
</script>

<ProseMarkdown content={md} />
