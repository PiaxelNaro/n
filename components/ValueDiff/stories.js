import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ValueDiff from '.';
import Table from '../Table';

const formatValueDiff = value => <ValueDiff value={value} type="value" />;
const formatMoneyDiff = value => <ValueDiff value={value} type="value" unit="$" />;
const formatPercDiff = value => <ValueDiff value={value} type="growth" unit="%" />;

storiesOf('ValueDiff', module).add('Types and unit', () => (
    <Table
        columns={[
            {
                key: 'value',
                label: 'Value',
            },
            {
                key: 'perc',
                label: 'Percentage',
            },
            {
                key: 'money',
                label: 'Money',
            },
        ]}
        items={[
            {
                value: 0.2678,
                money: 0.2457,
                perc: 0.2234,
            },
            {
                value: -0.5457,
                money: -5.235,
                perc: -0.1567,
            },
            {
                value: 0,
                money: 0,
                perc: 0,
            },
        ]}
        formatters={{
            value: formatValueDiff,
            money: formatMoneyDiff,
            perc: formatPercDiff,
        }}
    />
));
