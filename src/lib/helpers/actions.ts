import { BROWSER } from 'esm-env';
import type { ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import type {
    BaseEventPayload,
    DropTargetLocalizedData
} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';

// Cached module promises
let _adapterPromise: Promise<typeof import('@atlaskit/pragmatic-drag-and-drop/element/adapter')> | null = null;
let _previewPromise: Promise<typeof import('@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview')> | null = null;
let _pointerPromise: Promise<typeof import('@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview')> | null = null;

function getAdapter() { return (_adapterPromise ??= import('@atlaskit/pragmatic-drag-and-drop/element/adapter')); }
function getPreview() { return (_previewPromise  ??= import('@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview')); }
function getPointer() { return (_pointerPromise  ??= import('@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview')); }

export interface DraggableOptions {
    data?: Record<string, unknown>;
    /** Direct handle element reference. */
    dragHandle?: Element;
    /** CSS selector resolved lazily on the draggable element's subtree. */
    dragHandleSelector?: string;
    canDrag?: (args: any) => boolean;
    onGenerateDragPreview?: (args: any) => void;
    onDragStart?: (args: BaseEventPayload<ElementDragType>) => void;
    onDrop?: (args: BaseEventPayload<ElementDragType>) => void;
}

export interface DropTargetOptions {
    getData?: (args: { input: any; element: Element }) => Record<string, unknown>;
    canDrop?: (args: any) => boolean;
    onDragEnter?: (args: BaseEventPayload<ElementDragType> & DropTargetLocalizedData) => void;
    onDragLeave?: (args: BaseEventPayload<ElementDragType> & DropTargetLocalizedData) => void;
    onDrop?: (args: BaseEventPayload<ElementDragType> & DropTargetLocalizedData) => void;
    onDrag?: (args: BaseEventPayload<ElementDragType> & DropTargetLocalizedData) => void;
}

export const dnd = {
    draggable(node: HTMLElement, options: DraggableOptions) {
        if (!BROWSER) return { destroy() {}, update() {} };
        let cleanup = () => {};
        getAdapter().then(({ draggable }) => {
            const handle = options.dragHandle
                ?? (options.dragHandleSelector ? node.querySelector(options.dragHandleSelector) ?? undefined : undefined);
            cleanup = draggable({
                element: node,
                dragHandle: handle,
                getInitialData: () => options.data || {},
                canDrag: options.canDrag,
                onGenerateDragPreview: options.onGenerateDragPreview,
                onDragStart: options.onDragStart,
                onDrop: options.onDrop
            });
        });
        return {
            update(newOptions: DraggableOptions) { options = newOptions; },
            destroy() { cleanup(); }
        };
    },

    dropTarget(node: HTMLElement, options: DropTargetOptions) {
        if (!BROWSER) return { destroy() {}, update() {} };
        let cleanup = () => {};
        getAdapter().then(({ dropTargetForElements }) => {
            cleanup = dropTargetForElements({
                element: node,
                getData: (args) => (options.getData ? options.getData(args) : {}),
                canDrop: options.canDrop,
                onDragEnter: options.onDragEnter,
                onDragLeave: options.onDragLeave,
                onDrop: options.onDrop,
                onDrag: options.onDrag
            });
        });
        return {
            update(newOptions: DropTargetOptions) { options = newOptions; },
            destroy() { cleanup(); }
        };
    },

    async getMonitor() {
        return (await getAdapter()).monitorForElements;
    },

    async getPreview() {
        return (await getPreview()).setCustomNativeDragPreview;
    },

    async getPointerOffset() {
        return (await getPointer()).pointerOutsideOfPreview;
    },
};
