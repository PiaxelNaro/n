// @flow
import React from 'react';
import { DayPicker } from 'react-dates';

const orderAndRoundDates = (date1: moment$Moment, date2: moment$Moment) => {
    let startDate = date1;
    let endDate = date2;
    if (date2.isBefore(date1)) {
        startDate = date2;
        endDate = date1;
    }

    return {
        startDate: startDate.startOf('week'),
        endDate: endDate.endOf('week'),
    };
};

class WeekRangePicker extends React.Component {
    props: {
        onDateSelected: (moment$Moment, moment$Moment) => any,
        currentStartDate?: moment$Moment,
        currentEndDate?: moment$Moment,
    };

    state: {
        clickedDate: ?moment$Moment,
        hoveredDay: ?moment$Moment,
    };

    onDayClick: Function;
    isDayHovered: Function;
    isDaySelected: Function;
    onDayMouseEnter: Function;
    onDayMouseLeave: Function;

    constructor() {
        super();

        this.state = {
            clickedDate: null,
            hoveredDay: null,
        };

        this.onDayClick = this.onDayClick.bind(this);
        this.isDayHovered = this.isDayHovered.bind(this);
        this.isDaySelected = this.isDaySelected.bind(this);
        this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
        this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    }

    isDayHovered(day: moment$Moment) {
        const date1 = this.state.clickedDate;
        const date2 = this.state.hoveredDay;

        if (date1 && date2) {
            const { startDate, endDate } = orderAndRoundDates(date1, date2);
            return day.isBetween(startDate, endDate);
        }

        return Boolean(
            (date1 && day.isSame(date1, 'week')) || (date2 && day.isSame(date2, 'week'))
        );
    }

    isDaySelected(day: moment$Moment) {
        // We don't display selected days when the user is in the progress of selecting a new range
        if (this.state.clickedDate) {
            return false;
        }

        const { currentStartDate, currentEndDate } = this.props;
        if (currentStartDate && currentEndDate) {
            return (
                day.isSameOrAfter(currentStartDate) && day.isSameOrBefore(currentEndDate)
            );
        }

        return false;
    }

    onDayMouseEnter(day: moment$Moment) {
        this.setState({ hoveredDay: day.clone().utc() });
    }

    onDayMouseLeave() {
        this.setState({ hoveredDay: null });
    }

    onDayClick(day: moment$Moment) {
        const clickedDate = day.clone().utc();
        if (!this.state.clickedDate) {
            this.setState({ clickedDate });
            return;
        }

        const { startDate, endDate } = orderAndRoundDates(
            this.state.clickedDate,
            clickedDate
        );
        this.props.onDateSelected(startDate, endDate);
        this.setState({ hoveredDay: null, clickedDate: null });
    }

    render() {
        return (
            <DayPicker
                numberOfMonths={3}
                daySize={28}
                modifiers={{
                    hovered: this.isDayHovered,
                    selected: this.isDaySelected,
                }}
                onDayMouseEnter={this.onDayMouseEnter}
                onDayMouseLeave={this.onDayMouseLeave}
                onDayClick={this.onDayClick}
            />
        );
    }
}

export default WeekRangePicker;
