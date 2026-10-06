import {ChartBase, LineChart, CjsBarChart, PieChart, DoughnutChart, ScatterChart, BubbleChart, RadarChart} from './controls/data/charts/index.js';
import {BarChart} from './controls/data/diagrams/index.js';
import {SortableList, SortableGroup, DropSlot, DropIndicator} from './controls/data/sortable/index.js';
import {Heatmap} from './controls/data/heatmap/index.js';
import {MeterGroup, MeterGroupLegend} from './controls/data/meter-group/index.js';
import {ProgressRing} from './controls/data/progress-ring/index.js';
import {Table, TableSettings} from './controls/data/table/index.js';
import {Timeline} from './controls/data/timeline/index.js';
import {Avatar} from './controls/display/avatar/index.js';
import {AvatarGroup} from './controls/display/avatar-group/index.js';
import {Card} from './controls/display/card/index.js';
import {Carousel, CarouselIndicator} from './controls/display/carousel/index.js';
import {EmptyState} from './controls/display/empty-state/index.js';
import {FlipCard} from './controls/display/flip-card/index.js';
import {Skeleton} from './controls/display/skeleton/index.js';
import {Checkbox, CheckboxGroupManager, CheckboxView} from './controls/forms/checkbox/index.js';
import {CodeInput} from './controls/forms/code-input/index.js';
import {ColorPicker} from './controls/forms/color/index.js';
import {DatePicker, DatePickerBody, DatePopover} from './controls/forms/date-picker/index.js';
import {DateTimePicker, DateTimePickerBody, DateTimePopover} from './controls/forms/date-time-picker/index.js';
import {Field, FieldGroup, FieldSpan} from './controls/forms/field/index.js';
import {Input} from './controls/forms/input/index.js';
import {MultiSelect} from './controls/forms/multi-select/index.js';
import {NativeSelect} from './controls/forms/native-select/index.js';
import {ProgressBar} from './controls/forms/progress-bar/index.js';
import {RadioGroup, RadioButton} from './controls/forms/radio/index.js';
import {Select} from './controls/forms/select/index.js';
import {Slider, Range} from './controls/forms/slider/index.js';
import {Switch} from './controls/forms/switch/index.js';
import {TagEditor} from './controls/forms/tag-editor/index.js';
import {Textarea} from './controls/forms/textarea/index.js';
import {TimePicker, TimePickerBody, TimePopover} from './controls/forms/time-picker/index.js';
import {Badge} from './controls/general/badge/index.js';
import {Button} from './controls/general/button/index.js';
import {Chip} from './controls/general/chip/index.js';
import {Icon} from './controls/general/icon/index.js';
import {Kbd} from './controls/general/kbd/index.js';
import {Accordion, AccordionItem, Collapsible} from './controls/layout/accordion/index.js';
import {Breadcrumb} from './controls/layout/breadcrumb/index.js';
import {ButtonBar, ButtonBarItem} from './controls/layout/button-bar/index.js';
import {Pagination} from './controls/layout/pagination/index.js';
import {PaginationSlider} from './controls/layout/pagination-slider/index.js';
import {Splitter} from './controls/layout/splitter/index.js';
import {Stepper} from './controls/layout/stepper/index.js';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from './controls/layout/tabs/index.js';
import {TreeItem, TreeView} from './controls/layout/tree/index.js';
import {CommandPalette} from './controls/overlays/command/index.js';
import {ContextMenu} from './controls/overlays/context-menu/index.js';
import {Drawer, DrawerContainer} from './controls/overlays/drawer/index.js';
import {ModalContainer} from './controls/overlays/modal/index.js';
import {Popup, PopupContainer} from './controls/overlays/popup/index.js';
import {Toast, ToastContainer} from './controls/overlays/toast/index.js';
import {Tooltip} from './controls/overlays/tooltip/index.js';
import {Zen} from './controls/overlays/zen/index.js';
import {BlockEditor, BlockItem, BlockView, BlockEditTextarea, BlockEditMarkdown, BlockEditHeading, BlockEditQuote, BlockEditDiagram, BlockEditCallout, BlockEditDivider, BlockEditYoutube, BlockEditCode, BlockEditTable, BlockEditLinkCard, BlockViewHeading, BlockViewTextarea, BlockViewMarkdown, BlockViewQuote, BlockViewDivider, BlockViewYoutube, BlockViewTable, BlockViewDiagram, BlockViewCallout, BlockViewCode, BlockViewLinkCard} from './controls/editors/block-editor/index.js';
import {DiagramEditor} from './controls/editors/diagram-editor/index.js';
import {ImgEditor} from './controls/editors/img-editor/index.js';
import {MarkdownEditor} from './controls/editors/markdown-editor/index.js';
import {TableEditor, TablePreview} from './controls/editors/table-editor/index.js';
import {Calendar} from './controls/scheduling/calendar/index.js';
import {GanttChart} from './controls/scheduling/gantt/index.js';
import {Organizer} from './controls/scheduling/organizer/index.js';
import {ResourceManager} from './controls/scheduling/resource-manager/index.js';
import {DocApiBlock, DocApiTable, DocInlineCode, DocShowCode, DocShowExample} from './controls/content/doc/index.js';
import {ProsePage, ProseParagraph, ProseDivider, ProseBlockQuote, ProseCallout, ProseLinkCard, ProseMarkdown, ProseText, ProseTitle, ProseYoutubeEmbed} from './controls/content/prose/index.js';
import {createCheckboxGroupManager, getCheckboxGroupManager, setCheckboxGroupManager} from './controls/forms/checkbox/index.js';
import {getBlockAPI} from './controls/editors/block-editor/index.js';
import {createModalManager, getModalManager, setModalManager} from './controls/overlays/modal/index.js';
import {createDrawerManager, getDrawerManager, setDrawerManager} from './controls/overlays/drawer/index.js';
import {createPopupManager, getPopupManager, setPopupManager} from './controls/overlays/popup/index.js';
import {createToastManager, getToastManager, setToastManager} from './controls/overlays/toast/index.js';
import Root from './core/Root.svelte';
import Atom from './core/Atom.svelte';
import RenderSnippet from './helpers/RenderSnippet.svelte';
import Spinner from './helpers/Spinner.svelte';
import SelectPopup from './helpers/SelectPopup.svelte';
import {getThemeManager} from "./core/theme-manager.svelte";

export const UI: {
	readonly ChartBase: typeof ChartBase;
	readonly LineChart: typeof LineChart;
	readonly CjsBarChart: typeof CjsBarChart;
	readonly PieChart: typeof PieChart;
	readonly DoughnutChart: typeof DoughnutChart;
	readonly ScatterChart: typeof ScatterChart;
	readonly BubbleChart: typeof BubbleChart;
	readonly RadarChart: typeof RadarChart;
	readonly BarChart: typeof BarChart;
	readonly SortableList: typeof SortableList;
	readonly SortableGroup: typeof SortableGroup;
	readonly DropSlot: typeof DropSlot;
	readonly DropIndicator: typeof DropIndicator;
	readonly Heatmap: typeof Heatmap;
	readonly MeterGroup: typeof MeterGroup;
	readonly MeterGroupLegend: typeof MeterGroupLegend;
	readonly ProgressRing: typeof ProgressRing;
	readonly Table: typeof Table;
	readonly TableSettings: typeof TableSettings;
	readonly Timeline: typeof Timeline;
	readonly Avatar: typeof Avatar;
	readonly AvatarGroup: typeof AvatarGroup;
	readonly Card: typeof Card;
	readonly Carousel: typeof Carousel;
	readonly CarouselIndicator: typeof CarouselIndicator;
	readonly EmptyState: typeof EmptyState;
	readonly FlipCard: typeof FlipCard;
	readonly Skeleton: typeof Skeleton;
	readonly Checkbox: typeof Checkbox;
	readonly CheckboxGroupManager: typeof CheckboxGroupManager;
	readonly CheckboxView: typeof CheckboxView;
	readonly CodeInput: typeof CodeInput;
	readonly ColorPicker: typeof ColorPicker;
	readonly DatePicker: typeof DatePicker;
	readonly DatePickerBody: typeof DatePickerBody;
	readonly DatePopover: typeof DatePopover;
	readonly DateTimePicker: typeof DateTimePicker;
	readonly DateTimePickerBody: typeof DateTimePickerBody;
	readonly DateTimePopover: typeof DateTimePopover;
	readonly Field: typeof Field;
	readonly FieldGroup: typeof FieldGroup;
	readonly FieldSpan: typeof FieldSpan;
	readonly Input: typeof Input;
	readonly MultiSelect: typeof MultiSelect;
	readonly NativeSelect: typeof NativeSelect;
	readonly ProgressBar: typeof ProgressBar;
	readonly RadioGroup: typeof RadioGroup;
	readonly RadioButton: typeof RadioButton;
	readonly Select: typeof Select;
	readonly Slider: typeof Slider;
	readonly Range: typeof Range;
	readonly Switch: typeof Switch;
	readonly TagEditor: typeof TagEditor;
	readonly Textarea: typeof Textarea;
	readonly TimePicker: typeof TimePicker;
	readonly TimePickerBody: typeof TimePickerBody;
	readonly TimePopover: typeof TimePopover;
	readonly Badge: typeof Badge;
	readonly Button: typeof Button;
	readonly Chip: typeof Chip;
	readonly Icon: typeof Icon;
	readonly Kbd: typeof Kbd;
	readonly Accordion: typeof Accordion;
	readonly AccordionItem: typeof AccordionItem;
	readonly Collapsible: typeof Collapsible;
	readonly Breadcrumb: typeof Breadcrumb;
	readonly ButtonBar: typeof ButtonBar;
	readonly ButtonBarItem: typeof ButtonBarItem;
	readonly Pagination: typeof Pagination;
	readonly PaginationSlider: typeof PaginationSlider;
	readonly Splitter: typeof Splitter;
	readonly Stepper: typeof Stepper;
	readonly Tab: typeof Tab;
	readonly TabList: typeof TabList;
	readonly TabPanel: typeof TabPanel;
	readonly TabPanels: typeof TabPanels;
	readonly Tabs: typeof Tabs;
	readonly TreeItem: typeof TreeItem;
	readonly TreeView: typeof TreeView;
	readonly CommandPalette: typeof CommandPalette;
	readonly ContextMenu: typeof ContextMenu;
	readonly Drawer: typeof Drawer;
	readonly DrawerContainer: typeof DrawerContainer;
	readonly ModalContainer: typeof ModalContainer;
	readonly Popup: typeof Popup;
	readonly PopupContainer: typeof PopupContainer;
	readonly Toast: typeof Toast;
	readonly ToastContainer: typeof ToastContainer;
	readonly Tooltip: typeof Tooltip;
	readonly Zen: typeof Zen;
	readonly BlockEditor: typeof BlockEditor;
	readonly BlockItem: typeof BlockItem;
	readonly BlockView: typeof BlockView;
	readonly BlockEditTextarea: typeof BlockEditTextarea;
	readonly BlockEditMarkdown: typeof BlockEditMarkdown;
	readonly BlockEditHeading: typeof BlockEditHeading;
	readonly BlockEditQuote: typeof BlockEditQuote;
	readonly BlockEditDiagram: typeof BlockEditDiagram;
	readonly BlockEditCallout: typeof BlockEditCallout;
	readonly BlockEditDivider: typeof BlockEditDivider;
	readonly BlockEditYoutube: typeof BlockEditYoutube;
	readonly BlockEditCode: typeof BlockEditCode;
	readonly BlockEditTable: typeof BlockEditTable;
	readonly BlockEditLinkCard: typeof BlockEditLinkCard;
	readonly BlockViewHeading: typeof BlockViewHeading;
	readonly BlockViewTextarea: typeof BlockViewTextarea;
	readonly BlockViewMarkdown: typeof BlockViewMarkdown;
	readonly BlockViewQuote: typeof BlockViewQuote;
	readonly BlockViewDivider: typeof BlockViewDivider;
	readonly BlockViewYoutube: typeof BlockViewYoutube;
	readonly BlockViewTable: typeof BlockViewTable;
	readonly BlockViewDiagram: typeof BlockViewDiagram;
	readonly BlockViewCallout: typeof BlockViewCallout;
	readonly BlockViewCode: typeof BlockViewCode;
	readonly BlockViewLinkCard: typeof BlockViewLinkCard;
	readonly DiagramEditor: typeof DiagramEditor;
	readonly ImgEditor: typeof ImgEditor;
	readonly MarkdownEditor: typeof MarkdownEditor;
	readonly TableEditor: typeof TableEditor;
	readonly TablePreview: typeof TablePreview;
	readonly Calendar: typeof Calendar;
	readonly GanttChart: typeof GanttChart;
	readonly Organizer: typeof Organizer;
	readonly ResourceManager: typeof ResourceManager;
	readonly DocApiBlock: typeof DocApiBlock;
	readonly DocApiTable: typeof DocApiTable;
	readonly DocInlineCode: typeof DocInlineCode;
	readonly DocShowCode: typeof DocShowCode;
	readonly DocShowExample: typeof DocShowExample;
	readonly ProsePage: typeof ProsePage;
	readonly ProseParagraph: typeof ProseParagraph;
	readonly ProseDivider: typeof ProseDivider;
	readonly ProseBlockQuote: typeof ProseBlockQuote;
	readonly ProseCallout: typeof ProseCallout;
	readonly ProseLinkCard: typeof ProseLinkCard;
	readonly ProseMarkdown: typeof ProseMarkdown;
	readonly ProseText: typeof ProseText;
	readonly ProseTitle: typeof ProseTitle;
	readonly ProseYoutubeEmbed: typeof ProseYoutubeEmbed;
	readonly createCheckboxGroupManager: typeof createCheckboxGroupManager;
	readonly getCheckboxGroupManager: typeof getCheckboxGroupManager;
	readonly setCheckboxGroupManager: typeof setCheckboxGroupManager;
	readonly getBlockAPI: typeof getBlockAPI;
	readonly createModalManager: typeof createModalManager;
	readonly getModalManager: typeof getModalManager;
	readonly setModalManager: typeof setModalManager;
	readonly createDrawerManager: typeof createDrawerManager;
	readonly getDrawerManager: typeof getDrawerManager;
	readonly setDrawerManager: typeof setDrawerManager;
	readonly createPopupManager: typeof createPopupManager;
	readonly getPopupManager: typeof getPopupManager;
	readonly setPopupManager: typeof setPopupManager;
	readonly createToastManager: typeof createToastManager;
	readonly getToastManager: typeof getToastManager;
	readonly setToastManager: typeof setToastManager;
	readonly Root: typeof Root;
	readonly Atom: typeof Atom;
	readonly RenderSnippet: typeof RenderSnippet;
	readonly Spinner: typeof Spinner;
	readonly SelectPopup: typeof SelectPopup;
	readonly getThemeManager: typeof getThemeManager;
} = {
	ChartBase,
	LineChart,
	CjsBarChart,
	PieChart,
	DoughnutChart,
	ScatterChart,
	BubbleChart,
	RadarChart,
	BarChart,
	SortableList,
	SortableGroup,
	DropSlot,
	DropIndicator,
	Heatmap,
	MeterGroup,
	MeterGroupLegend,
	ProgressRing,
	Table,
	TableSettings,
	Timeline,
	Avatar,
	AvatarGroup,
	Card,
	Carousel,
	CarouselIndicator,
	EmptyState,
	FlipCard,
	Skeleton,
	Checkbox,
	CheckboxGroupManager,
	CheckboxView,
	CodeInput,
	ColorPicker,
	DatePicker,
	DatePickerBody,
	DatePopover,
	DateTimePicker,
	DateTimePickerBody,
	DateTimePopover,
	Field,
	FieldGroup,
	FieldSpan,
	Input,
	MultiSelect,
	NativeSelect,
	ProgressBar,
	RadioGroup,
	RadioButton,
	Select,
	Slider,
	Range,
	Switch,
	TagEditor,
	Textarea,
	TimePicker,
	TimePickerBody,
	TimePopover,
	Badge,
	Button,
	Chip,
	Icon,
	Kbd,
	Accordion,
	AccordionItem,
	Collapsible,
	Breadcrumb,
	ButtonBar,
	ButtonBarItem,
	Pagination,
	PaginationSlider,
	Splitter,
	Stepper,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	TreeItem,
	TreeView,
	CommandPalette,
	ContextMenu,
	Drawer,
	DrawerContainer,
	ModalContainer,
	Popup,
	PopupContainer,
	Toast,
	ToastContainer,
	Tooltip,
	Zen,
	BlockEditor,
	BlockItem,
	BlockView,
	BlockEditTextarea,
	BlockEditMarkdown,
	BlockEditHeading,
	BlockEditQuote,
	BlockEditDiagram,
	BlockEditCallout,
	BlockEditDivider,
	BlockEditYoutube,
	BlockEditCode,
	BlockEditTable,
	BlockEditLinkCard,
	BlockViewHeading,
	BlockViewTextarea,
	BlockViewMarkdown,
	BlockViewQuote,
	BlockViewDivider,
	BlockViewYoutube,
	BlockViewTable,
	BlockViewDiagram,
	BlockViewCallout,
	BlockViewCode,
	BlockViewLinkCard,
	DiagramEditor,
	ImgEditor,
	MarkdownEditor,
	TableEditor,
	TablePreview,
	Calendar,
	GanttChart,
	Organizer,
	ResourceManager,
	DocApiBlock,
	DocApiTable,
	DocInlineCode,
	DocShowCode,
	DocShowExample,
	ProsePage,
	ProseParagraph,
	ProseDivider,
	ProseBlockQuote,
	ProseCallout,
	ProseLinkCard,
	ProseMarkdown,
	ProseText,
	ProseTitle,
	ProseYoutubeEmbed,
	createCheckboxGroupManager,
	getCheckboxGroupManager,
	setCheckboxGroupManager,
	getBlockAPI,
	createModalManager,
	getModalManager,
	setModalManager,
	createDrawerManager,
	getDrawerManager,
	setDrawerManager,
	createPopupManager,
	getPopupManager,
	setPopupManager,
	createToastManager,
	getToastManager,
	setToastManager,
	Root,
	Atom,
	RenderSnippet,
	Spinner,
	SelectPopup,
	getThemeManager,
};
