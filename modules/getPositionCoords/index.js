// @flow
export type PositionningCoords = {
    style: {
        top: number,
        left: number,
        width: number,
    },
    alignTo: string,
};

/**
 * Returns the coordinates an element must use in order to be positionned under a target.
 */
export default function getPositionCoords(
    target: HTMLElement,
    win: window = global
): PositionningCoords {
    const box = target.getBoundingClientRect();

    const body = win.document.body;
    const docEl = win.document.documentElement;

    const scrollTop = win.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = win.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const clientWidth = docEl.clientWidth || body.clientWidth || 0;

    const top = box.top + box.height + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    // Align right
    const tiers = clientWidth / 3;
    return {
        style: {
            top: Math.round(top),
            left: Math.round(left),
            width: box.width,
        },
        alignTo: left / tiers > 2 ? 'right' : 'left',
    };
}
