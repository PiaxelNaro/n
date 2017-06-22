// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Table from '../Table';
import AppIcon, { Flag, StoreIcon } from '.';
import flags from '../../data/flags';

storiesOf('AppIcon', module)
    .add('App icon', () => (
        <Table
            columns={[
                {
                    label: 'Store\\Size',
                    key: 'store',
                    isSortable: false,
                },
                {
                    label: 'Small',
                    key: 'small_icon',
                    isSortable: false,
                },
                {
                    label: 'Medium',
                    key: 'medium_icon',
                    isSortable: false,
                },
                {
                    label: 'Big',
                    key: 'big_icon',
                    isSortable: false,
                },
            ]}
            items={[
                {
                    id: 1,
                    store: 'default icon',
                    small_icon: (
                        <AppIcon
                            size="small"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                    medium_icon: (
                        <AppIcon
                            size="medium"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                    big_icon: (
                        <AppIcon
                            size="big"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                },
                {
                    id: 2,
                    store: 'ios icon(has border radius)',
                    small_icon: (
                        <AppIcon
                            size="small"
                            store="ios"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                    medium_icon: (
                        <AppIcon
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                            size="medium"
                            store="ios"
                            showStoreIcon={Boolean(true)}
                        />
                    ),
                    big_icon: (
                        <AppIcon
                            size="big"
                            store="ios"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                },
                {
                    id: 3,
                    store: 'apple tv icon(has border radius)',
                    small_icon: (
                        <AppIcon
                            size="small"
                            store="appletv"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                    medium_icon: (
                        <AppIcon
                            size="medium"
                            store="appletv"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                            showStoreIcon={Boolean(true)}
                        />
                    ),
                    big_icon: (
                        <AppIcon
                            size="big"
                            store="appletv"
                            src="https://static-s.aa-cdn.net/img/ios/284882215/99fcb4b1f586ad70ac5306a99fc60f3a_w80"
                        />
                    ),
                },
                {
                    id: 4,
                    store: 'apple tv icon(nonsquare icon)',
                    small_icon: (
                        <AppIcon
                            size="small"
                            store="appletv"
                            src="https://static-s.aa-cdn.net/img/appletv/50600001008333/c253ddf24ba6f403906f5f816b506879_w80"
                        />
                    ),
                    medium_icon: (
                        <AppIcon
                            size="medium"
                            store="appletv"
                            showStoreIcon={Boolean(true)}
                            src="https://static-s.aa-cdn.net/img/appletv/50600001008333/c253ddf24ba6f403906f5f816b506879_w80"
                        />
                    ),
                    big_icon: (
                        <AppIcon
                            size="big"
                            store="appletv"
                            src="https://static-s.aa-cdn.net/img/appletv/50600001008333/c253ddf24ba6f403906f5f816b506879_w80"
                        />
                    ),
                },
            ]}
        />
    ))
    .add('App store icon', () => {
        const STORE_SET = {
            Android: 'android',
            'Apple TV': 'appletv',
            iBook: 'ibook',
            iOS: 'ios',
            'Google Analytic': 'google-analytic',
            Mac: 'mac',
            'Google Play': 'google-play',
            'Amazon Store': 'amazon-store',
            'Windows Phone': 'windows-phone',
            'Windows Store': 'windows-store',
        };
        const columns = [
            {
                label: 'Store Name',
                key: 'store_name',
                isSortable: false,
            },
            {
                label: 'Type',
                key: 'store_type',
                isSortable: false,
            },
            {
                label: 'Icon',
                key: 'icon',
                isSortable: false,
            },
        ];

        const injectIcon = () =>
            Object.keys(STORE_SET).map(name => ({
                id: STORE_SET[name],
                store_name: name,
                store_type: STORE_SET[name],
                icon: STORE_SET[name],
            }));

        const formatters = {
            icon: type => <StoreIcon type={type} />,
        };
        return <Table items={injectIcon()} columns={columns} formatters={formatters} />;
    })
    .add('Flag icon', () => {
        const columns = [
            {
                label: 'Country Name',
                key: 'country_name',
                isSortable: false,
            },
            {
                label: 'Country Code',
                key: 'country_code',
                isSortable: false,
            },
            {
                label: 'Flag Icon',
                key: 'flag_icon',
                isSortable: false,
            },
        ];

        const injectFlag = () => {
            const flagItems = Object.keys(flags).sort().map(name => ({
                id: name,
                country_name: name,
                country_code: flags[name],
                flag_icon: flags[name],
            }));
            flagItems.unshift({
                id: 'ww',
                country_name: 'world wide',
                country_code: 'ww',
                flag_icon: 'ww',
            });
            return flagItems;
        };
        const formatters = {
            flag_icon: code => <Flag code={code} />,
        };
        return <Table items={injectFlag()} columns={columns} formatters={formatters} />;
    });
