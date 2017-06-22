// @flow
import qs from 'querystring';
import identity from 'lodash/identity';
import { createSelector } from 'reselect';
import * as api from '../../../api';

const getApiUrl = (params: Object) => {
    const query = {
        order_by: params.orderBy,
        order_type: params.orderType,
        sort_by: params.sortBy,
        page_number: params.pageIndex,
        page_size: params.pageSize,
        device: params.device,
        country: params.country,
        category: params.category,
        network: params.network,
        granularity: params.granularity,
        date: params.date,
    };
    return `/ajax/intelligence/marketing/advertisers/table_data/?${qs.stringify(query)}`;
};

const columnSettings = {
    sort_order: {
        size: 'auto',
        align: 'center',
    },
    advertiser: {
        size: 'large',
        align: 'left',
    },
    network_count: {
        isSortable: true,
        align: 'right',
    },
    pub_count: {
        isSortable: true,
        align: 'right',
    },
    creative_count: {
        isSortable: true,
        align: 'right',
    },
    app_sov: {
        keys: ['app_sov_sparkline', 'app_sov_percent', 'app_sov_diff'],
        size: ['small', 'small', 'small'],
        align: ['center', 'right', 'center'],
        isSortable: true,
    },
    pub_sov: {
        keys: ['pub_sov_sparkline', 'pub_sov_percent', 'pub_sov_diff'],
        size: ['small', 'small', 'small'],
        align: ['center', 'right', 'center'],
        isSortable: true,
    },
};

const rowFormatter = {
    advertiser: data => ({
        id: data[0].id,
        name: data[0].name,
        link: data[0].url,
        company: data[0].company_name,
        companyLink: data[0].company_url,
        icon: data[0].icon,
        store: data[0].app_icon_css,
        flagCode: data[0].country_code,
        flagTitle: data[0].headerquarters,
    }),
    network_count: data => ({
        count: data[0],
        link: data[2],
        items: data[1].map(([name, icon]) => ({ name, icon })),
    }),
    pub_count: data => ({
        count: data[0],
        link: data[2],
        items: data[1].map(([icon, name, store]) => ({ name, icon, store })),
    }),
    creative_count: data => ({
        count: data[0],
        link: data[1],
    }),
    app_sov_sparkline: data => data[3].datapoints,
    app_sov_percent: data => data[0],
    app_sov_diff: data => data[4],
    pub_sov_sparkline: data => data[3].datapoints,
    pub_sov_percent: data => data[0],
    pub_sov_diff: data => data[4],
};

const buildCountryMeta = items => {
    const countries = {};
    const categories = [];
    items.forEach(item => {
        categories.push({
            name: item[1],
            countries: item[2].map(row => {
                countries[row[0]] = {
                    code: row[0],
                    name: row[1],
                    isLocked: row[2].isLock,
                };
                return row[0];
            }),
        });
    });

    return { countries, categories };
};

const buildCategoryMeta = items =>
    items.map(item => {
        let subList;
        if (item[2]) {
            subList = item[2].map(sub => ({
                id: sub[0],
                title: sub[1],
            }));
        }

        return {
            id: item[0],
            title: item[1],
            subList,
        };
    });

const fetchIntelligenceMarkettingAdvertiser = createSelector(
    [params => params, (params, req) => req, (params, req, res) => res],
    (params, req, res) =>
        api
            .authFetch(getApiUrl(params), {}, req)
            .then(r => api.checkStatus(r, res, req))
            .then(api.parseJSON)
            .then(r => {
                const columns = r.data.table.columns.map(col => ({
                    label: col[0][0],
                    tooltip: col[0][1],
                    key: col[2],
                    keys: [col[2]],
                    ...columnSettings[col[2]],
                }));

                const categories = buildCategoryMeta(r.filters.category.context);
                const countryPickerMeta = buildCountryMeta(
                    r.filters.country.context.items
                );
                const defaults = {
                    country: r.filters.country.defaults,
                    category: r.filters.category.defaults,
                    date: r.filters.date.defaults,
                    device: r.filters.device.defaults,
                    granularity: r.filters.granularity.defaults,
                    network: r.filters.network.defaults,
                };

                return {
                    summary: r.data.summary,
                    params: {
                        ...defaults,
                        ...params,
                        pageSize: r.data.table.pagination.page_interval,
                        pageIndex: r.data.table.pagination.current,
                    },
                    meta: {
                        pageTotal: r.data.table.pagination.sum,
                        countries: countryPickerMeta.countries,
                        countryCategories: countryPickerMeta.categories,
                        categories,
                    },
                    data: r.data.table.rows.map(row => ({
                        id: row[0],
                        ...columns.reduce((m, col, i) => {
                            col.keys.forEach(key => {
                                const formatter = rowFormatter[key] || identity;
                                // eslint-disable-next-line no-param-reassign
                                m[key] = formatter(row[i]);
                            });
                            return m;
                        }, {}),
                    })),
                    columns,
                };
            })
);

export default (params: Object, req: ?api.NextRequest, res: ?http$ServerResponse) =>
    fetchIntelligenceMarkettingAdvertiser(params, req, res);
