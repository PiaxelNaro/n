// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { normalizeColumn } from './utils';
import TableHeader, { HeaderCell, HeaderCellContent } from './TableHeader';

describe('<HeaderCell>', () => {
    it('can be sortable', () => {
        const spy = jest.fn();
        const cell = shallow(
            <HeaderCell onSort={spy} sortDirection="desc">
                Content
            </HeaderCell>
        );

        expect(cell).toMatchSnapshot();

        cell.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('can handle layout properties', () => {
        expect(
            shallow(
                <HeaderCell colSpan={2} rowSpan={2} style={{ width: '30px' }}>
                    Content
                </HeaderCell>
            )
        ).toMatchSnapshot();
    });
});

describe('<HeaderCellContent />', () => {
    it('renders label', () => {
        expect(shallow(<HeaderCellContent label="Lorem ipsum." />)).toMatchSnapshot();
    });

    it('renders label and tooltip', () => {
        expect(
            shallow(
                <HeaderCellContent
                    label="Lorem ipsum."
                    tooltip="Lorem ipsum dolor sit."
                />
            )
        ).toMatchSnapshot();
    });
});

describe('<TableHeader />', () => {
    const columns = [
        { key: 'bar', label: 'Bar' },
        {
            label: 'Foo',
            subColumns: [
                { key: 'foo1', label: 'Foo 1' },
                { key: 'foo2', label: 'Foo 2' },
            ],
        },
    ].map(normalizeColumn);

    it('renders multi level table header', () => {
        const header = shallow(<TableHeader columns={columns} />);
        expect(header).toMatchSnapshot();
    });

    it('renders fixed size header', () => {
        const matrix = {
            rows: [
                {
                    height: '1px',
                    cells: [{ width: '2px' }, { width: '3px' }],
                },
                {
                    height: '4px',
                    cells: [{ width: '5px' }, { width: '6px' }],
                },
            ],
        };

        const header = shallow(<TableHeader columns={columns} sizeMatrix={matrix} />);
        expect(header).toMatchSnapshot();
    });

    it('handles sorting', () => {
        const sortableColumns = [
            { key: 'bar', label: 'Bar', isSortable: true },
            {
                label: 'Foo',
                subColumns: [
                    { key: 'foo1', label: 'Foo 1', isSortable: true },
                    { key: 'foo2', label: 'Foo 2', isSortable: true },
                ],
            },
        ].map(normalizeColumn);

        const spy = jest.fn();
        let header = shallow(
            <TableHeader
                columns={sortableColumns}
                onSort={spy}
                sortedBy={{ key: 'bar', dir: 'asc' }}
            />
        );

        const cells = header.find('HeaderCell');

        cells.at(0).prop('onSort')();
        expect(spy.mock.calls[0]).toEqual(['bar', 'desc']);

        cells.at(2).prop('onSort')();
        expect(spy.mock.calls[1]).toEqual(['foo1', 'asc']);

        // Test with desc direction:
        header = shallow(
            <TableHeader
                columns={sortableColumns}
                onSort={spy}
                sortedBy={{ key: 'bar', dir: 'desc' }}
            />
        );
        header.find('HeaderCell').at(0).prop('onSort')();
        expect(spy.mock.calls[2]).toEqual(['bar', 'asc']);
    });
});
