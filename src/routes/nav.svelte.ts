import {
	BadgeDollarSign, AlignJustify, Maximize, Bell, Book,
	Building2, Calendar, RectangleHorizontal, LayoutGrid,
	GalleryHorizontal, BarChart, ScatterChart, AreaChart, LineChart, PieChart,
	CheckSquare, CircleDot, Clock, Columns,
	Palette, Component, FileText, Network, Inbox,
	Keyboard, LayoutDashboard, Kanban,
	Rows, PanelRight, ScanLine, List,
	Menu, Frown, File, Circle, Loader,
	Repeat, Search, ChevronDownSquare, Settings, ChevronsRight, MoveRight, ToggleRight,
	Tag, MessageSquare, UserCircle, Users, AppWindow,
	Maximize2, Tags, List as IconLayoutList,
} from 'lucide-svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavItem = { value: string; label: string; group: string; icon: any; keywords?: string[]; description?: string };
export type NavGroup = { key: string; label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
	{
		key: 'showcase', label: 'Showcase', items: [
			{ value: '/showcase/crm', label: 'CRM', group: 'Showcase', icon: Users, description: 'Contacts, deals, pipeline and activity feed' },
			{ value: '/showcase/inbox', label: 'Inbox', group: 'Showcase', icon: Inbox, description: 'Message inbox showcase' },
			{ value: '/showcase/intranet', label: 'Intranet', group: 'Showcase', icon: Building2, description: 'Intranet portal showcase' },
			{ value: '/calendar', label: 'Calendar', group: 'Showcase', icon: Calendar, description: 'Interactive month calendar with drag-and-drop events' },
			// { value: '/showcase/dashboard', label: 'Dashboard', group: 'Showcase', icon: LayoutDashboard, description: 'Overview dashboard with charts and stats' },
			// { value: '/showcase/kanban', label: 'Kanban', group: 'Showcase', icon: Kanban, description: 'Kanban board showcase' },
			// { value: '/showcase/settings', label: 'Settings', group: 'Showcase', icon: Settings, description: 'Settings page showcase' },
		]
	},
	{
		key: 'guides', label: 'Guides', items: [
			{ value: '/guides/getting-started', label: 'Getting Started', group: 'Guides', icon: Book, description: 'Installation and first steps', keywords: ['install', 'setup', 'start', 'intro'] },
			{ value: '/guides/theming', label: 'Theming', group: 'Guides', icon: Book, description: 'Customize colors and styles', keywords: ['theme', 'colors', 'css', 'dark', 'light'] },
			{ value: '/guides/color-system', label: 'Color System', group: 'Guides', icon: Book, description: 'Design token color system', keywords: ['palette', 'tokens', 'design', 'colors'] },
		]
	},
	{
		key: 'general', label: 'General', items: [
			{ value: '/gems/button', label: 'Button', group: 'General', icon: BadgeDollarSign, description: 'Clickable button component', keywords: ['click', 'action', 'cta'] },
			{ value: '/gems/card', label: 'Card', group: 'General', icon: LayoutGrid, description: 'Content card container', keywords: ['container', 'panel', 'box'] },
			{ value: '/gems/flip-card', label: 'Flip Card', group: 'General', icon: Repeat, description: 'Card with flip animation', keywords: ['flip', 'animation', '3d', 'rotate'] },
			{ value: '/gems/icon', label: 'Icon', group: 'General', icon: Component, description: 'SVG icon component', keywords: ['svg', 'symbol', 'lucide'] },
			{ value: '/gems/chip', label: 'Chip', group: 'General', icon: Tag, description: 'Compact label / tag chip', keywords: ['tag', 'label', 'badge', 'pill'] },
		]
	},
	{
		key: 'display', label: 'Display', items: [
			{ value: '/gems/badge', label: 'Badge', group: 'Display', icon: CircleDot, description: 'Small status indicator badge', keywords: ['status', 'indicator', 'dot', 'notification'] },
			{ value: '/gems/avatar', label: 'Avatar', group: 'Display', icon: UserCircle, description: 'User avatar with image or initials', keywords: ['user', 'profile', 'photo', 'initials'] },
			{ value: '/gems/avatar-group', label: 'Avatar Group', group: 'Display', icon: Users, description: 'Stacked group of avatars', keywords: ['users', 'team', 'stack', 'overlap'] },
			{ value: '/gems/empty-state', label: 'Empty State', group: 'Display', icon: Frown, description: 'Placeholder for empty content areas', keywords: ['empty', 'placeholder', 'no data', 'blank'] },
			{ value: '/gems/kbd', label: 'Kbd', group: 'Display', icon: Keyboard, description: 'Keyboard shortcut display', keywords: ['keyboard', 'shortcut', 'hotkey', 'key'] },
			{ value: '/gems/breadcrumb', label: 'Breadcrumb', group: 'Display', icon: ChevronsRight, description: 'Navigation breadcrumb trail', keywords: ['navigation', 'path', 'trail', 'nav'] },
			{ value: '/gems/pagination', label: 'Pagination', group: 'Display', icon: File, description: 'Page navigation controls', keywords: ['pages', 'pager', 'next', 'prev'] },
			{ value: '/gems/pagination-slider', label: 'Pagination Slider', group: 'Display', icon: File, description: 'Slider-based page navigation', keywords: ['pages', 'slider', 'pager'] },
			{ value: '/gems/skeleton', label: 'Skeleton', group: 'Display', icon: Loader, description: 'Shimmer placeholder for loading states', keywords: ['skeleton', 'loading', 'placeholder', 'shimmer'] },
		{ value: '/gems/carousel', label: 'Carousel', group: 'Display', icon: GalleryHorizontal, description: 'Horizontally scrollable slide carousel', keywords: ['carousel', 'slider', 'slides', 'swipe', 'scroll'] },
			{ value: '/gems/timeline', label: 'Timeline', group: 'Display', icon: MoveRight, description: 'Vertical and horizontal timeline with custom dots', keywords: ['timeline', 'events', 'history', 'steps', 'vertical', 'horizontal'] },
		]
	},
	{
		key: 'layout', label: 'Layout', items: [
			{ value: '/gems/accordion', label: 'Accordion', group: 'Layout', icon: ScanLine, description: 'Collapsible accordion sections', keywords: ['collapse', 'expand', 'panel', 'toggle'] },
			{ value: '/gems/button-bar', label: 'Button Bar', group: 'Layout', icon: LayoutGrid, description: 'Horizontal group of buttons', keywords: ['toolbar', 'group', 'actions'] },
			{ value: '/gems/dnd', label: 'Drag & Drop', group: 'Layout', icon: Kanban, description: 'Sortable lists and Kanban boards', keywords: ['drag', 'drop', 'sort', 'kanban', 'reorder', 'dnd'] },
			{ value: '/gems/tree', label: 'Tree', group: 'Layout', icon: Network, description: 'Hierarchical tree view', keywords: ['tree', 'hierarchy', 'nested', 'folder'] },
			{ value: '/gems/tabs', label: 'Tabs', group: 'Layout', icon: RectangleHorizontal, description: 'Tabbed content panels', keywords: ['tab', 'panel', 'navigation', 'switch'] },
			{ value: '/gems/table', label: 'Table', group: 'Layout', icon: Tag, description: 'Data table with sorting and columns', keywords: ['data', 'grid', 'rows', 'columns', 'sort'] },
			{ value: '/gems/splitter', label: 'Splitter', group: 'Layout', icon: Columns, description: 'Resizable split panel layout', keywords: ['split', 'resize', 'panel', 'divider', 'pane'] },
		]
	},
	{
		key: 'forms', label: 'Forms', items: [
			{ value: '/gems/input', label: 'Input', group: 'Forms', icon: FileText, description: 'Text input field', keywords: ['text', 'field', 'type', 'form'] },
			{ value: '/gems/textarea', label: 'Textarea', group: 'Forms', icon: AlignJustify, description: 'Multi-line text editor', keywords: ['text', 'multiline', 'editor', 'write'] },
			{ value: '/gems/field', label: 'Field', group: 'Forms', icon: Rows, description: 'Form field wrapper with label', keywords: ['label', 'form', 'wrapper', 'input'] },
			{ value: '/gems/checkbox', label: 'Checkbox', group: 'Forms', icon: CheckSquare, description: 'Checkbox with group support', keywords: ['check', 'toggle', 'bool', 'multi'] },
			{ value: '/gems/radio', label: 'Radio', group: 'Forms', icon: Circle, description: 'Radio button group', keywords: ['radio', 'choice', 'select one', 'group'] },
			{ value: '/gems/color', label: 'Color', group: 'Forms', icon: Palette, description: 'Color picker input', keywords: ['color', 'picker', 'hex', 'rgb', 'hsl'] },
			{ value: '/gems/native-select', label: 'Native Select', group: 'Forms', icon: ChevronDownSquare, description: 'Native HTML select element', keywords: ['select', 'dropdown', 'option', 'native'] },
			{ value: '/gems/select', label: 'Select', group: 'Forms', icon: List, description: 'Custom searchable select dropdown', keywords: ['select', 'dropdown', 'search', 'option', 'combobox'] },
			{ value: '/gems/slider', label: 'Slider', group: 'Forms', icon: MoveRight, description: 'Range slider input', keywords: ['range', 'slide', 'number', 'min', 'max'] },
			{ value: '/gems/switch', label: 'Switch', group: 'Forms', icon: ToggleRight, description: 'Toggle switch', keywords: ['toggle', 'on', 'off', 'bool'] },
			{ value: '/gems/progress-bar', label: 'Progress Bar', group: 'Forms', icon: Loader, description: 'Progress and loading bar', keywords: ['progress', 'loading', 'bar', 'percent'] },
			{ value: '/gems/date-picker', label: 'Date Picker', group: 'Forms', icon: Calendar, description: 'Calendar date picker', keywords: ['date', 'calendar', 'picker', 'day', 'month'] },
			{ value: '/gems/time-picker', label: 'Time Picker', group: 'Forms', icon: Clock, description: 'Time input with mask', keywords: ['time', 'clock', 'hour', 'minute'] },
			{ value: '/gems/tag-editor', label: 'Tag Editor', group: 'Forms', icon: Tags, description: 'Multi-tag input with duplicate detection', keywords: ['tag', 'tags', 'chip', 'multi', 'input'] },
			{ value: '/gems/multi-select', label: 'Multi Select', group: 'Forms', icon: IconLayoutList, description: 'Select multiple items from a fixed list', keywords: ['multi', 'select', 'multiselect', 'tags', 'chip', 'label', 'value'] },
			{ value: '/gems/code-input', label: 'Code Input', group: 'Forms', icon: Search, description: 'Segmented input for OTPs and licence keys', keywords: ['otp', 'code', 'pin', 'license', 'segmented'] },
		]
	},
	{
		key: 'overlays', label: 'Overlays', items: [
			{ value: '/gems/popup', label: 'Popup', group: 'Overlays', icon: Maximize2, description: 'Anchored floating popup', keywords: ['popup', 'floating', 'anchor', 'overlay'] },
			{ value: '/gems/context-menu', label: 'Context Menu', group: 'Overlays', icon: Menu, description: 'Right-click context menu', keywords: ['context', 'right click', 'menu', 'actions'] },
			{ value: '/gems/tooltip', label: 'Tooltip', group: 'Overlays', icon: MessageSquare, description: 'Hover tooltip', keywords: ['tooltip', 'hint', 'hover', 'info'] },
			{ value: '/gems/modal', label: 'Modal', group: 'Overlays', icon: AppWindow, description: 'Modal dialog overlay', keywords: ['modal', 'dialog', 'overlay', 'popup'] },
			{ value: '/gems/toast', label: 'Toast', group: 'Overlays', icon: Bell, description: 'Toast notification messages', keywords: ['toast', 'notification', 'alert', 'message'] },
			{ value: '/gems/drawer', label: 'Drawer', group: 'Overlays', icon: PanelRight, description: 'Slide-in side drawer panel', keywords: ['drawer', 'sidebar', 'panel', 'slide'] },
			{ value: '/gems/zen', label: 'Zen', group: 'Overlays', icon: Maximize, description: 'Fullscreen zen / focus mode', keywords: ['zen', 'fullscreen', 'focus', 'distraction free'] },
			{ value: '/gems/command', label: 'Command Palette', group: 'Overlays', icon: Search, description: 'Keyboard-driven command palette', keywords: ['command', 'palette', 'search', 'shortcut', 'quick open'] },
		]
	},
	{
		key: 'diagrams', label: 'Diagrams', items: [
			{ value: '/gems/bar-chart', label: 'Bar Chart', group: 'Diagrams', icon: BarChart, description: 'Animated bar chart', keywords: ['chart', 'bar', 'graph', 'data', 'visualization'] },
			{ value: '/gems/heatmap', label: 'Heatmap', group: 'Diagrams', icon: AreaChart, description: 'Color-coded 2D data grid with tooltip', keywords: ['heatmap', 'heat', 'grid', 'matrix', 'activity', 'chart'] },
			{ value: '/gems/meter-group', label: 'MeterGroup', group: 'Diagrams', icon: BarChart, description: 'Segmented proportional bar with legend', keywords: ['meter', 'segment', 'proportion', 'bar', 'legend', 'chart'] },
			{ value: '/gems/progress-ring', label: 'Progress Ring', group: 'Diagrams', icon: Circle, description: 'Circular progress indicator', keywords: ['ring', 'circle', 'progress', 'donut', 'radial', 'percent'] },
		]
	},
	{
		key: 'charts', label: 'Charts', items: [
			{ value: '/gems/charts/line', label: 'Line Chart', group: 'Charts', icon: LineChart, description: 'Line and area chart powered by Chart.js', keywords: ['line', 'area', 'chart', 'graph', 'trend'] },
			{ value: '/gems/charts/bar', label: 'Bar Chart (CJS)', group: 'Charts', icon: BarChart, description: 'Grouped and stacked bar chart powered by Chart.js', keywords: ['bar', 'grouped', 'stacked', 'chart'] },
			{ value: '/gems/charts/pie', label: 'Pie & Doughnut', group: 'Charts', icon: PieChart, description: 'Pie and doughnut charts powered by Chart.js', keywords: ['pie', 'doughnut', 'donut', 'chart', 'circle'] },
			{ value: '/gems/charts/scatter', label: 'Scatter & Bubble', group: 'Charts', icon: ScatterChart, description: 'Scatter and bubble charts powered by Chart.js', keywords: ['scatter', 'bubble', 'point', 'chart'] },
			{ value: '/gems/charts/radar', label: 'Radar Chart', group: 'Charts', icon: LineChart, description: 'Radar / spider chart powered by Chart.js', keywords: ['radar', 'spider', 'polar', 'chart'] },
		]
	},
];

export const ALL_GEMS: NavItem[] = NAV_GROUPS.flatMap(g => g.items);
