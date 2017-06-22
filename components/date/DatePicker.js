// @flow
import React from 'react';
import Head from 'next/head';
import CalendarIcon from 'react-icons/lib/fa/calendar';
import WeekRangePicker from './WeekRangePicker';
import WeekPicker from './WeekPicker';
import Overlay from '../Overlay';
import DropdownButton from '../Button/Dropdown';
import formatDateRange from './util/formatDateRange';
import cssStyle from './style.scss';
import { translate, type I18nType } from '../../modules/i18n';

const DatePickerSwitch = ({
    granularity,
    onDateSelected,
    startDate,
    endDate,
}: {
    startDate: moment$Moment,
    endDate: moment$Moment,
    onDateSelected: (moment$Moment, moment$Moment) => any,
    granularity: string,
}) => {
    let picker;
    switch (granularity) {
        case 'WeekRange':
            picker = (
                <WeekRangePicker
                    onDateSelected={onDateSelected}
                    currentStartDate={startDate}
                    currentEndDate={endDate}
                />
            );
            break;
        case 'Week':
            picker = (
                <WeekPicker
                    onDateSelected={onDateSelected}
                    currentStartDate={startDate}
                    currentEndDate={endDate}
                />
            );
            break;
        default:
            throw new Error(`Invalid granularity "${granularity}" passed to DatePicker`);
    }

    return picker;
};

class DatePicker extends React.Component {
    props: {
        startDate: moment$Moment,
        endDate: moment$Moment,
        onDateSelected: (moment$Moment, moment$Moment) => any,
        granularity: string,
        i18n: I18nType,
    };

    overlay: { closeOverlay: () => void };
    onDateSelected: Function;

    constructor() {
        super();

        this.onDateSelected = this.onDateSelected.bind(this);
    }

    onDateSelected(startDate: moment$Moment, endDate: moment$Moment) {
        if (this.overlay) {
            this.overlay.closeOverlay();
        }
        this.props.onDateSelected(startDate, endDate);
    }

    render() {
        const { startDate, endDate, granularity } = this.props;
        const { gettext } = this.props.i18n;

        return (
            <Overlay.Trigger
                trigger="click"
                ref={ref => (this.overlay = ref)}
                getOverlay={() =>
                    <Overlay>
                        <DatePickerSwitch
                            granularity={granularity}
                            onDateSelected={this.onDateSelected}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Overlay>}
            >
                <Head>
                    <style data-source="aa-react-date-picker-css" type="text/css">
                        {cssStyle}
                    </style>
                </Head>
                <DropdownButton
                    label={gettext('Date Range')}
                    labelIcon={<CalendarIcon size={11} />}
                    value={formatDateRange(startDate, endDate)}
                    width="auto"
                />
            </Overlay.Trigger>
        );
    }
}

export { DatePicker as _DatePicker, DatePickerSwitch };
export default translate(DatePicker);
