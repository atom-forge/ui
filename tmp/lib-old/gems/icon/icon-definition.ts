import type {IconEvents, IconProps, IconSlots} from "lucide-svelte";
import type {SvelteComponent} from "svelte";

export const ICON_STROKE_DEFAULT = 4;
export type IconComponent = typeof SvelteComponent<IconProps, IconEvents, IconSlots>;

export function defineIcon(icon: IconComponent, stroke: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = ICON_STROKE_DEFAULT) {
	return new IconDefiner(icon, stroke);
}

export class IconDefiner {
	get component() {return this._component}
	get stroke() {return this._stroke}
	get classes() {return this._classes}

	protected _component: IconComponent
	protected _stroke: number
	protected _classes = ""

	constructor(icon: IconComponent, stroke: number = ICON_STROKE_DEFAULT) {
		this._component = icon;
		this._stroke = stroke;
	}
	class(classes: string): IconDefinition {
		this._classes = classes;
		return this;
	}
}

export type IconDefinition = IconDefiner | IconComponent
