import type {IconDefinition} from "../../general/icon";
import type {PopupManager} from "../popup";


type Separator = { separator: true };
type Item = {
	icon?: IconDefinition;
	label: string;
	centered?: boolean;
	warning?: boolean;
	disabled?: boolean;
	chevron?: boolean;
}
type ResolverItem = Item & { resolveWith: any }
type OnclickItem = Item & { onclick: (event: MouseEvent, manager: PopupManager) => void }
type SubmenuItem = Item & { submenu: ContextMenuItemConfig[] }

export type ContextMenuItemConfig =
	| Separator
	| ResolverItem
	| OnclickItem
	| SubmenuItem;

export type ContextMenuItemConfigAny =
	& Separator
	& ResolverItem
	& OnclickItem
	& SubmenuItem;
