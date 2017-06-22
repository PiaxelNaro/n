// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Table, { AATableRow, StyledTable, BaseTable } from '.';

describe('<AATableRow />', () => {
    it('render table row with sub columns and combined columns', () => {
        const keyGroups = [['a'], ['b', 'c'], ['d'], ['e', 'f']];
        const item = {
            a: '#1',
            b: '#2',
            c: '#3',
            d: '#4',
            e: '#5',
            f: '#6',
        };

        expect(
            shallow(<AATableRow keyGroups={keyGroups} item={item} height="18px" />)
        ).toMatchSnapshot();
    });

    it('allows passing formatters to render cells', () => {
        const aFormatter = jest.fn(() => 'b');
        const keyGroups = [['a']];
        const item = { a: 'a' };
        const formatters = { a: aFormatter };

        const row = shallow(
            <AATableRow
                keyGroups={keyGroups}
                item={item}
                formatters={formatters}
                height="18px"
            />
        );
        expect(aFormatter).toHaveBeenCalledWith('a');
        expect(row.find('td').text()).toEqual('b');
    });
});

describe('<BaseTable />', () => {
    // Non-normalized columns, the Table component handles that itself.
    const columns = [
        { key: 'a', label: 'First' },
        { keys: ['b', 'c'], label: 'Second' },
        {
            label: 'Multi col',
            subColumns: [{ key: 'd', label: 'Foo' }, { keys: ['e', 'f'], label: 'Bar' }],
        },
    ];

    const items = [
        {
            a: '1a',
            b: '2b',
            c: '3c',
            d: '4d',
            e: '5e',
            f: '6f',
        },
        {
            a: '1a',
            b: '2b',
            c: '3c',
            d: '4d',
            e: '5e',
            f: '6f',
        },
    ];

    it('renders base table', () => {
        const sortSpy = jest.fn();
        const table = shallow(
            <BaseTable
                columns={columns}
                items={items}
                onSort={sortSpy}
                sortedBy={{ key: 'a', dir: 'asc' }}
                formatters={{}}
            />
        );
        expect(table).toMatchSnapshot();

        expect(table.find('TableHeader').prop('onSort')).toBe(sortSpy);
    });

    it('triggers scroll events', () => {
        global.requestAnimationFrame = jest.fn();
        const scrollSpy = jest.fn();
        const table = shallow(
            <BaseTable columns={columns} items={items} onScroll={scrollSpy} />
        );
        // Emulate table mounting without tableScroller ref
        const inst: any = table.instance();
        table.find('Table__TableScroll').prop('innerRef')(undefined);
        inst.componentDidMount();
        table.update();

        // Emulate table mounting with scroll ref binding
        const tableScrollRef: any = {
            querySelector: jest.fn(() => null),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };
        table.find('Table__TableScroll').prop('innerRef')(tableScrollRef);
        inst.componentDidMount();
        table.update();

        // Manually trigger a horizontal scroll event on the table scroll
        tableScrollRef.scrollLeft = 10;
        tableScrollRef.addEventListener.mock.calls[0][1]();
        expect(scrollSpy).toHaveBeenCalledWith(10);

        // An async scroll event might be triggered after the BaseTable is unmounted, test edge
        // case handling
        table.find('Table__TableScroll').prop('innerRef')(undefined);
        tableScrollRef.addEventListener.mock.calls[0][1]();
        inst.componentWillUnmount();
    });

    it('triggers resize events', () => {
        global.requestAnimationFrame = jest.fn();
        const resizeSpy = jest.fn();
        const table = shallow(
            <BaseTable columns={columns} items={items} onResize={resizeSpy} />
        );

        const firstChild = {
            tagName: 'TH',
            offsetWidth: 45,
            getBoundingClientRect: () => ({
                height: 18,
            }),
        };
        const tableRef: any = {
            offsetWidth: 800,
            querySelectorAll: jest.fn(() => [
                {
                    parentNode: {
                        tagName: 'THEAD',
                    },
                    children: [
                        firstChild,
                        { offsetWidth: 60 },
                        { offsetWidth: 80 },
                        { offsetWidth: 45 },
                        { offsetWidth: 60 },
                        { offsetWidth: 80 },
                    ],
                    getBoundingClientRect: () => ({
                        height: 18,
                    }),
                },
                {
                    parentNode: {
                        tagName: 'THEAD',
                    },
                    children: [firstChild],
                    getBoundingClientRect: () => ({
                        height: 18,
                    }),
                },
                {
                    parentNode: {
                        tagName: 'TBODY',
                    },
                    children: [
                        {
                            tagName: 'TD',
                            getBoundingClientRect: () => ({
                                height: 20,
                            }),
                        },
                    ],
                    getBoundingClientRect: () => ({
                        height: 20,
                    }),
                },
            ]),
        };
        table.find('Table__StyledTable').prop('innerRef')(tableRef);

        const tableScrollerRef: any = {
            querySelector: jest.fn(() => tableRef),
            getBoundingClientRect: () => ({
                width: 600,
            }),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };
        table.find('Table__TableScroll').prop('innerRef')(tableScrollerRef);

        // Emulate table mounting
        const inst: any = table.instance();
        inst.componentDidMount();
        inst.componentDidUpdate();
        table.update();

        expect(resizeSpy).toHaveBeenCalledWith({
            rows: [
                {
                    cells: [
                        { width: '45px' },
                        { width: '60px' },
                        { width: '80px' },
                        { width: '45px' },
                        { width: '60px' },
                        { width: '80px' },
                    ],
                    height: '18px',
                },
                {
                    cells: [{ width: '45px' }],
                    height: '18px',
                },
                { cells: [], height: '20px' },
            ],
            width: '800px',
            scrollerWidth: '600px',
        });

        inst.componentWillUnmount();
    });
});

describe('<Table />', () => {
    // Non-normalized columns, the Table component handles that itself.
    const columns = [
        { key: 'a', label: 'First' },
        { keys: ['b', 'c'], label: 'Second' },
        {
            label: 'Multi col',
            subColumns: [{ key: 'd', label: 'Foo' }, { keys: ['e', 'f'], label: 'Bar' }],
        },
    ];

    const items = [
        {
            a: '1a',
            b: '2b',
            c: '3c',
            d: '4d',
            e: '5e',
            f: '6f',
        },
        {
            a: '1a',
            b: '2b',
            c: '3c',
            d: '4d',
            e: '5e',
            f: '6f',
        },
    ];

    const sizeMatrix = {
        rows: [
            {
                cells: [
                    { width: '45px' },
                    { width: '60px' },
                    { width: '80px' },
                    { width: '45px' },
                    { width: '60px' },
                    { width: '80px' },
                ],
                height: '18px',
            },
            { cells: [], height: '18px' },
            { cells: [], height: '18px' },
        ],
        width: '800px',
    };

    it('render the styled table element', () => {
        const table = shallow(
            <StyledTable
                cellAlignment={['left', 'left', 'left', 'left', 'left', 'left']}
            />
        );
        expect(table).toMatchSnapshot();
    });

    it('renders fixed layout over the base table size matrix', () => {
        const table = shallow(<Table fixedColumns={1} columns={columns} items={items} />);
        table.find('BaseTable').prop('onResize')(sizeMatrix);

        // After BaseTable mount, the table will render the fixed layout.
        expect(table.find('Table__FixedSidebar').length).toEqual(2);
        expect(table.find('Table__FixedHeader').length).toEqual(1);
        expect(table).toMatchSnapshot();

        // The table won't re-render if the size matrix stayed the same.
        table.find('BaseTable').prop('onResize')(sizeMatrix);
    });

    it('sync the table scroll position and the fixed header', () => {
        const table = shallow(<Table fixedColumns={1} columns={columns} items={items} />);
        table.find('BaseTable').prop('onResize')(sizeMatrix);

        // Setup fake reference to the fixed header
        const fixedHeaderRef = {
            firstChild: global.document.createElement('div'),
        };
        table.find('Table__FixedHeader').prop('innerRef')(fixedHeaderRef);

        // Manually trigger a horizontal scroll event on the table scroll
        table.find('BaseTable').prop('onScroll')(10);
        expect(fixedHeaderRef.firstChild.scrollLeft).toEqual(10);

        table.find('BaseTable').prop('onScroll')(30);
        expect(fixedHeaderRef.firstChild.scrollLeft).toEqual(30);
    });

    it('fixed header to match page vertical scroll position', () => {
        const document = global.document;
        global.requestAnimationFrame = jest.fn();
        document.addEventListener = jest.fn();
        const table = shallow(<Table fixedColumns={1} columns={columns} items={items} />);

        const tableRef: any = {};
        table.find('BaseTable').prop('innerRef')(tableRef);
        table.find('BaseTable').prop('onResize')(sizeMatrix);
        const inst: any = table.instance();
        inst.componentDidMount();
        table.update();

        const fixedHeaderRef = {
            firstChild: document.createElement('div'),
            classList: {
                add: jest.fn(),
                remove: jest.fn(),
            },
        };
        table.find('Table__FixedHeader').prop('innerRef')(fixedHeaderRef);

        // Manually trigger a document scroll to exercise the sticky header
        tableRef.getBoundingClientRect = jest.fn(() => ({
            top: -20,
            bottom: 120,
        }));
        document.body.scrollTop = 20;
        document.addEventListener.mock.calls[0][1]();
        global.requestAnimationFrame.mock.calls[0][0]();
        expect(fixedHeaderRef.classList.add).toHaveBeenCalledWith('is-fixed');

        tableRef.getBoundingClientRect = jest.fn(() => ({
            top: 20,
            bottom: 120,
        }));
        document.body.scrollTop = 21;
        document.addEventListener.mock.calls[0][1]();
        global.requestAnimationFrame.mock.calls[1][0]();
        expect(fixedHeaderRef.classList.remove.mock.calls[0][0]).toEqual('is-fixed');

        tableRef.getBoundingClientRect = jest.fn(() => ({
            top: -20,
            bottom: -10,
        }));
        document.body.scrollTop = 22;
        document.addEventListener.mock.calls[0][1]();
        global.requestAnimationFrame.mock.calls[2][0]();
        expect(fixedHeaderRef.classList.remove.mock.calls[1][0]).toEqual('is-fixed');

        // Test unmounting
        inst.componentWillUnmount();
    });

    it('ensure type safety of view DOM', () => {
        const table = shallow(<Table fixedColumns={1} columns={columns} items={items} />);
        const inst: any = table.instance();

        inst.documentScrollWatcher();
        inst.tableScrollWatcher(0);
        inst.componentDidMount();
        inst.componentWillUnmount();
    });
});
