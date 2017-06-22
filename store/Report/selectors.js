// @flow
import { createSelector } from 'reselect';
import moment from 'moment';

export const getTableMeta = createSelector(
    state => state.report.table.meta,
    meta =>
        Object.assign(
            {
                countryCategories: [],
                countries: {},
                categories: [],
            },
            meta
        )
);
export const isTableFetching = (state: Object) => state.report.table.isFetching;
export const tableHasError = (state: Object) => state.report.table.hasError;
export const getParams = (state: Object) => {
    const params = state.report.params;
    const pageIndex = Number(params.pageIndex);
    const pageSize = Number(params.pageSize);
    return {
        ...params,
        pageIndex: isNaN(pageIndex) ? null : pageIndex,
        pageSize: isNaN(pageSize) ? null : pageSize,
    };
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const getDateRange = createSelector(
    state => state.report.params.date,
    date => ({
        startDate: moment(date, DATE_FORMAT),
        endDate: moment(date, DATE_FORMAT).add(7, 'days'),
    })
);

export const getSortedBy = createSelector(
    state => state.report.params,
    params => ({
        key: params.orderBy,
        dir: params.orderType,
    })
);
