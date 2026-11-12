# Component Segmentation

Large components that should be split into subcomponents. Goal: no component should exceed ~150-200 lines. Subcomponents live in the same folder as the parent.

---

## 1. Organizer.svelte — 318 lines (HIGH)

Multiple independent visual layers sitting in one file.

**Extract:**
- `OrganizerColumnHeaders` — column header row
- `OrganizerRowHeaders` — row header column
- `OrganizerItem` — individual draggable/resizable item with resize handles
- `OrganizerBlockedRegion` — blocked region visualization

---

## Already well-segmented (no action needed)

- `CalendarGrid.svelte` — `DayCell` and `EventBar` already extracted
- `CodeBlock.svelte` — reasonable size
