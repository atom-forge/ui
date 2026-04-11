import type { BlockPlugin } from '../../types.ts';
import GalleryBlock from './GalleryBlock.svelte';

interface GalleryMetadata {
	urls: string[];
}

export const galleryPlugin: BlockPlugin<GalleryMetadata> = {
	type: 'gallery',
	parse(raw: string): GalleryMetadata {
		const lines = raw.split('\n').slice(1).filter(l => l.trim() !== '');
		return { urls: lines.map(l => l.trim()) };
	},
	serialize(meta: GalleryMetadata): string {
		return `block:gallery\n${meta.urls.join('\n')}`;
	},
	component: GalleryBlock,
};
