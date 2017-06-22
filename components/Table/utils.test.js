// @flow

import {
    createSizeMatrix,
    getColumnColSpan,
    getColumnRowSpan,
    normalizeColumn,
} from './utils';

describe('getColumnColSpan()', () => {
    it('default to 1', () => {
        const column = normalizeColumn({
            key: 'foo',
        });
        expect(getColumnColSpan(column)).toEqual(1);
    });

    it('returns length of keys', () => {
        const column = normalizeColumn({
            keys: ['foo', 'bar'],
        });
        expect(getColumnColSpan(column)).toEqual(2);
    });

    it('returns length of subcolumn keys', () => {
        const column = normalizeColumn({
            subColumns: [{ key: '1' }, { keys: ['2', '3'] }],
        });
        expect(getColumnColSpan(column)).toEqual(3);
    });
});

describe('getColumnRowSpan()', () => {
    it('returns 2 for column without sub columns', () => {
        const column = normalizeColumn({
            key: 'foo',
        });
        expect(getColumnRowSpan(column)).toEqual(2);
    });

    it('returns 1 for column with sub columns', () => {
        const column = normalizeColumn({
            subColumns: [{ key: '1' }, { key: '2' }],
        });
        expect(getColumnRowSpan(column)).toEqual(1);
    });
});

describe('normalizeColumn()', () => {
    it('normalize simple column', () => {
        expect(
            normalizeColumn({
                key: 'foo',
                label: 'Foo',
            })
        ).toEqual({
            headerAlign: 'left',
            align: ['left'],
            isSortable: false,
            key: 'foo',
            keys: ['foo'],
            label: 'Foo',
            size: ['medium'],
            subColumns: [],
        });
    });

    it('normalize column with sub columns', () => {
        expect(
            normalizeColumn({
                label: 'Foo & Bar',
                subColumns: [
                    {
                        label: 'Foo',
                        keys: ['foo', 'wat'],
                        size: 'large',
                        align: 'center',
                    },
                    {
                        label: 'Bar',
                        keys: ['bar', 'wut'],
                        size: ['auto'],
                        align: 'right',
                    },
                ],
            })
        ).toEqual({
            headerAlign: 'left',
            align: [],
            isSortable: false,
            key: 'foo|wat|bar|wut',
            keys: [],
            label: 'Foo & Bar',
            size: [],
            subColumns: [
                {
                    headerAlign: 'left',
                    isSortable: false,
                    key: 'foo|wat',
                    keys: ['foo', 'wat'],
                    label: 'Foo',
                    size: ['large', 'large'],
                    align: ['center', 'center'],
                    subColumns: [],
                },
                {
                    headerAlign: 'left',
                    isSortable: false,
                    key: 'bar|wut',
                    keys: ['bar', 'wut'],
                    label: 'Bar',
                    size: ['auto', 'medium'],
                    align: ['right', 'right'],
                    subColumns: [],
                },
            ],
        });
    });

    it('normalize column with many keys', () => {
        expect(
            normalizeColumn({
                keys: ['foo', 'bar'],
                label: 'Foo & Bar',
                isSortable: true,
                align: ['left'],
            })
        ).toEqual({
            headerAlign: 'left',
            align: ['left', 'left'],
            isSortable: true,
            key: 'foo|bar',
            keys: ['foo', 'bar'],
            label: 'Foo & Bar',
            size: ['medium', 'medium'],
            subColumns: [],
        });
    });

    it('normalize column without key', () => {
        expect(normalizeColumn({})).toEqual({
            headerAlign: 'left',
            align: [],
            isSortable: false,
            key: '',
            keys: [],
            label: undefined,
            size: [],
            subColumns: [],
        });
    });

    it('normalize column with both key and keys', () => {
        expect(
            normalizeColumn({
                key: 'top-key',
                keys: ['sub-a', 'sub-b'],
            })
        ).toEqual({
            headerAlign: 'left',
            align: ['left', 'left'],
            isSortable: false,
            key: 'top-key',
            keys: ['sub-a', 'sub-b'],
            label: undefined,
            size: ['medium', 'medium'],
            subColumns: [],
        });
    });
});

describe('createSizeMatrix()', () => {
    it('generates a size matrix from a table element', () => {
        const table: any = {
            offsetWidth: 800,
            querySelectorAll: jest.fn(() => [
                {
                    parentNode: {
                        tagName: 'THEAD',
                    },
                    getBoundingClientRect: () => ({
                        height: 0,
                    }),
                    children: [
                        {
                            offsetWidth: 45,
                            tagName: 'TH',
                            getBoundingClientRect: () => ({
                                height: 0,
                            }),
                        },
                        {
                            offsetWidth: 60,
                            tagName: 'TH',
                        },
                        {
                            offsetWidth: 80,
                            tagName: 'TH',
                        },
                    ],
                },
                {
                    parentNode: {
                        tagName: 'TBODY',
                    },
                    getBoundingClientRect: () => ({
                        height: 0,
                    }),
                    children: [
                        {
                            tagName: 'TD',
                            offsetWidth: 45,
                            getBoundingClientRect: () => ({
                                height: 20,
                            }),
                        },
                        {
                            tagName: 'TD',
                            offsetWidth: 45,
                        },
                    ],
                },
                {
                    parentNode: {
                        tagName: 'TBODY',
                    },
                    getBoundingClientRect: () => ({
                        height: 80,
                    }),
                    children: [],
                },
                {
                    parentNode: null,
                    getBoundingClientRect: () => ({
                        height: 0,
                    }),
                    children: [],
                },
            ]),
        };
        const tableScroller: any = {
            querySelector: jest.fn(() => table),
            getBoundingClientRect: () => ({
                width: 600,
            }),
        };
        expect(createSizeMatrix(tableScroller)).toEqual({
            width: '800px',
            scrollerWidth: '600px',
            rows: [
                {
                    cells: [{ width: '45px' }, { width: '60px' }, { width: '80px' }],
                    height: '0px',
                },
                { cells: [], height: '20px' },
                { cells: [], height: '0px' },
                { cells: [], height: '0px' },
            ],
        });
    });

    it('is type safe', () => {
        expect(createSizeMatrix(null)).toEqual({
            width: 'auto',
            scrollerWidth: 'auto',
            rows: [],
        });
    });
});
