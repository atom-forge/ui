<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4Raw from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5Raw from './examples/Example5.svelte?raw';

	const titleProps: PropDef[] = [
		{ group: 'Props', name: 'level',    type: '1 | 2 | 3',  default: '1',       description: 'Heading level. 1 → h1 (3xl bold), 2 → h2 (xl semibold), 3 → h3 (base semibold).' },
		{ group: 'Props', name: 'subtitle', type: 'string',                          description: 'Optional muted subtitle rendered below the heading.' },
		{ group: 'Props', name: 'class',    type: 'string',                          description: 'Extra CSS classes forwarded to the wrapper div.' },
	];

	const calloutProps: PropDef[] = [
		{ group: 'Props', name: 'variant', type: "'note' | 'info' | 'warning' | 'success' | 'error' | 'tip'", default: "'note'", description: 'Color scheme and default icon.' },
		{ group: 'Props', name: 'title',   type: 'string',                            description: 'Bold label shown next to the icon.' },
		{ group: 'Props', name: 'content', type: 'string',                            description: 'Body text. Rendered via ProseMarkdown — supports inline Markdown.' },
		{ group: 'Props', name: 'icon',    type: 'string',                            description: 'Override the icon. Accepts a lucide icon name, e.g. <code>Rocket</code>, <code>Shield</code>.' },
	];

	const blockquoteProps: PropDef[] = [
		{ group: 'Props', name: 'quote',  type: 'string', description: 'The quoted text.' },
		{ group: 'Props', name: 'author', type: 'string', description: 'Optional attribution shown below the quote.' },
	];

	const linkCardProps: PropDef[] = [
		{ group: 'Props', name: 'url',         type: 'string', description: 'Link destination. Required — an empty URL renders a No URL provided placeholder.' },
		{ group: 'Props', name: 'title',       type: 'string', description: 'Card heading. Falls back to the domain name.' },
		{ group: 'Props', name: 'description', type: 'string', description: 'Short summary shown below the title.' },
		{ group: 'Props', name: 'favicon',     type: 'string', description: 'Image URL for the icon/thumbnail.' },
	];

	const youtubeProps: PropDef[] = [
		{ group: 'Props', name: 'url',     type: 'string', description: 'Full YouTube watch URL, e.g. <code>https://www.youtube.com/watch?v=…</code>.' },
		{ group: 'Props', name: 'videoId', type: 'string', description: 'Raw video ID, e.g. <code>bsYp9q3QNaQ</code>. Alternative to <code>url</code>.' },
		{ group: 'Props', name: 'title',   type: 'string', description: 'Caption shown below the embed and used as alt text.' },
	];

	const markdownProps: PropDef[] = [
		{ group: 'Props', name: 'content', type: 'string', description: 'Markdown source string. Parsed via <code>marked</code> and rendered with Tailwind Typography prose styles.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Prose Components</ProseTitle>
		<ProseText>
			Reusable typography and content components for building documentation pages, blogs, and rich
			text layouts. All components consume semantic color tokens and adapt to light/dark mode automatically.
		</ProseText>

		<div class="mt-8 space-y-12">

			<div>
				<ProseTitle level={2}>ProseTitle</ProseTitle>
				<ProseText>
					Renders an <DocInlineCode>h1</DocInlineCode>, <DocInlineCode>h2</DocInlineCode>, or
					<DocInlineCode>h3</DocInlineCode> with consistent spacing. Use <DocInlineCode>subtitle</DocInlineCode>
					to add a muted line below the heading.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={titleProps} />
				</DocApiBlock>
				<DocShowExample component={Example1} code={example1Raw} />
			</div>

			<div>
				<ProseTitle level={2}>ProseText</ProseTitle>
				<ProseText>
					A plain paragraph wrapper with consistent bottom margin. Accepts any inline HTML children.
					No additional props beyond <DocInlineCode>class</DocInlineCode> and rest attributes.
				</ProseText>
			</div>

			<div>
				<ProseTitle level={2}>ProseCallout</ProseTitle>
				<ProseText>
					Colored callout box with a left accent border, icon, and optional title.
					The <DocInlineCode>content</DocInlineCode> prop supports inline Markdown.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={calloutProps} />
				</DocApiBlock>
				<DocShowExample component={Example2} code={example2Raw} />
			</div>

			<div>
				<ProseTitle level={2}>ProseBlockQuote</ProseTitle>
				<ProseText>
					A stylized pull-quote with an accent-colored left bar and optional author attribution.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={blockquoteProps} />
				</DocApiBlock>

				<ProseTitle level={2}>ProseLinkCard</ProseTitle>
				<ProseText>
					An external link rendered as a card with favicon, title, description, and domain.
					Clicking opens the URL in a new tab.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={linkCardProps} />
				</DocApiBlock>
				<DocShowExample component={Example3} code={example3Raw} />
			</div>

			<div>
				<ProseTitle level={2}>ProseMarkdown</ProseTitle>
				<ProseText>
					Parses a Markdown string via <DocInlineCode>marked</DocInlineCode> and renders it with
					Tailwind Typography prose styles, adapting to dark mode automatically.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={markdownProps} />
				</DocApiBlock>
				<DocShowExample component={Example4} code={example4Raw} />
			</div>

			<div>
				<ProseTitle level={2}>ProseYoutubeEmbed</ProseTitle>
				<ProseText>
					Lazy YouTube embed — shows a thumbnail until clicked, then loads the iframe.
					Accepts a full watch URL or a bare video ID.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={youtubeProps} />
				</DocApiBlock>
				<DocShowExample component={Example5} code={example5Raw} />
			</div>

		</div>
	</ProseParagraph>
</ProsePage>
