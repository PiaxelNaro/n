import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, number } from '@kadira/storybook-addon-knobs';
import Table from '.';
import tableData from '../../data/table-1';
import apps from '../../data/apps';

const injectRandomApp = items =>
    items.map(data => {
        const installedApps = [];
        while (installedApps.length < 10 && Math.random() < 0.7) {
            installedApps.push(apps[Math.floor(Math.random() * apps.length)]);
        }

        let appDiff = Math.floor(Math.random() * 10) - installedApps.length;
        if (appDiff > 0) {
            appDiff = `+${appDiff}`;
        } else if (appDiff === 0) {
            appDiff = '=';
        }

        return {
            ...data,
            installed_apps_icons: installedApps.map(({ icon }) => icon),
            installed_apps_count: installedApps.length,
            installed_apps_count_diff: appDiff,
        };
    });

const demoData = injectRandomApp(tableData);

const columns = [
    {
        label: 'First Name',
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, officiis.',
        key: 'first_name',
        isSortable: true,
        align: 'right',
    },
    {
        label: 'Last Name',
        key: 'last_name',
        isSortable: true,
        align: 'center',
    },
    {
        label: 'Email',
        key: 'email',
        isSortable: true,
        align: 'right',
    },
    {
        label: 'Installed Apps',
        subColumns: [
            {
                label: 'Apps',
                tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                key: 'installed_apps_icons',
                isSortable: true,
                size: 'large',
                align: 'right',
            },
            {
                label: 'Count',
                tooltip: 'Lorem ipsum dolor sit amet, consectetur.',
                keys: ['installed_apps_count', 'installed_apps_count_diff'],
                isSortable: true,
                size: ['medium', 'auto'],
                align: ['center', 'left'],
            },
        ],
    },
    {
        label: 'Country',
        keys: ['country', 'ip_address'],
        isSortable: true,
        size: 'auto',
    },
];
const simpleColumns = [
    {
        label: 'First Name',
        tooltip: 'Lorem ipsum dolor.',
        key: 'first_name',
        isSortable: true,
    },
    {
        label: 'Last Name',
        tooltip: 'Lorem ipsum dolor sit.',
        key: 'last_name',
        isSortable: true,
    },
    {
        label: 'Email',
        key: 'email',
        isSortable: true,
    },
    {
        label: 'Installed Apps',
        key: 'installed_apps_icons',
    },
    {
        label: 'Country',
        keys: ['country', 'ip_address'],
        isSortable: true,
        size: 'auto',
    },
];

const formatters = {
    installed_apps_icons: icons =>
        icons.map(icon => (
            <img key={Math.random()} src={icon} height="40px" width="40px" alt="" />
        )),
};

class Demo extends React.Component {
    onSort: Function;
    props: {
        simple: Boolean,
    };

    constructor() {
        super();

        this.state = {
            sortBy: {
                key: 'first_name',
                dir: 'asc',
            },
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(key, dir) {
        action('sort by')(key, dir);
        this.setState({
            sortBy: { key, dir },
        });
    }

    render() {
        return (
            <div>
                <div style={{ height: '50px' }} />
                <Table
                    fixedColumns={number('Number of fixed columns', 1)}
                    items={demoData}
                    onSort={this.onSort}
                    sortedBy={this.state.sortBy}
                    columns={this.props.simple ? simpleColumns : columns}
                    formatters={formatters}
                />
                <div style={{ height: '3000px' }} />
            </div>
        );
    }
}

storiesOf('Table', module)
    .addDecorator(withKnobs)
    .add('Sticky header and columns', () => <Demo />)
    .add('Simple header demo', () => <Demo simple />);
