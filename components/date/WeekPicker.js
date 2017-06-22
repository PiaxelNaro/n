import React, { Component } from 'react';
import { DayPicker } from 'react-dates';
import './style.scss';

export default class WeekPicker extends Component {
    props: {
        onDateSelected: () => any,
        currentStartDate?: moment$Moment,
        currentEndDate?: moment$Moment,
    };

    state: {
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
            hoveredDay: null,
        };

        this.onDayClick = this.onDayClick.bind(this);
        this.isDayHovered = this.isDayHovered.bind(this);
        this.isDaySelected = this.isDaySelected.bind(this);
        this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
        this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    }

    isDayHovered(day: moment$Moment) {
        const hoverdDay = this.state.hoveredDay;

        return Boolean(hoverdDay && day.isSame(hoverdDay, 'week'));
    }

    isDaySelected(day: moment$Moment) {
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
        const startDate = day.clone().utc().startOf('week');
        const endDate = day.clone().utc().endOf('week');
        this.props.onDateSelected(startDate, endDate);
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
