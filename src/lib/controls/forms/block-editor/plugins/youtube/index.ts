import type { BlockPlugin } from '../../types.ts';
import YoutubeBlock from './YoutubeBlock.svelte';

interface YoutubeMetadata {
	url: string;
}

export const youtubePlugin: BlockPlugin<YoutubeMetadata> = {
	type: 'youtube',
	parse(raw: string): YoutubeMetadata {
		const lines = raw.split('\n');
		return { url: lines[1]?.trim() ?? '' };
	},
	serialize(meta: YoutubeMetadata): string {
		return `block:youtube\n${meta.url}`;
	},
	component: YoutubeBlock,
};
