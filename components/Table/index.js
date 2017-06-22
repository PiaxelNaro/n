// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import isEqual from 'lodash/isEqual';
import identity from 'lodash/identity';
import noop from 'lodash/noop';
import classnames from 'classnames';
import { scrollAggregator, resizeAggregator } from '../../modules/eventAggregator';
import {
    type LooseColumn,
    type Column,
    createSizeMatrix,
    normalizeColumn,
} from './utils';
import TableSizeGuide from './TableSizeGuide';
import TableHeader, { type SortingRule } from './TableHeader';

type FormatterMap = { [string]: (any) => any };
type TableSizeMatrix = {
    width: string,
    scrollerWidth: string,
    rows: Array<{ height: string, cells: Array<{ width: string }> }>,
};

const borderStyle = '1px solid #D9DCDF';
const StyledTable = styled.table`
    min-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 13px;
    text-align: left;
    color: #666;

    td,
    th {
        padding: 6px;
        box-sizing: border-box;
        border-bottom: ${borderStyle};
    }

    td + td {
        border-left: ${borderStyle};
    }

    ${props =>
        props.cellAlignment.map(
            (align, index) => css`
                td:nth-child(${index + 1}) {
                    text-align: ${align};
                }
            `
        )}

    .combined-column {
        border-left: none;
    }
`;

const TableBody = styled.tbody`
    background: #fff;
`;

const TableWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const TableScroll = styled.div`
    display: block;
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
`;

const FixedHeader = styled.div`
    position: absolute;
    top: 0;
    &.is-fixed {
        position: fixed;
    }
`;

const ScrollTableWrapper = styled.div`
    overflow: hidden;
`;

const FixedSidebar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    table {
        border-right: ${borderStyle};
        border-bottom: none;
    }
`;

const getKeyGroupsFromColumns = (columns: Array<Column>): Array<Array<string>> =>
    columns.reduce(
        (m, col) => m.concat(col.subColumns.map(({ keys }) => keys), [col.keys]),
        []
    );

const getFormatter = (formatters: FormatterMap, key: string) =>
    formatters[key] || identity;

function getCellAlignment(columns: Array<Column>): Array<string> {
    return columns.reduce(
        (memory, column) =>
            memory.concat(
                column.align,
                column.subColumns.reduce(
                    (subMemory, subCol) => subMemory.concat(subCol.align),
                    []
                )
            ),
        []
    );
}

const AATableRow = ({
    item,
    keyGroups,
    height,
    formatters = {},
}: {
    item: Object,
    keyGroups: Array<Array<string>>,
    height?: ?string,
    formatters?: FormatterMap,
}) =>
    <tr style={{ height }}>
        {keyGroups.map(keys =>
            keys.map((key, keyIndex) =>
                <td key={key} className={classnames({ 'combined-column': keyIndex > 0 })}>
                    {getFormatter(formatters, key)(item[key])}
                </td>
            )
        )}
    </tr>;

class BaseTable extends React.PureComponent {
    props: {
        columns: Array<LooseColumn>,
        items: Array<Object>,
        onSort?: (string, string) => any,
        sortedBy?: SortingRule,
        formatters?: FormatterMap,
        innerRef: (HTMLElement | void) => any,
        onResize: TableSizeMatrix => any,
        onScroll: number => any,
    };

    tableScroller: HTMLElement;
    tableRef: HTMLElement;
    unsubscribeTableScroll: Function;
    unsubscribeResize: Function;
    generateSizeMatrix: Function;
    handleScroll: Function;

    static defaultProps = {
        innerRef: noop,
        onResize: noop,
        onScroll: noop,
    };

    constructor() {
        super();

        this.unsubscribeTableScroll = this.unsubscribeTableScroll.bind(this);
        this.generateSizeMatrix = this.generateSizeMatrix.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.unsubscribeResize = resizeAggregator(this.generateSizeMatrix);

        this.unsubscribeTableScroll();
        if (this.tableScroller) {
            this.tableScroller.addEventListener('scroll', this.handleScroll);
        }
    }

    componentDidUpdate() {
        this.generateSizeMatrix();
    }

    componentWillUnmount() {
        this.unsubscribeResize();
        this.unsubscribeTableScroll();
    }

    generateSizeMatrix() {
        const sizeMatrix = createSizeMatrix(this.tableScroller);
        this.props.onResize(sizeMatrix);
    }

    handleScroll() {
        if (this.tableScroller) {
            const left = this.tableScroller.scrollLeft;
            this.props.onScroll(left);
        }
    }

    unsubscribeTableScroll() {
        if (this.tableScroller) {
            this.tableScroller.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        const { items, onSort, sortedBy, formatters } = this.props;
        const columns = this.props.columns.map(normalizeColumn);
        const cellAlignment = getCellAlignment(columns);
        const keyGroups = getKeyGroupsFromColumns(columns);

        return (
            <TableScroll
                className="TableScroll"
                innerRef={tableScroller => (this.tableScroller = tableScroller)}
            >
                <StyledTable
                    cellAlignment={cellAlignment}
                    innerRef={tableRef => {
                        this.tableRef = tableRef;
                        this.props.innerRef(tableRef);
                    }}
                >
                    <TableHeader columns={columns} onSort={onSort} sortedBy={sortedBy} />
                    <TableBody>
                        {items.map(item =>
                            <AATableRow
                                key={item.id}
                                item={item}
                                keyGroups={keyGroups}
                                formatters={formatters}
                            />
                        )}
                    </TableBody>
                    <TableSizeGuide columns={columns} />
                </StyledTable>
            </TableScroll>
        );
    }
}

class AATable extends React.Component {
    props: {
        fixedColumns?: number,
        columns: Array<LooseColumn>,
        items: Array<Object>,
        onSort?: (string, string) => any,
        sortedBy?: SortingRule,
        formatters?: FormatterMap,
        innerRef: (HTMLElement | void) => any,
    };

    state: {
        sizeMatrix?: TableSizeMatrix,
    };

    static defaultProps = {
        fixedColumns: 0,
        innerRef: noop,
    };

    documentScrollWatcher: Function;
    tableScrollWatcher: Function;
    tableInnerRef: Function;
    onResize: Function;

    unsubscribeScroll: Function;
    unsubscribeResize: Function;

    fixedHeaderRef: HTMLElement;
    tableRef: HTMLElement;

    constructor() {
        super();

        this.state = {};

        this.documentScrollWatcher = this.documentScrollWatcher.bind(this);
        this.tableScrollWatcher = this.tableScrollWatcher.bind(this);
        this.tableInnerRef = this.tableInnerRef.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    onResize(sizeMatrix: TableSizeMatrix) {
        // Only update state if the matrix changed. This is to prevent an infinite loop we'd
        // have otherwise.
        if (!isEqual(sizeMatrix, this.state.sizeMatrix)) {
            this.setState({ sizeMatrix });
        }
    }

    documentScrollWatcher() {
        if (this.fixedHeaderRef && this.tableRef) {
            const rect = this.tableRef.getBoundingClientRect();
            if (rect.top < 0 && rect.bottom > 0) {
                this.fixedHeaderRef.classList.add('is-fixed');
            } else {
                this.fixedHeaderRef.classList.remove('is-fixed');
            }
        }
    }

    tableScrollWatcher(left: number) {
        if (
            this.fixedHeaderRef &&
            this.fixedHeaderRef.firstChild instanceof HTMLElement
        ) {
            this.fixedHeaderRef.firstChild.scrollLeft = left;
        }
    }

    tableInnerRef(tableRef: HTMLElement) {
        this.tableRef = tableRef;
        this.props.innerRef(tableRef);
    }

    componentDidMount() {
        this.unsubscribeScroll = scrollAggregator(this.documentScrollWatcher);
    }

    componentWillUnmount() {
        this.unsubscribeScroll();
    }

    render() {
        const { items, fixedColumns, onSort, sortedBy, formatters } = this.props;
        const columns = this.props.columns.map(normalizeColumn);
        const cellAlignment = getCellAlignment(columns);

        let fixedLayout;
        const sizeMatrix = this.state.sizeMatrix;
        if (sizeMatrix) {
            const columnsToFix = columns.slice(0, fixedColumns);
            const fixedKeyGroups = getKeyGroupsFromColumns(columnsToFix);
            const sidebarHeader = (
                <TableHeader
                    columns={columnsToFix}
                    sizeMatrix={sizeMatrix}
                    onSort={onSort}
                    sortedBy={sortedBy}
                />
            );
            fixedLayout = [
                <FixedSidebar key="FixedSidebar">
                    <StyledTable cellAlignment={cellAlignment}>
                        {sidebarHeader}
                        <TableBody>
                            {items.map((item, i) =>
                                <AATableRow
                                    key={item.id}
                                    item={item}
                                    keyGroups={fixedKeyGroups}
                                    formatters={formatters}
                                    height={
                                        sizeMatrix.rows[i + 2]
                                            ? sizeMatrix.rows[i + 2].height
                                            : null
                                    }
                                />
                            )}
                        </TableBody>
                    </StyledTable>
                </FixedSidebar>,
                <FixedHeader
                    innerRef={fixedHeaderRef => (this.fixedHeaderRef = fixedHeaderRef)}
                    style={{ width: sizeMatrix.scrollerWidth }}
                    key="FixedHeader"
                >
                    <ScrollTableWrapper>
                        <StyledTable
                            cellAlignment={cellAlignment}
                            style={{ width: sizeMatrix.width }}
                        >
                            <TableHeader
                                columns={columns}
                                sizeMatrix={sizeMatrix}
                                onSort={onSort}
                                sortedBy={sortedBy}
                            />
                        </StyledTable>
                        <FixedSidebar>
                            <StyledTable cellAlignment={cellAlignment}>
                                {sidebarHeader}
                            </StyledTable>
                        </FixedSidebar>
                    </ScrollTableWrapper>
                </FixedHeader>,
            ];
        }

        return (
            <TableWrapper className="TableWrapper">
                <BaseTable
                    innerRef={this.tableInnerRef}
                    onScroll={this.tableScrollWatcher}
                    onResize={this.onResize}
                    columns={this.props.columns}
                    items={this.props.items}
                    onSort={this.props.onSort}
                    sortedBy={this.props.sortedBy}
                    formatters={this.props.formatters}
                />
                {fixedLayout}
            </TableWrapper>
        );
    }
}

export default AATable;
export { AATableRow, StyledTable, BaseTable };
