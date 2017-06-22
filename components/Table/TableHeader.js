// @flow
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';
import classnames from 'classnames';
import FlexGrid from '../FlexGrid';
import SortIndicator from '../SortIndicator';
import { type Column, getColumnColSpan, getColumnRowSpan } from './utils';
import Tooltip from '../Overlay/Tooltip';

export type SortingRule = { key?: string, dir?: 'asc' | 'desc' | null };

const borderStyle = '1px solid #D9DCDF';
const Th = styled.th`
    border: ${borderStyle};

    &:first-child {
        border-left: none;
    }

    &:last-child {
        border-right: none;
    }

    &.isSortable {
        cursor: pointer;
    }

    &.isSortable:hover,
    &.isSortable:focus {
        background-color: #f9f9f9;
    }
`;

const TableHead = styled.thead`
    background: #efefef;
    font-weight: bold;
    color: #000;
`;

const HeaderCell = ({
    children,
    onSort,
    sortDirection,
    colSpan = 1,
    rowSpan = 1,
    style,
    align = 'left',
}: {
    children?: any,
    onSort?: ?() => any,
    sortDirection?: 'asc' | 'desc' | null,
    colSpan?: number,
    rowSpan?: number,
    style?: any,
    align?: 'left' | 'center' | 'right',
}) => {
    const isSortable = Boolean(onSort);

    let sortIcon;
    if (isSortable) {
        sortIcon = (
            <FlexGrid.Item flex={0}>
                <SortIndicator direction={sortDirection} />
            </FlexGrid.Item>
        );
    }
    return (
        <Th
            onClick={onSort}
            colSpan={colSpan}
            rowSpan={rowSpan}
            style={style}
            className={classnames({ isSortable })}
        >
            <FlexGrid gutter="4px">
                <FlexGrid.Item
                    style={{
                        textAlign: align,
                    }}
                    flex={1}
                >
                    {children}
                </FlexGrid.Item>
                {sortIcon}
            </FlexGrid>
        </Th>
    );
};

const HeaderCellContent = ({ label, tooltip }: { label: any, tooltip?: any }) => {
    if (!tooltip) {
        return <span>{label}</span>;
    }
    return <Tooltip content={tooltip}>{label}</Tooltip>;
};

const TableHeader = ({
    columns,
    sizeMatrix,
    onSort = noop,
    sortedBy = {},
}: {
    columns: Array<Column>,
    sizeMatrix?: Object,
    onSort?: (string, string) => any,
    sortedBy?: SortingRule,
}) => {
    const getRowStyle = rowIndex => {
        if (sizeMatrix) {
            return { height: sizeMatrix.rows[rowIndex].height };
        }

        return {};
    };

    const getCellStyle = (rowIndex, cellIndex) => {
        if (sizeMatrix) {
            return { width: sizeMatrix.rows[rowIndex].cells[cellIndex].width };
        }

        return {};
    };

    const handleClick = key => {
        if (key !== sortedBy.key) {
            onSort(key, 'asc');
        } else {
            onSort(key, sortedBy.dir === 'asc' ? 'desc' : 'asc');
        }
    };

    const subColumns = columns.reduce((m, col) => m.concat(col.subColumns), []);

    return (
        <TableHead>
            {[columns, subColumns].map((cells, rowIndex) =>
                <tr style={getRowStyle(rowIndex)} key={rowIndex}>
                    {cells.map((col, cellIndex) =>
                        <HeaderCell
                            key={col.key}
                            align={col.headerAlign}
                            colSpan={getColumnColSpan(col)}
                            rowSpan={getColumnRowSpan(col)}
                            style={getCellStyle(rowIndex, cellIndex)}
                            onSort={
                                col.isSortable ? handleClick.bind(null, col.key) : null
                            }
                            sortDirection={col.key === sortedBy.key ? sortedBy.dir : null}
                        >
                            <HeaderCellContent label={col.label} tooltip={col.tooltip} />
                        </HeaderCell>
                    )}
                </tr>
            )}
        </TableHead>
    );
};

export default TableHeader;
export { HeaderCell, HeaderCellContent };
