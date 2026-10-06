# Component Overview

Choose tools by the task they solve, then follow the linked documentation for setup, behavior, API, and limitations. The category index below includes documented public modules; inclusion does not imply a stability guarantee. Import documented public symbols from `@atom-forge/ui`, not from the source-folder paths.

For a recommended reading workflow, start with the [AI Consumer Entry Point](./ai-entrypoint.md).

## Choose by task

| Task | Tools to compare | Selection guidance |
|---|---|---|
| Select one value | [NativeSelect](../controls/forms/native-select.md), [Select](../controls/forms/select.md), [Radio](../controls/forms/radio.md) | Native select behavior, searchable/custom dropdown, or directly visible choices. |
| Select several values | [MultiSelect](../controls/forms/multi-select.md), [Checkbox](../controls/forms/checkbox.md) | Dropdown selection or visible checkbox choices; read each binding contract. |
| Edit string tags | [TagEditor](../controls/forms/tag-editor.md) | Free-form strings; compare MultiSelect for predefined option values. |
| Build a labeled input | [Field](../controls/forms/field.md), [Input](../controls/forms/input.md), [Textarea](../controls/forms/textarea.md) | Compose the label/hint/error wrapper with the appropriate control; see [Forms](./forms.md). |
| Enter dates or times | [DatePicker](../controls/forms/date-picker.md), [TimePicker](../controls/forms/time-picker.md), [DateTimePicker](../controls/forms/date-time-picker.md) | Match the required date/time value shape; these are inputs, not scheduling surfaces. |
| Show a binary setting | [Switch](../controls/forms/switch.md), [Checkbox](../controls/forms/checkbox.md) | On/off setting or checked selection; do not assume identical prop names. |
| Show tabular records | [Table](../controls/data/table.md), [Pagination](../controls/layout/pagination.md), [EmptyState](../controls/display/empty-state.md) | Compose record display and application-managed paging/state; see [Data Display](./data-display.md). |
| Visualize measurements | [BarChart](../controls/data/bar-chart.md), [Charts](../controls/data/charts.md), [Heatmap](../controls/data/heatmap.md), [MeterGroup](../controls/data/meter-group.md) | Compare bars, Chart.js plots, two-dimensional values, or parts of a total. |
| Show progress or loading | [ProgressBar](../controls/forms/progress-bar.md), [ProgressRing](../controls/data/progress-ring.md), [Skeleton](../controls/display/skeleton.md) | Measured progress or content-shaped loading placeholders. |
| Reorder or transfer items | [SortableList / SortableGroup](../controls/data/sortable.md) | One-list ordering or cross-list transfer; see [Sortable Lists](./sortable-lists.md). |
| Organize navigation or panels | [Tabs](../controls/layout/tabs.md), [Accordion](../controls/layout/accordion.md), [Tree](../controls/layout/tree.md), [Splitter](../controls/layout/splitter.md) | Peer views, expandable sections, hierarchy, or resizable panels. |
| Open supplementary UI | [Modal](../controls/overlays/modal.md), [Drawer](../controls/overlays/drawer.md), [Popup](../controls/overlays/popup.md) | Dialog, edge panel, or anchored content; see [Overlays](./overlays.md). |
| Expose actions | [ContextMenu](../controls/overlays/context-menu.md), [CommandPalette](../controls/overlays/command.md) | Contextual menu or searchable commands; the command palette requires application-managed visibility. |
| Explain or notify | [Tooltip](../controls/overlays/tooltip.md), [Toast](../controls/overlays/toast.md), [EmptyState](../controls/display/empty-state.md) | Hover explanation, transient feedback, or persistent no-content state. |
| Render prose or documentation | [Prose](../controls/content/prose.md), [Doc](../controls/content/doc.md) | Readable content or API/code/example documentation primitives. |
| Edit content | [MarkdownEditor](../controls/editors/markdown-editor.md), [BlockEditor](../controls/editors/block-editor.md), [TableEditor](../controls/editors/table-editor.md), [DiagramEditor](../controls/editors/diagram-editor.md), [ImgEditor](../controls/editors/img-editor.md) | Choose the editor matching the underlying data model, not just its visual appearance. |
| Schedule dates and resources | [Calendar](../controls/scheduling/calendar.md), [Gantt](../controls/scheduling/gantt.md), [Organizer](../controls/scheduling/organizer.md), [ResourceManager](../controls/scheduling/resource-manager.md) | Compare calendar events, task timelines, custom unit grids, and resource assignments. |

## Category index

---

## General
Basic building blocks and primitive controls used throughout applications.

- **[Badge](../controls/general/badge.md)**: An absolute-positioned overlay indicator for notification counts or status dots.
- **[Button](../controls/general/button.md)**: A clickable element for triggering actions.
- **[Chip](../controls/general/chip.md)**: A compact inline label for metadata, statuses, or tags.
- **[Icon](../controls/general/icon.md)**: A wrapper for icons with unified sizing and stroke control.
- **[Kbd](../controls/general/kbd.md)**: Renders keyboard shortcut keys styled as physical keycaps.

---

## Data & Charts
Components for visualizing, presenting, and manipulating complex data sets.

- **[Bar Chart](../controls/data/bar-chart.md)**: A responsive bar chart supporting single-value, multi-series grouped, and stacked layouts.
- **[Charts (Chart.js)](../controls/data/charts.md)**: Canvas-based chart components powered by Chart.js.
- **[Heatmap](../controls/data/heatmap.md)**: An SVG-based heatmap for visualizing 2D datasets with a color scale.
- **[Meter Group](../controls/data/meter-group.md)**: A segmented horizontal bar that visualizes proportions within a total.
- **[Progress Ring](../controls/data/progress-ring.md)**: A circular SVG progress indicator.
- **[Sortable](../controls/data/sortable.md)**: Components for drag-and-drop sorting and list reordering.
- **[Table](../controls/data/table.md)**: A generic, type-safe data table with sticky headers and custom cell rendering; sorting is application-owned.
- **[Timeline](../controls/data/timeline.md)**: A flexible timeline component that renders items along a vertical or horizontal line.

---

## Display
Components for displaying content, user information, and UI status.

- **[Avatar](../controls/display/avatar.md)**: A circular user representation with image or initials.
- **[Avatar Group](../controls/display/avatar-group.md)**: Renders a horizontal stack of overlapping Avatar components.
- **[Card](../controls/display/card.md)**: A surface container with rounded borders and configurable shadow elevation.
- **[Carousel](../controls/display/carousel.md)**: A horizontally scrollable slide container with scroll-snap and navigation.
- **[Empty State](../controls/display/empty-state.md)**: A centered placeholder shown when a section has no content.
- **[Flip Card](../controls/display/flip-card.md)**: A 3D flip card with a front and back face.
- **[Skeleton](../controls/display/skeleton.md)**: Content-shaped loading placeholders.

---

## Content
Components for rendering structured content.

- **[Doc](../controls/content/doc.md)**: API tables, code displays, and example presentation primitives.
- **[Prose](../controls/content/prose.md)**: Composable prose and Markdown rendering primitives.

---

## Forms
Standardized form controls and inputs for user data collection.

- **[Checkbox](../controls/forms/checkbox.md)**: Boolean toggle control with group management and multiple variants.
- **[Code Input](../controls/forms/code-input.md)**: A segmented input for OTPs, PIN codes, and license keys.
- **[Color](../controls/forms/color.md)**: A styled color input for hex value selection.
- **[Date Picker](../controls/forms/date-picker.md)**: A single-date selector with a popup calendar.
- **[Date Time Picker](../controls/forms/date-time-picker.md)**: Combined date and time entry.
- **[Field](../controls/forms/field.md)**: A wrapper pairing a form control with a label, hint, and error message.
- **[Input](../controls/forms/input.md)**: A styled text input supporting icons, prefix/suffix slots, and variants.
- **[Multi-Select](../controls/forms/multi-select.md)**: A control for selecting multiple items from a fixed list.
- **[Native Select](../controls/forms/native-select.md)**: A styled wrapper around the native HTML select element.
- **[Progress Bar](../controls/forms/progress-bar.md)**: A horizontal progress indicator with smooth transitions.
- **[Radio](../controls/forms/radio.md)**: A radio button group for mutually exclusive options.
- **[Select](../controls/forms/select.md)**: A custom searchable dropdown select.
- **[Slider](../controls/forms/slider.md)**: Range and scalar value slider with single or double thumbs.
- **[Switch](../controls/forms/switch.md)**: A toggle switch for binary on/off states.
- **[Tag Editor](../controls/forms/tag-editor.md)**: An interactive input for managing a list of string tags.
- **[Textarea](../controls/forms/textarea.md)**: A multi-line text input styled consistently with the input system.
- **[Time Picker](../controls/forms/time-picker.md)**: A styled wrapper around the native time input.

---

## Editors
Rich editing controls for structured authoring workflows.

- **[Block Editor](../controls/editors/block-editor.md)**: Structured block editing, preview components, and the block context API.
- **[Diagram Editor](../controls/editors/diagram-editor.md)**: Node-and-edge diagram editing.
- **[Image Editor](../controls/editors/img-editor.md)**: Image loading, crop/transform controls, and edit-chain metadata; raster export is application-owned.
- **[Markdown Editor](../controls/editors/markdown-editor.md)**: Markdown text editing with formatting controls.
- **[Table Editor](../controls/editors/table-editor.md)**: Editable table data and read-only table preview.

---

## Layout
Structural components to help organize and navigate content.

- **[Accordion](../controls/layout/accordion.md)**: Expandable content panels with single or multiple open items.
- **[Breadcrumb](../controls/layout/breadcrumb.md)**: A navigation trail showing the current page's location.
- **[Button Bar](../controls/layout/button-bar.md)**: A visual wrapper that groups children into a unified horizontal bar.
- **[Pagination](../controls/layout/pagination.md)**: Controls for navigating through multiple pages of content.
- **[Pagination Slider](../controls/layout/pagination-slider.md)**: A slider-based page navigation control.
- **[Splitter](../controls/layout/splitter.md)**: A resizable split-panel container for complex layouts.
- **[Stepper](../controls/layout/stepper.md)**: A multi-step progress and navigation control.
- **[Tabs](../controls/layout/tabs.md)**: A tab navigation system with multiple visual variants.
- **[Tree](../controls/layout/tree.md)**: A collapsible tree view for hierarchical data structures.

---

## Overlays
Dynamic overlays that appear on top of the main application content.

- **[Command](../controls/overlays/command.md)**: Searchable command palette and command item API.
- **[Context Menu](../controls/overlays/context-menu.md)**: A popup menu built from a declarative configuration.
- **[Drawer](../controls/overlays/drawer.md)**: A slide-in panel anchored to any screen edge.
- **[Modal](../controls/overlays/modal.md)**: An imperative modal dialog system.
- **[Popup](../controls/overlays/popup.md)**: A floating overlay system for anchored content like dropdowns and submenus.
- **[Toast](../controls/overlays/toast.md)**: Lightweight notification messages stacked in a fixed overlay.
- **[Tooltip](../controls/overlays/tooltip.md)**: Hover tooltips that appear with a delay.
- **[Zen](../controls/overlays/zen.md)**: A fullscreen overlay for distraction-free focus mode.

---

## Scheduling
Controls for calendar, timeline, and resource planning interfaces.

- **[Calendar](../controls/scheduling/calendar.md)**: Calendar views and event editing callbacks.
- **[Gantt](../controls/scheduling/gantt.md)**: Task timeline, progress, and dependency visualization.
- **[Organizer](../controls/scheduling/organizer.md)**: A unit-based scheduling surface for calendars, dashboards, and resource grids.
- **[Resource Manager](../controls/scheduling/resource-manager.md)**: Resource assignment planning.
