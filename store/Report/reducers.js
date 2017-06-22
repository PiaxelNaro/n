// @flow
import { handleActions } from 'redux-actions';
import * as reportAction from './actions';

const report: any = reportAction;

export default handleActions(
    {
        [report.startFetchingTable]: (state, action) => ({
            ...state,
            table: {
                ...state.table,
                isFetching: true,
            },
            params: {
                ...state.params,
                ...action.payload,
            },
        }),
        [report.doneFetchingTable]: (state, action) => ({
            ...state,
            table: {
                ...state.table,
                isFetching: false,
                meta: {
                    ...state.table.meta,
                    ...action.payload.meta,
                },
            },
            params: {
                ...state.params,
                ...action.payload.params,
            },
        }),
        [report.setTableError]: state => ({
            ...state,
            table: {
                ...state.table,
                isFetching: false,
                hasError: true,
            },
        }),
    },
    {
        table: {
            isFetching: false,
            hasError: false,
            meta: {},
        },
        params: {},
    }
);
