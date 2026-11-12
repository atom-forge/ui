/** DOM id of the floating layer rendered by `Root`, above modals and drawers. */
const PORTAL_TARGET_ID = 'atom-forge-portal-target';

export type PortalTarget = string | HTMLElement;

function resolvePortalTarget(target?: PortalTarget): HTMLElement {
    if (target instanceof HTMLElement) return target;
    const el = target
        ? document.querySelector<HTMLElement>(target)
        : document.getElementById(PORTAL_TARGET_ID);
    return el ?? document.body;
}

/**
 * Moves the node into the ui's floating layer (rendered by `Root`, above modals and drawers),
 * or into `target` (a CSS selector or an element). Falls back to `document.body` when the
 * target cannot be found, e.g. without `Root`.
 */
export function portal(node: HTMLElement, target?: PortalTarget) {
    resolvePortalTarget(target).appendChild(node);
    return {
        update(next?: PortalTarget) {
            resolvePortalTarget(next).appendChild(node);
        },
        destroy() {
            node.remove();
        }
    };
}
