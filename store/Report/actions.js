// @flow
import { createAction } from 'redux-actions';

export const startFetchingTable = createAction('set fetch state on report.table');
export const doneFetchingTable = createAction(
    'set done state on report.table',
    (params, meta) => ({ params, meta })
);
export const setTableError = createAction('set report.table.error');
