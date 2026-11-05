import type {Component} from 'svelte';
import BlockViewHeading from './blocks/BlockViewHeading.svelte';
import BlockViewTextarea from './blocks/BlockViewTextarea.svelte';
import BlockViewMarkdown from './blocks/BlockViewMarkdown.svelte';
import BlockViewQuote from './blocks/BlockViewQuote.svelte';
import BlockViewDivider from './blocks/BlockViewDivider.svelte';
import BlockViewYoutube from './blocks/BlockViewYoutube.svelte';
import TablePreview from '../table-editor/TablePreview.svelte';
import BlockViewDiagram from './blocks/BlockViewDiagram.svelte';
import BlockViewCallout from './blocks/BlockViewCallout.svelte';
import BlockViewCode from './blocks/BlockViewCode.svelte';
import BlockViewLinkCard from './blocks/BlockViewLinkCard.svelte';

// Built-in preview components — consumers can spread and extend for custom block types
export const defaultPreviewComponents: Record<string, Component<any>> = {
	heading: BlockViewHeading,
	text: BlockViewTextarea,
	markdown: BlockViewMarkdown,
	quote: BlockViewQuote,
	divider: BlockViewDivider,
	youtube: BlockViewYoutube,
	table: TablePreview,
	diagram: BlockViewDiagram,
	callout: BlockViewCallout,
	code: BlockViewCode,
	link: BlockViewLinkCard,
};
