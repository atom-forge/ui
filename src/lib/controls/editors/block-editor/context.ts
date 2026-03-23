import { getContext, setContext } from 'svelte';
import type { BlockAPI } from './types.js';

const KEY = Symbol('block-api');

export function setBlockAPI(api: BlockAPI): void {
	setContext(KEY, api);
}

export function getBlockAPI(): BlockAPI {
	return getContext<BlockAPI>(KEY);
}
