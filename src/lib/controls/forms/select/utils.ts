import type {ComponentProps} from 'svelte';
import type {Button} from '../../general/button';
import type {SelectButtonTrigger} from './Select.svelte';

type VariantKeys = 'destructive' | 'secondary' | 'ghost' | 'link' | 'muted' | 'accent';
type VariantProps<T extends Partial<Record<VariantKeys, unknown>>> =
	T extends unknown ? Pick<T, VariantKeys> : never;
type ButtonVariantProps = VariantProps<ComponentProps<typeof Button>>;

// Preserve Button's first-truthy precedence while forwarding only one XOR variant.
export function buttonTriggerVariant(button?: SelectButtonTrigger): ButtonVariantProps {
	if (button?.destructive) return {destructive: true};
	if (button?.secondary) return {secondary: true};
	if (button?.ghost) return {ghost: true};
	if (button?.link) return {link: true};
	if (button?.muted) return {muted: true};
	if (button?.accent) return {accent: true};
	return {};
}
