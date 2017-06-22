// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, select, date } from '@kadira/storybook-addon-knobs';
import moment from 'moment';
import WeekRangePicker from './WeekRangePicker';
import { _DatePicker as DatePicker } from './DatePicker';
import mockI18n from '../../modules/i18n/mockI18n';

class DatePickerExample extends React.Component {
    props: {
        granularity: string,
    };

    onDateSelected: Function;

    constructor() {
        super();

        this.state = {
            startDate: moment().startOf('week'),
            endDate: moment().endOf('week'),
        };

        this.onDateSelected = this.onDateSelected.bind(this);
    }

    onDateSelected(startDate, endDate) {
        this.setState({ startDate, endDate });
    }

    render() {
        return (
            <DatePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDateSelected={this.onDateSelected}
                granularity={this.props.granularity}
                i18n={mockI18n}
            />
        );
    }
}

storiesOf('Date Pickers', module)
    .addDecorator(withKnobs)
    .add('Date Picker', () =>
        <DatePickerExample
            granularity={select(
                'Granularity',
                {
                    WeekRange: 'Week Range',
                    Week: 'Week',
                },
                'WeekRange'
            )}
        />
    )
    .add('Week Range Picker', () =>
        <WeekRangePicker
            onDateSelected={action('Selected dates')}
            currentStartDate={moment(date('Start Date', null)).utc()}
            currentEndDate={moment(date('End Date', null)).utc()}
        />
    );
