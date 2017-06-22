// @flow
import fetchIntelligenceMarkettingAdvertiser from './table_data';
import * as api from '../../../api';

const authFetch: any = api.authFetch;

jest.mock('../../../api', () => ({
    authFetch: jest.fn(),
    checkStatus: r => r,
    parseJSON: r => r,
}));

const fakeData = {
    data: {
        available: true,
        summary: '33 results',
        table: {
            showFloatingHeader: true,
            columns: [
                [['#', '', [null]], 'sort_number', 'sort_order', false, null],
                [['Advertiser App', '', [null]], 'app_v2', 'advertiser', false, null],
                [
                    [
                        'Ad Platforms',
                        'Number of ad platforms which the app was advertised on during the selected period.',
                        [null],
                    ],
                    'text_with_networks',
                    'network_count',
                    false,
                    null,
                ],
                [
                    [
                        'Apps Seen In',
                        'Number of publishers which showed the app advertisements from the advertiser app across the selected ad platform during the selected period.',
                        [null],
                    ],
                    'text_with_publishers',
                    'pub_count',
                    false,
                    null,
                ],
                [
                    [
                        'Creatives',
                        'Number of unique creatives observed for this advertiser app across the selected ad platform during the selected period. Click the number to see creatives filtered by this advertiser app.',
                        [null],
                    ],
                    'text_with_creative',
                    'creative_count',
                    false,
                    null,
                ],
                [
                    [
                        'Share of Network',
                        "The advertiser app's share of impressions across the selected ad platform during the selected period.",
                        [null],
                    ],
                    'percent_with_sparkline',
                    'app_sov',
                    false,
                    null,
                ],
                [
                    [
                        'Publisher Share of Network',
                        'The share of app install impressions, aggregating all apps from this publisher, across the selected ad platform during the selected period.',
                        [null],
                    ],
                    'percent_with_sparkline',
                    'pub_sov',
                    false,
                    null,
                ],
            ],
            sort: {
                current: [2, 'asc'],
                sortAndPaginateByFrontend: false,
                sortByBackend: true,
                columns: [],
            },
            pagination: {
                current: 0,
                page_interval: 100,
                sum: 4,
                page_limits: null,
            },
            rows: [
                [
                    1,
                    [
                        {
                            id: 12,
                            name: 'Messenger',
                            url: 'http://example-app',
                            company_name: 'Facebook',
                            company_url: 'http://example-company',
                            icon: 'http://mock',
                            app_icon_css: 'ios',
                            country_code: 'UK',
                            headerquarters: 'London',
                        },
                    ],
                    [
                        1,
                        [['network 1', 'https://icon'], ['network 2', 'https://icon']],
                        'https://network-count',
                    ],
                    [
                        2,
                        [
                            ['https://icon', 'Facebook', 'ios'],
                            ['https://icon', 'Instagram', 'google-play'],
                        ],
                        'https://pub-count',
                    ],
                    [3, 'https://creative-count'],
                    [4, null, null, { datapoints: ['data 1'] }, 6],
                    [5, null, null, { datapoints: ['data 2'] }, 7],
                ],
            ],
        },
    },
    filters: {
        country: {
            defaults: 'US',
            context: {
                items: [[null, 'Favorites', [['US', 'United States', { isLock: true }]]]],
            },
        },
        category: {
            defaults: 'overall',
            context: [
                ['games', 'Games', [['games/dice', 'Dice']]],
                ['lifestyle', 'Lifestyle'],
            ],
        },
        date: { defaults: '2017-01-01' },
        device: { defaults: 'iphone' },
        granularity: { defaults: 'weekly' },
        network: { defaults: 'admob' },
    },
};

const params = {
    pageSize: 10,
    pageIndex: 0,
    orderBy: 'app_sov',
    orderType: 'desc',
    device: 'iphone',
    country: 'US',
    category: 'overall',
    network: 'admob',
    granularity: 'weekly',
    date: '2017-04-30',
    sortBy: 'value',
};

describe('fetchIntelligenceMarkettingAdvertiser()', () => {
    it('fetch data from server', async () => {
        authFetch.mockImplementation(() => Promise.resolve(fakeData));

        await expect(fetchIntelligenceMarkettingAdvertiser(params)).resolves.toEqual({
            columns: [
                {
                    key: 'sort_order',
                    keys: ['sort_order'],
                    label: '#',
                    tooltip: '',
                    size: 'auto',
                    align: 'center',
                },
                {
                    key: 'advertiser',
                    keys: ['advertiser'],
                    label: 'Advertiser App',
                    tooltip: '',
                    size: 'large',
                    align: 'left',
                },
                {
                    key: 'network_count',
                    keys: ['network_count'],
                    label: 'Ad Platforms',
                    tooltip:
                        'Number of ad platforms which the app was advertised on during the selected period.',
                    isSortable: true,
                    align: 'right',
                },
                {
                    key: 'pub_count',
                    keys: ['pub_count'],
                    label: 'Apps Seen In',
                    tooltip:
                        'Number of publishers which showed the app advertisements from the advertiser app across the selected ad platform during the selected period.',
                    isSortable: true,
                    align: 'right',
                },
                {
                    key: 'creative_count',
                    keys: ['creative_count'],
                    label: 'Creatives',
                    tooltip:
                        'Number of unique creatives observed for this advertiser app across the selected ad platform during the selected period. Click the number to see creatives filtered by this advertiser app.',
                    isSortable: true,
                    align: 'right',
                },
                {
                    key: 'app_sov',
                    keys: ['app_sov_sparkline', 'app_sov_percent', 'app_sov_diff'],
                    label: 'Share of Network',
                    tooltip:
                        "The advertiser app's share of impressions across the selected ad platform during the selected period.",
                    isSortable: true,
                    size: ['small', 'small', 'small'],
                    align: ['center', 'right', 'center'],
                },
                {
                    key: 'pub_sov',
                    keys: ['pub_sov_sparkline', 'pub_sov_percent', 'pub_sov_diff'],
                    label: 'Publisher Share of Network',
                    tooltip:
                        'The share of app install impressions, aggregating all apps from this publisher, across the selected ad platform during the selected period.',
                    isSortable: true,
                    size: ['small', 'small', 'small'],
                    align: ['center', 'right', 'center'],
                },
            ],
            data: [
                {
                    id: 1,
                    advertiser: {
                        id: 12,
                        name: 'Messenger',
                        link: 'http://example-app',
                        icon: 'http://mock',
                        company: 'Facebook',
                        companyLink: 'http://example-company',
                        flagCode: 'UK',
                        flagTitle: 'London',
                        store: 'ios',
                    },
                    app_sov_diff: 6,
                    app_sov_percent: 4,
                    app_sov_sparkline: ['data 1'],
                    creative_count: {
                        count: 3,
                        link: 'https://creative-count',
                    },
                    network_count: {
                        count: 1,
                        link: 'https://network-count',
                        items: [
                            {
                                icon: 'https://icon',
                                name: 'network 1',
                            },
                            {
                                icon: 'https://icon',
                                name: 'network 2',
                            },
                        ],
                    },
                    pub_count: {
                        count: 2,
                        link: 'https://pub-count',
                        items: [
                            {
                                icon: 'https://icon',
                                name: 'Facebook',
                                store: 'ios',
                            },
                            {
                                icon: 'https://icon',
                                name: 'Instagram',
                                store: 'google-play',
                            },
                        ],
                    },
                    pub_sov_diff: 7,
                    pub_sov_percent: 5,
                    pub_sov_sparkline: ['data 2'],
                    sort_order: 1,
                },
            ],
            meta: {
                categories: [
                    {
                        id: 'games',
                        title: 'Games',
                        subList: [
                            {
                                id: 'games/dice',
                                title: 'Dice',
                            },
                        ],
                    },
                    {
                        id: 'lifestyle',
                        title: 'Lifestyle',
                        subList: undefined,
                    },
                ],
                countries: {
                    US: {
                        code: 'US',
                        name: 'United States',
                        isLocked: true,
                    },
                },
                countryCategories: [
                    {
                        name: 'Favorites',
                        countries: ['US'],
                    },
                ],
                pageTotal: 4,
            },
            params: {
                category: 'overall',
                country: 'US',
                date: '2017-04-30',
                device: 'iphone',
                granularity: 'weekly',
                network: 'admob',
                orderBy: 'app_sov',
                orderType: 'desc',
                pageIndex: 0,
                pageSize: 100,
                sortBy: 'value',
            },
            summary: '33 results',
        });
    });
});
