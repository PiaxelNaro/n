// @flow

export type Align = 'left' | 'center' | 'right';

export type LooseColumn = {
    key?: string,
    keys?: Array<string>,
    label?: any,
    tooltip?: any,
    subColumns?: Array<LooseColumn>,
    size?: Array<string> | string,
    align?: Array<Align> | Align,
    isSortable?: boolean,
};

export type Column = {
    key: string,
    keys: Array<string>,
    label: any,
    tooltip: any,
    subColumns: Array<Column>,
    size: Array<string>,
    isSortable: boolean,
    align: Array<Align>,
    headerAlign: Align,
};

export const getColumnColSpan = (col: Column) =>
    Math.max(
        1,
        col.keys.length,
        col.subColumns.reduce((m, { keys }) => m + keys.length, 0)
    );

export const getColumnRowSpan = (col: Column) => (col.subColumns.length ? 1 : 2);

export const normalizeColumn = (column: LooseColumn): Column => {
    const subColumns = column.subColumns ? column.subColumns.map(normalizeColumn) : [];
    let keys = [];
    if (!subColumns.length) {
        keys = column.keys || [];
        if (!keys.length) {
            keys = column.key ? [column.key] : [];
        }
    }
    const size = keys.map((_, i) => {
        if (Array.isArray(column.size)) {
            return i in column.size ? column.size[i] : 'medium';
        }

        return column.size ? column.size : 'medium';
    });

    const align = keys.map((_, i) => {
        if (Array.isArray(column.align)) {
            return i in column.align ? column.align[i] : 'left';
        }

        return column.align ? column.align : 'left';
    });

    let headerAlign = 'left';
    if (subColumns.length <= 1 && align.length === 1) {
        // follow column align if not composed column
        headerAlign = align[0];
    }

    let key = column.key || keys.join('|');
    if (subColumns.length) {
        // eslint-disable-next-line no-shadow
        key = subColumns.map(({ key }) => key).join('|');
    }

    return {
        key,
        isSortable: Boolean(column.isSortable),
        label: column.label,
        tooltip: column.tooltip,
        subColumns,
        keys,
        size,
        headerAlign,
        align,
    };
};

function getFirstHTMLChildren(tr: HTMLElement): void | HTMLElement {
    return Array.from(tr.children).find(node => Boolean(node.tagName));
}

export const createSizeMatrix = (tableScroller: ?HTMLElement) => {
    const table = tableScroller ? tableScroller.querySelector('table') : null;

    if (!tableScroller || !table) {
        return {
            width: 'auto',
            scrollerWidth: 'auto',
            rows: [],
        };
    }

    const mainTrs = Array.from(table.querySelectorAll('tr'));
    return {
        width: `${table.offsetWidth}px`,
        scrollerWidth: `${tableScroller.getBoundingClientRect().width}px`,
        rows: mainTrs.map((tr: HTMLElement) => {
            let cells = [];
            if (tr.parentNode && tr.parentNode.tagName === 'THEAD') {
                cells = Array.from(tr.children).map(cell => ({
                    width: `${cell.offsetWidth}px`,
                }));
            }

            // Chrome mess up rowspan heights, so we need to rely on the first child size if the
            // row has no height or no first child.
            // Here we won't get height from element's offsetHeight
            // because table cell size in Firefox will contain decimal number
            let rowHeight = tr.getBoundingClientRect().height;
            const firstChild = getFirstHTMLChildren(tr);
            if (
                rowHeight === 0 &&
                firstChild &&
                (firstChild.tagName === 'TH' || firstChild.tagName === 'TD')
            ) {
                rowHeight = firstChild.getBoundingClientRect().height;
            } else if (rowHeight !== 0 && !firstChild) {
                rowHeight = 0;
            }
            return {
                height: `${rowHeight}px`,
                cells,
            };
        }),
    };
};
