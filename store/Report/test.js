// @flow
import reportReducer from './reducers';
import { startFetchingTable, doneFetchingTable, setTableError } from './actions';
import { getTableMeta, isTableFetching, tableHasError, getParams } from './selectors';

describe('Report reducer', () => {
    it('start fetching table data', () => {
        const initialState = {
            table: {
                isFetching: false,
                hasError: false,
                meta: { a: 1 },
            },
            params: {
                a: 1,
                b: 1,
            },
        };

        expect(reportReducer(initialState, startFetchingTable({ a: 2 }))).toEqual({
            params: {
                a: 2,
                b: 1,
            },
            table: {
                isFetching: true,
                hasError: false,
                meta: { a: 1 },
            },
        });
    });

    it('handles done fetching table data', () => {
        const initialState = {
            table: {
                isFetching: true,
                hasError: false,
                meta: {
                    a: 1,
                    b: 1,
                },
            },
            params: {
                a: 1,
                b: 1,
            },
        };

        expect(
            reportReducer(initialState, doneFetchingTable({ b: 2 }, { a: 2 }))
        ).toEqual({
            params: {
                a: 1,
                b: 2,
            },
            table: {
                isFetching: false,
                hasError: false,
                meta: {
                    a: 2,
                    b: 1,
                },
            },
        });
    });

    it('handles error while fetching table data', () => {
        const initialState = {
            params: {},
            table: {
                isFetching: true,
                hasError: false,
                meta: {},
            },
        };

        expect(reportReducer(initialState, setTableError())).toEqual({
            params: {},
            table: {
                isFetching: false,
                hasError: true,
                meta: {},
            },
        });
    });
});

describe('Report selectors', () => {
    it('getTableMeta()', () => {
        const state = {
            report: {
                table: {
                    meta: { a: 1 },
                },
            },
        };
        expect(getTableMeta(state)).toEqual({
            a: 1,
            categories: [],
            countries: {},
            countryCategories: [],
        });
    });

    it('isTableFetching()', () => {
        const state = {
            report: {
                table: {
                    isFetching: true,
                },
            },
        };
        expect(isTableFetching(state)).toEqual(true);
    });

    it('tableHasError()', () => {
        const state = {
            report: {
                table: { hasError: true },
            },
        };
        expect(tableHasError(state)).toEqual(true);
    });

    it('getParams()', () => {
        const state = {
            report: {
                params: {
                    a: 1,
                    pageSize: '1',
                    pageIndex: '2',
                },
            },
        };
        expect(getParams(state)).toEqual({
            a: 1,
            pageSize: 1,
            pageIndex: 2,
        });

        expect(getParams({ report: { params: {} } })).toEqual({
            pageSize: null,
            pageIndex: null,
        });
    });
});
