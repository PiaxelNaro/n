// @flow
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import styled from 'styled-components';
import { type Column } from './utils';

const TableGuide = styled.tbody`
    height: 0;

    .table-hide {
        border: none;
        padding: 0;
    }
`;

const SIZE_MAP = {
    auto: {
        weight: 0,
        minWidth: 'auto',
    },
    extraSmall: {
        weight: 0.6,
        minWidth: '60px',
    },
    small: {
        weight: 0.8,
        minWidth: '80px',
    },
    medium: {
        weight: 1.2,
        minWidth: '120px',
    },
    large: {
        weight: 2.6,
        minWidth: '260px',
    },
    extraLarge: {
        weight: 4,
        minWidth: '400px',
    },
};

const TableSizeGuide = ({ columns }: { columns: Array<Column> }) => {
    const sizes = columns.reduce((m, column) => {
        if (column.subColumns.length) {
            return m.concat(...column.subColumns.map(({ size }) => size));
        }
        return m.concat(column.size);
    }, []);
    const totalWeight = sizes.reduce((m, size) => m + SIZE_MAP[size].weight, 0);

    return (
        <TableGuide>
            <tr className="table-hide">
                {sizes.map((size, i) => {
                    const perc = SIZE_MAP[size].weight / totalWeight * 100;
                    return (
                        <td
                            className="table-hide"
                            key={i}
                            style={{
                                width: perc > 0 ? `${perc}%` : 'auto',
                                minWidth: SIZE_MAP[size].minWidth,
                            }}
                        />
                    );
                })}
            </tr>
        </TableGuide>
    );
};

export default TableSizeGuide;
