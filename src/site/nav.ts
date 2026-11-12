import {
	AppWindow, AreaChart, Bell, Book, Building2, Calendar, CalendarRange, ChartBar, ChartLine,
	ChevronsRight, CircleDot, Clock, Columns2, Component, FileText, FlipHorizontal2, Frown,
	GalleryHorizontal, GripHorizontal, Image, Inbox, Kanban, Keyboard, LayoutTemplate, List,
	ListFilter, Loader, Maximize, Maximize2, MessageSquare, MousePointer, MoveRight, Network,
	PanelLeft, PanelRight, Radio, RectangleHorizontal, ScanLine, Search, SquareCheck, Table,
	Tag, Tags, TextCursorInput, ToggleLeft, UserCircle, Users, Heart, Scale, MonitorSmartphone,
	Settings2, Server, Blocks, Cpu, Settings, Crown, FilePen, Table2, Image as ImageIcon, Palette, ChevronDown,
	Rows4, Menu, Layers, Shield, Box, MonitorCheck, Contact, Mail, Shapes, Binary, Type, AlignLeft,
} from "lucide-svelte";
import type {MenuItem} from "./nav-types";

export type NavItem = {
	value: string;
	label: string;
	group: string;
	icon: any;
	keywords?: string[];
	description?: string;
};

export type NavGroup = {
	key: string;
	label: string;
	items: NavItem[];
	type?: 'group' | 'heading';
};

/**
 * Flat list of all searchable components/pages for the Command Palette
 */
export const NAV_GROUPS: NavGroup[] = [
	{
		key: 'general', label: 'General', items: [
			{value: '/ui/general/button', label: 'Button', group: 'General', icon: MousePointer, description: 'Clickable button component', keywords: ['click', 'action', 'cta']},
			{value: '/ui/general/icon', label: 'Icon', group: 'General', icon: Component, description: 'SVG icon component', keywords: ['svg', 'symbol', 'lucide']},
			{value: '/ui/general/spinner', label: 'Spinner', group: 'General', icon: Loader, description: 'Loading indicator', keywords: ['loading', 'busy']},
						{value: '/ui/general/kbd', label: 'Kbd', group: 'General', icon: Keyboard, description: 'Keyboard shortcut display', keywords: ['keyboard', 'shortcut', 'hotkey']},
			{value: '/ui/general/badge', label: 'Badge', group: 'General', icon: CircleDot, description: 'Small status indicator badge', keywords: ['status', 'indicator', 'dot']},
			{value: '/ui/general/chip', label: 'Chip', group: 'General', icon: Tag, description: 'Compact label / tag chip', keywords: ['tag', 'label', 'badge', 'pill']},
			{value: '/ui/display/card', label: 'Card', group: 'General', icon: RectangleHorizontal, description: 'Content card container', keywords: ['container', 'panel', 'box']},
			{value: '/ui/display/flip-card', label: 'Flip Card', group: 'General', icon: FlipHorizontal2, description: 'Card with flip animation', keywords: ['flip', 'animation', '3d', 'rotate']},
		],
	},
	{
		key: 'forms', label: 'Forms', items: [
			{value: '/ui/forms/input', label: 'Input', group: 'Forms', icon: TextCursorInput, description: 'Text input field', keywords: ['text', 'field', 'type', 'form']},
			{value: '/ui/forms/textarea', label: 'Textarea', group: 'Forms', icon: FileText, description: 'Multi-line text editor', keywords: ['text', 'multiline', 'editor']},
			{value: '/ui/forms/select', label: 'Select', group: 'Forms', icon: List, description: 'Custom searchable select dropdown', keywords: ['select', 'dropdown', 'search', 'combobox']},
			{value: '/ui/forms/checkbox', label: 'Checkbox', group: 'Forms', icon: SquareCheck, description: 'Checkbox with group support', keywords: ['check', 'toggle', 'bool', 'multi']},
			{value: '/ui/forms/radio', label: 'Radio', group: 'Forms', icon: CircleDot, description: 'Radio button group', keywords: ['radio', 'choice', 'select one']},
			{value: '/ui/forms/switch', label: 'Switch', group: 'Forms', icon: ToggleLeft, description: 'Toggle switch', keywords: ['toggle', 'on', 'off', 'bool']},
			{value: '/ui/forms/date-picker', label: 'Date Picker', group: 'Forms', icon: Calendar, description: 'Calendar date picker', keywords: ['date', 'calendar', 'picker', 'day']},
			{value: '/ui/forms/date-time-picker', label: 'Date Time Picker', group: 'Forms', icon: CalendarRange, description: 'Combined date and time input'},
						{value: '/ui/forms/picker-bodies', label: 'Picker Bodies', group: 'Forms', icon: Calendar, description: 'Standalone date and time selection bodies'},
						{value: '/ui/forms/picker-popovers', label: 'Picker Popovers', group: 'Forms', icon: Calendar, description: 'Date and time popovers with custom triggers'},
						{value: '/ui/forms/time-picker', label: 'Time Picker', group: 'Forms', icon: Clock, description: 'Time input with mask', keywords: ['time', 'clock', 'hour', 'minute']},
			{value: '/ui/forms/tag-editor', label: 'Tag Editor', group: 'Forms', icon: Tags, description: 'Multi-tag input', keywords: ['tag', 'tags', 'chip', 'multi', 'input']},
			{value: '/ui/forms/multi-select', label: 'Multi Select', group: 'Forms', icon: ListFilter, description: 'Select multiple items from a list', keywords: ['multi', 'select', 'multiselect', 'tags']},
			{value: '/ui/forms/code-input', label: 'Code Input', group: 'Forms', icon: Search, description: 'Segmented input for OTPs and codes', keywords: ['otp', 'code', 'pin', 'license']},
			{value: '/ui/forms/progress-bar', label: 'Progress Bar', group: 'Forms', icon: Loader, description: 'Progress and loading bar', keywords: ['progress', 'loading', 'bar', 'percent']},
			{value: '/ui/forms/color', label: 'Color', group: 'Forms', icon: Palette, description: 'Color picker input', keywords: ['color', 'picker', 'hex', 'rgb']},
			{value: '/ui/forms/native-select', label: 'Native Select', group: 'Forms', icon: ChevronDown, description: 'Native HTML select element', keywords: ['select', 'dropdown', 'option', 'native']},
			{value: '/ui/forms/slider', label: 'Slider', group: 'Forms', icon: MoveRight, description: 'Range slider input', keywords: ['range', 'slide', 'number', 'min', 'max']},
			{value: '/ui/forms/field', label: 'Field', group: 'Forms', icon: Rows4, description: 'Form field wrapper with label', keywords: ['label', 'form', 'wrapper']},
		],
	},
	{
		key: 'display', label: 'Display', items: [
			{value: '/ui/display/avatar', label: 'Avatar', group: 'Display', icon: UserCircle, description: 'User avatar with image or initials', keywords: ['user', 'profile', 'photo']},
			{value: '/ui/display/avatar-group', label: 'Avatar Group', group: 'Display', icon: Users, description: 'Stacked group of avatars', keywords: ['users', 'team', 'stack']},
			{value: '/ui/display/skeleton', label: 'Skeleton', group: 'Display', icon: Loader, description: 'Shimmer placeholder for loading', keywords: ['skeleton', 'loading', 'shimmer']},
			{value: '/ui/display/empty-state', label: 'Empty State', group: 'Display', icon: Frown, description: 'Placeholder for empty areas', keywords: ['empty', 'placeholder', 'no data']},
			{value: '/ui/display/carousel', label: 'Carousel', group: 'Display', icon: GalleryHorizontal, description: 'Horizontally scrollable slides', keywords: ['carousel', 'slider', 'slides', 'swipe']},
		],
	},
	{
		key: 'layout', label: 'Layout', items: [
			{value: '/ui/layout/accordion', label: 'Accordion', group: 'Layout', icon: ScanLine, description: 'Collapsible accordion sections', keywords: ['collapse', 'expand', 'toggle']},
			{value: '/ui/layout/tabs', label: 'Tabs', group: 'Layout', icon: RectangleHorizontal, description: 'Tabbed content panels', keywords: ['tab', 'panel', 'navigation']},
			{value: '/ui/layout/splitter', label: 'Splitter', group: 'Layout', icon: Columns2, description: 'Resizable split panel layout', keywords: ['split', 'resize', 'panel', 'divider']},
			{value: '/ui/layout/tree', label: 'Tree', group: 'Layout', icon: Network, description: 'Hierarchical tree view', keywords: ['tree', 'hierarchy', 'nested', 'folder']},
			{value: '/ui/layout/breadcrumb', label: 'Breadcrumb', group: 'Layout', icon: ChevronsRight, description: 'Navigation breadcrumb trail', keywords: ['navigation', 'path', 'trail']},
			{value: '/ui/layout/pagination', label: 'Pagination', group: 'Layout', icon: List, description: 'Page navigation controls', keywords: ['pages', 'pager', 'next', 'prev']},
			{value: '/ui/layout/pagination-slider', label: 'Pagination Slider', group: 'Layout', icon: List, description: 'Slider-based page navigation', keywords: ['pages', 'slider', 'pager']},
			{value: '/ui/layout/stepper', label: 'Stepper', group: 'Layout', icon: ChevronsRight, description: 'Multi-step progress indicator', keywords: ['stepper', 'wizard', 'steps', 'progress']},
		{value: '/ui/layout/button-bar', label: 'Button Bar', group: 'Layout', icon: GripHorizontal, description: 'Horizontal group of buttons', keywords: ['toolbar', 'group', 'actions']},
		],
	},
	{
		key: 'overlays', label: 'Overlays', items: [
			{value: '/ui/overlays/containers', label: 'Containers & Lifecycle', group: 'Overlays', icon: Layers, description: 'Overlay containers, stack and lifecycle'},
						{value: '/ui/overlays/modal', label: 'Modal', group: 'Overlays', icon: AppWindow, description: 'Modal dialog overlay', keywords: ['modal', 'dialog', 'overlay']},
			{value: '/ui/overlays/drawer', label: 'Drawer', group: 'Overlays', icon: PanelRight, description: 'Slide-in side drawer panel', keywords: ['drawer', 'sidebar', 'panel', 'slide']},
			{value: '/ui/overlays/popup', label: 'Popup', group: 'Overlays', icon: Maximize2, description: 'Anchored floating popup', keywords: ['popup', 'floating', 'anchor']},
			{value: '/ui/overlays/toast', label: 'Toast', group: 'Overlays', icon: Bell, description: 'Toast notification messages', keywords: ['toast', 'notification', 'alert']},
			{value: '/ui/overlays/tooltip', label: 'Tooltip', group: 'Overlays', icon: MessageSquare, description: 'Hover tooltip', keywords: ['tooltip', 'hint', 'hover', 'info']},
			{value: '/ui/overlays/zen', label: 'Zen', group: 'Overlays', icon: Maximize, description: 'Fullscreen zen / focus mode', keywords: ['zen', 'fullscreen', 'focus']},
			{value: '/ui/overlays/command', label: 'Command Palette', group: 'Overlays', icon: Search, description: 'Keyboard-driven command palette', keywords: ['command', 'palette', 'search', 'shortcut']},
			{value: '/ui/overlays/context-menu', label: 'Context Menu', group: 'Overlays', icon: Menu, description: 'Right-click context menu', keywords: ['context', 'right click', 'menu']},
		],
	},
	{
		key: 'data', label: 'Data', items: [
			{value: '/ui/data/table', label: 'Table', group: 'Data', icon: Table, description: 'Data table with sorting', keywords: ['data', 'grid', 'rows', 'columns', 'sort']},
			{value: '/ui/data/table-settings', label: 'Table Settings', group: 'Data', icon: Settings2, description: 'Column visibility and table preferences'},
						{value: '/ui/data/timeline', label: 'Timeline', group: 'Data', icon: MoveRight, description: 'Vertical and horizontal timeline', keywords: ['timeline', 'events', 'history', 'steps']},
			{value: '/ui/data/dnd', label: 'Drag & Drop', group: 'Data', icon: Kanban, description: 'Sortable lists and Kanban boards', keywords: ['drag', 'drop', 'sort', 'kanban', 'reorder']},
			{value: '/ui/data/bar-chart', label: 'Bar Chart', group: 'Data', icon: ChartBar, description: 'Animated bar chart', keywords: ['chart', 'bar', 'graph', 'data']},
			{value: '/ui/data/heatmap', label: 'Heatmap', group: 'Data', icon: AreaChart, description: 'Color-coded 2D data grid', keywords: ['heatmap', 'heat', 'grid', 'matrix']},
			{value: '/ui/data/meter-group', label: 'Meter Group', group: 'Data', icon: ChartBar, description: 'Segmented proportional bar', keywords: ['meter', 'segment', 'proportion']},
			{value: '/ui/data/progress-ring', label: 'Progress Ring', group: 'Data', icon: CircleDot, description: 'Circular progress indicator', keywords: ['ring', 'circle', 'progress', 'donut']},
			{value: '/ui/data/charts/bar',     label: 'Bar Chart (CJS)',  group: 'Data · Charts', icon: ChartBar,  description: 'Chart.js bar chart',          keywords: ['chart', 'bar', 'chartjs']},
		{value: '/ui/data/charts/line',    label: 'Line Chart',       group: 'Data · Charts', icon: ChartLine, description: 'Chart.js line chart',         keywords: ['chart', 'line', 'area', 'chartjs']},
		{value: '/ui/data/charts/pie',     label: 'Pie & Doughnut',   group: 'Data · Charts', icon: CircleDot, description: 'Pie and doughnut charts',     keywords: ['chart', 'pie', 'doughnut', 'chartjs']},
		{value: '/ui/data/charts/radar',   label: 'Radar Chart',      group: 'Data · Charts', icon: Radio,     description: 'Chart.js radar chart',        keywords: ['chart', 'radar', 'spider', 'chartjs']},
		{value: '/ui/data/charts/scatter', label: 'Scatter & Bubble', group: 'Data · Charts', icon: ChartLine, description: 'Scatter and bubble charts',   keywords: ['chart', 'scatter', 'bubble', 'chartjs']},
		],
	},
];

/**
 * Full sidebar structure including non-searchable groups and hierarchy
 */
export const SIDEBAR_STRUCTURE: MenuItem[] = [
	{label: "Overview", icon: Book, href: "/"},
	{type: "heading", label: "Components"},
	...NAV_GROUPS.filter(g => g.key !== 'data').map(group => ({
		label: group.label,
		icon: group.items[0]?.icon || Box,
		children: group.items.map(item => ({
			label: item.label,
			icon: item.icon,
			href: item.value
		}))
	})),
	{
		label: 'Data',
		icon: Table,
		children: [
			{label: 'Table',         icon: Table,     href: '/ui/data/table'},
						{label: 'Table Settings', icon: Settings2, href: '/ui/data/table-settings'},
			{label: 'Timeline',      icon: MoveRight, href: '/ui/data/timeline'},
			{label: 'Drag & Drop',   icon: Kanban,    href: '/ui/data/dnd'},
			{label: 'Bar Chart',     icon: ChartBar,  href: '/ui/data/bar-chart'},
			{label: 'Heatmap',       icon: AreaChart, href: '/ui/data/heatmap'},
			{label: 'Meter Group',   icon: ChartBar,  href: '/ui/data/meter-group'},
			{label: 'Progress Ring', icon: CircleDot, href: '/ui/data/progress-ring'},
		],
	},
	{
		label: 'Charts (CJS)',
		icon: ChartLine,
		children: [
			{label: 'Base & Configuration', icon: Settings2, href: '/ui/data/charts/base'},
						{label: 'Bar',             icon: ChartBar,  href: '/ui/data/charts/bar'},
			{label: 'Line',            icon: ChartLine, href: '/ui/data/charts/line'},
			{label: 'Pie & Doughnut',  icon: CircleDot, href: '/ui/data/charts/pie'},
			{label: 'Radar',           icon: Radio,     href: '/ui/data/charts/radar'},
			{label: 'Scatter & Bubble',icon: ChartLine, href: '/ui/data/charts/scatter'},
		],
	},
	{type: "heading", label: "Advanced"},
	{
		label: "Content",
		icon: AlignLeft,
		children: [
			{label: 'Doc Components',   icon: Binary,    href: "/ui/content/doc"},
			{label: 'Prose Components', icon: Type,      href: "/ui/content/prose"},
						{label: 'Advanced Command Palette', icon: Search, href: '/ui/overlays/command-palette'},
		],
	},
	{
		label: "Scheduling",
		icon: CalendarRange,
		children: [
			{label: 'Calendar',         icon: CalendarRange,  href: "/ui/scheduling/calendar"},
			{label: 'Organizer',        icon: LayoutTemplate, href: "/ui/scheduling/organizer"},
		],
	},

	{type: "separator"},
	{
		label: "Showcase",
		icon: MonitorCheck,
		children: [
			{label: "CRM", icon: Contact, href: "/showcase/crm"},
			{label: "Inbox", icon: Mail, href: "/showcase/inbox"},
			{label: "Intranet", icon: Building2, href: "/showcase/intranet"},
		],
	},
];

export const ALL_GEMS: NavItem[] = [
	...NAV_GROUPS.flatMap(g => g.items),

		{value: '/ui/data/charts/base', label: 'Charts Base & Configuration', group: 'Data · Charts', icon: Settings2},
		{value: '/ui/overlays/command-palette', label: 'Advanced Command Palette', group: 'Advanced · Content', icon: Search},
		// Add Advanced components to searchable items too
	{value: '/ui/content/doc',    label: 'Doc Components',   group: 'Advanced · Content',    icon: Binary},
	{value: '/ui/content/prose',  label: 'Prose Components', group: 'Advanced · Content',    icon: Type},
	{value: '/ui/scheduling/calendar',       icon: CalendarRange,   label: 'Calendar',         group: 'Advanced · Scheduling'},
	{value: '/ui/scheduling/organizer',      icon: LayoutTemplate,  label: 'Organizer',        group: 'Advanced · Scheduling'},
];
