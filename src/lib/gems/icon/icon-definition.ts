import type { IconEvents, IconProps, IconSlots } from "lucide-svelte";
import type { SvelteComponent } from "svelte";

export const ICON_STROKE_DEFAULT = 4;
export type IconComponent = typeof SvelteComponent<
  IconProps,
  IconEvents,
  IconSlots
>;

export function defineIcon(
  icon: IconDefinition,
  stroke: number = ICON_STROKE_DEFAULT,
) {
  return new IconDefiner(icon, stroke);
}

export class IconDefiner {
  get component() {
    return this._component;
  }
  get stroke() {
    return this._stroke;
  }
  get classes() {
    return this._classes;
  }

  protected _component: IconComponent;
  protected _stroke: number;
  protected _classes = "";

  constructor(icon: IconDefinition, stroke: number = ICON_STROKE_DEFAULT) {
    if (icon instanceof IconDefiner) {
      this._component = icon.component;
      this._stroke = stroke !== ICON_STROKE_DEFAULT ? stroke : icon.stroke;
      this._classes = icon.classes;
    } else {
      this._component = icon;
      this._stroke = stroke;
    }
  }

  class(classes: string): IconDefiner {
    this._classes = classes;
    return this;
  }

  setStroke(stroke: number): IconDefiner {
    this._stroke = stroke;
    return this;
  }
}

export type IconDefinition = IconDefiner | IconComponent;
