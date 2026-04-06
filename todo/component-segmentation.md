# Component Segmentation

Large components that should be split into subcomponents. Goal: no component should exceed ~150-200 lines. Subcomponents live in the same folder as the parent.

---

## 1. ImgEditor.svelte — 841 lines (HIGH)

The largest file by far. Has 4 distinct operational modes, each with their own UI panel and SVG overlay logic.

**Extract:**
- `ImgEditorToolbar` — mode buttons, undo/reset, dimension display
- `ImgEditorCanvas` — canvas element, image wrapper, display geometry
- `OrientationPanel` — rotate/flip buttons + apply/cancel
- `LevelingPanel` — angle slider + degree buttons + apply/cancel
- `CropPanel` — crop presets + apply/cancel
- `FocusPanel` — aspect ratio presets + preview controls
- `CropOverlay` — crop box with grid lines and resize handles (SVG)
- `FocalPointOverlay` — focal point crosshair (SVG)
- `SafeAreaOverlay` — safe area rect with handles (SVG)

---

## 2. TableEditor.svelte — 477 lines (HIGH)

Natural table structure that maps directly to components.

**Extract:**
- `TableToolbar` — H-Row / H-Col / Σ Row / Σ Col toggle buttons
- `TableHeaderCell` — column header: drag handle, align buttons, settings popup, insert/delete
- `TableBodyRow` — row with row controls + all data cells
- `TableCell` — individual textarea cell with prefix/postfix decorators
- `RowControls` — row number + drag handle + insert/delete buttons
- `ColConfigPopup` — column config panel (prefix, postfix, sum decorator)

---

## 3. Organizer.svelte — 318 lines (HIGH)

Multiple independent visual layers sitting in one file.

**Extract:**
- `OrganizerColumnHeaders` — column header row
- `OrganizerRowHeaders` — row header column
- `OrganizerItem` — individual draggable/resizable item with resize handles
- `OrganizerBlockedRegion` — blocked region visualization

---

## 4. BlockEditorItem.svelte — 218 lines (MEDIUM)

The toolbar has two distinct groups with different visibility behaviors.

**Extract:**
- `BlockToolbar` — full toolbar: drag handle, insert, move, collapse, copy, delete
  - `BlockToolbarLeft` — drag, insert, move up/down (collapses with block)
  - `BlockToolbarRight` — copy ID, delete (fades in on hover)

---

## 5. DiagramEditor.svelte — 201 lines (MEDIUM)

Three distinct states: empty, preview, and editor overlay.

**Extract:**
- `DiagramPreview` — SVG preview + scheme toggle + export/import/edit buttons
- `DiagramEmptyState` — empty state with import/create buttons
- `DiagramEditorOverlay` — iframe + header bar

---

## 6. MarkdownEditor.svelte — 199 lines (MEDIUM)

Three modes (edit, preview, split) with independent UI.

**Extract:**
- `MarkdownModeToolbar` — mode toggle buttons
- `MarkdownEditArea` — textarea with autogrow, paste, keydown handling
- `MarkdownPreviewArea` — prose-rendered preview pane

---

## 7. RMTimeline.svelte — 197 lines (MEDIUM)

Visual layers of the resource manager timeline.

**Extract:**
- `RMTimelineHeader` — sticky header with month/day rows
- `RMGridLines` — vertical day lines + rest column overlays
- `RMRowSeparators` — row separators + alternating background
- `RMTodayLine` — today indicator line
- `RMGhostBar` — ghost bar during allocation creation

---

## Already well-segmented (no action needed)

- `BlockEditor.svelte` (288 lines) — `BlockEditorItem` is properly extracted
- `CalendarGrid.svelte` — `DayCell` and `EventBar` already extracted
- `GanttTaskBar.svelte` (148 lines) — focused, minimal
- `CodeBlock.svelte` — reasonable size
