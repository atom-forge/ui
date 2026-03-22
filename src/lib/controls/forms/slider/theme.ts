export type SliderSize = 'normal' | 'compact' | 'small';

export const THUMB_SIZES: Record<SliderSize, number> = {
	normal: 1.25, // h-5 = 1.25rem
	compact: 1,   // h-4 = 1rem
	small: 0.75   // h-3 = 0.75rem
};
