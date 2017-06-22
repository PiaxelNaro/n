import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Table from '../Table'
import AAIcon from '.';

const AAIconList = [
    'aa-caret-down',
    'aa-caret-right',
    'aa-company',
    'aa-connections',
    'aa-home',
    'aa-lock',
    'ad-expense-o',
    'ad-monetization-o',
    'ad-revenue-o',
    'angry',
    'api-o',
    'app-db-o',
    'app-store-views-o',
    'app_estimates',
    'apps-o',
    'audience-int-o',
    'backup-data-o',
    'breadcrumb-arrow',
    'chart_column',
    'chart_line',
    'company-o',
    'compare-apps-o',
    'connections-o',
    'creatives-o',
    'daily-ranks-o',
    'dashboard-o',
    'data-availability-o',
    'data-sharing-o',
    'downloads-o',
    'events-o',
    'exclamation',
    'featured-o',
    'hand-pointer',
    'hourglass-half',
    'in-app-icon',
    'in-app-purchase-o',
    'inapppurchase',
    'index-o',
    'info-circle',
    'info-o',
    'keywords-explorer-o',
    'keywords-o',
    'keywords',
    'learn',
    'mark-check',
    'market-size-o',
    'marketing-int-o',
    'metric_picker',
    'newsfeed',
    'parent-company-o',
    'parent_company',
    'paying-user-o',
    'payment-info-o',
    'pick-your-apps-o',
    'pick-your-companies-o',
    'plus-circle',
    'publisher-o',
    'publisher_app',
    'purchase-history-o',
    'rank-history-o',
    'rating-o',
    'remove',
    'report',
    'revenue-o',
    'reviews-o',
    'right',
    'service-api-o',
    'service-o',
    'small-plus-circle',
    'smile',
    'store-int-o',
    'store-stats-pro-o',
    'subscriptions-o',
    'timeline-o',
    'top-charts-o',
    'top-matrix-o',
    'usage-o',
    'user-o',
    'user-retension-o',
    'users-o',
];

const columns = [
    {
        label: 'Name',
        key: 'name',
    },
    {
        label: 'Icon',
        key: 'icon',
    }
];

const items = AAIconList.map(name => ({
    id: name,
    name,
    icon: <AAIcon name={name} />,
}));

storiesOf('AAIcon', module)
    .add('AAIcon list', () => (
        <Table
            items={items}
            columns={columns}
        />
    ));
