// @flow
import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';
import range from 'lodash/range';
import { _DatePicker as DatePicker, DatePickerSwitch } from './DatePicker';
import WeekRangePicker from './WeekRangePicker';
import WeekPicker from './WeekPicker';
import mockI18n from '../../modules/i18n/mockI18n';

describe('<DatePicker />', () => {
    it('handles date range selection', () => {
        const spy = jest.fn();
        const datePicker = shallow(
            <DatePicker
                startDate={moment.utc([2014, 4, 5])}
                endDate={moment.utc([2016, 4, 5])}
                onDateSelected={spy}
                granularity="WeekRange"
                i18n={mockI18n}
            />
        );

        const overlay = shallow(datePicker.find('OverlayTrigger').prop('getOverlay')());
        overlay.find('DatePickerSwitch').prop('onDateSelected')();
        expect(spy).toBeCalled();
    });

    it('closes overlay once date is selected', () => {
        const spy = jest.fn();
        const startDate = moment();
        const endDate = moment();
        const datePicker = mount(
            <DatePicker
                startDate={moment.utc([2014, 4, 5])}
                endDate={moment.utc([2016, 4, 5])}
                onDateSelected={spy}
                granularity="WeekRange"
                i18n={mockI18n}
            />
        );

        const inst: any = datePicker.instance();
        inst.overlay = { closeOverlay: jest.fn() };

        const overlay = shallow(datePicker.find('OverlayTrigger').prop('getOverlay')());
        overlay.find('DatePickerSwitch').prop('onDateSelected')(startDate, endDate);
        expect(spy).toBeCalledWith(startDate, endDate);
        expect(inst.overlay.closeOverlay).toHaveBeenCalled();
    });

    it("select date even if overlay isn't present", () => {
        const spy = jest.fn();
        const startDate = moment();
        const endDate = moment();
        const datePicker = shallow(
            <DatePicker
                startDate={moment.utc([2014, 4, 5])}
                endDate={moment.utc([2016, 4, 5])}
                onDateSelected={spy}
                granularity="WeekRange"
                i18n={mockI18n}
            />
        );

        const inst: any = datePicker.instance();
        inst.onDateSelected(startDate, endDate);
        expect(spy).toBeCalledWith(startDate, endDate);
    });
});

describe('<DatePickerSwitch />', () => {
    it('render WeekRangePicker', () => {
        expect(
            shallow(
                <DatePickerSwitch
                    startDate={moment.utc([2014, 4, 5])}
                    endDate={moment.utc([2016, 4, 5])}
                    onDateSelected={() => {}}
                    granularity="WeekRange"
                />
            )
        ).toMatchSnapshot();
    });

    it('render WeekPicker', () => {
        expect(
            shallow(
                <DatePickerSwitch
                    startDate={moment.utc([2017, 3, 2])}
                    endDate={moment.utc([2017, 3, 8])}
                    onDateSelected={() => {}}
                    granularity="Week"
                />
            )
        ).toMatchSnapshot();
    });

    it('does not allow unsupported granularity type', () => {
        expect(() => {
            shallow(
                <DatePickerSwitch
                    startDate={moment.utc([2014, 4, 5])}
                    endDate={moment.utc([2016, 4, 5])}
                    onDateSelected={() => {}}
                    granularity="Does-NOT-exists"
                />
            );
        }).toThrow();
    });
});

describe('<WeekRangePicker />', () => {
    it('marks all days of hovered week as hovered', () => {
        const tuesday = moment.utc([2017, 3, 18]);
        const picker = shallow(<WeekRangePicker onDateSelected={() => {}} />);
        const controlledPicker = picker.find('DayPicker');

        const hovered = controlledPicker.prop('modifiers').hovered;
        const selected = controlledPicker.prop('modifiers').selected;

        // No hover, no pre-selected date. No dates are selected or hovered
        expect(hovered(tuesday)).toEqual(false);
        expect(selected(tuesday)).toEqual(false);

        controlledPicker.prop('onDayMouseEnter')(tuesday);
        range(16, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(hovered(date)).toEqual(true);
        });
        expect(hovered(moment.utc([2017, 3, 15]))).toEqual(false);
        expect(hovered(moment.utc([2017, 3, 23]))).toEqual(false);
        expect(hovered(tuesday.clone().add(1, 'month'))).toEqual(false);
    });

    it('marks all days of clicked week as hovered', () => {
        const tuesday = moment.utc([2017, 3, 18]);
        const picker = shallow(<WeekRangePicker onDateSelected={() => {}} />);
        const controlledPicker = picker.find('DayPicker');

        controlledPicker.prop('onDayClick')(tuesday);
        const hovered = controlledPicker.prop('modifiers').hovered;

        range(16, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(hovered(date)).toEqual(true);
        });
        expect(hovered(moment.utc([2017, 3, 15]))).toEqual(false);
        expect(hovered(moment.utc([2017, 3, 23]))).toEqual(false);
        expect(hovered(tuesday.clone().add(1, 'month'))).toEqual(false);
    });

    it('marks all days in between two dates as hovered', () => {
        const thursday = moment.utc([2017, 3, 6]);
        const tuesday = moment.utc([2017, 3, 18]);
        const picker = shallow(<WeekRangePicker onDateSelected={() => {}} />);
        const controlledPicker = picker.find('DayPicker');

        controlledPicker.prop('onDayClick')(thursday);
        controlledPicker.prop('onDayMouseEnter')(tuesday);
        const hovered = controlledPicker.prop('modifiers').hovered;

        range(3, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(hovered(date)).toEqual(true);
        });
        expect(hovered(moment.utc([2017, 3, 1]))).toEqual(false);
        expect(hovered(moment.utc([2017, 3, 23]))).toEqual(false);
        expect(hovered(tuesday.clone().add(1, 'month'))).toEqual(false);

        controlledPicker.prop('onDayMouseLeave')();
    });

    it('marks all days between selected range as selected until user click a new date', () => {
        const monday = moment.utc([2017, 3, 1]);
        const sunday = moment.utc([2017, 3, 23]);
        const picker = shallow(
            <WeekRangePicker
                onDateSelected={() => {}}
                currentStartDate={monday}
                currentEndDate={sunday}
            />
        );
        const controlledPicker = picker.find('DayPicker');
        const selected = controlledPicker.prop('modifiers').selected;

        range(1, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(selected(date)).toEqual(true);
        });
        expect(selected(sunday.clone().add(1, 'month'))).toEqual(false);

        // Once we click a new date, then no date is selected
        controlledPicker.prop('onDayClick')(moment.utc([2017, 4, 14]));
        expect(selected(monday)).toEqual(false);
        expect(selected(sunday)).toEqual(false);
    });

    it('allows to select date range in reverse order', () => {
        const thursday = moment.utc([2017, 3, 6]);
        const tuesday = moment.utc([2017, 3, 18]);
        const spy = jest.fn();
        const picker = shallow(<WeekRangePicker onDateSelected={spy} />);
        const controlledPicker = picker.find('DayPicker');

        controlledPicker.prop('onDayClick')(tuesday);
        controlledPicker.prop('onDayClick')(thursday);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0].format('l')).toEqual('4/2/2017');
        expect(spy.mock.calls[0][1].format('l')).toEqual('4/22/2017');
    });
});

describe('<WeekPicker />', () => {
    it('marks all days of hovered week as hovered', () => {
        const tuesday = moment.utc([2017, 3, 18]);
        const picker = shallow(<WeekPicker onDateSelected={() => {}} />);
        const controlledPicker = picker.find('DayPicker');

        const hovered = controlledPicker.prop('modifiers').hovered;
        const selected = controlledPicker.prop('modifiers').selected;

        // No hover, no pre-selected date. No dates are selected or hovered
        expect(hovered(tuesday)).toEqual(false);
        expect(selected(tuesday)).toEqual(false);

        controlledPicker.prop('onDayMouseEnter')(tuesday);
        range(16, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(hovered(date)).toEqual(true);
        });
        expect(hovered(moment.utc([2017, 3, 15]))).toEqual(false);
        expect(hovered(moment.utc([2017, 3, 23]))).toEqual(false);
        expect(hovered(tuesday.clone().add(1, 'month'))).toEqual(false);

        controlledPicker.prop('onDayMouseLeave')();

        range(16, 22).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(hovered(date)).toEqual(false);
        });
    });

    it('marks all days in the same week as selected', () => {
        const startDate = moment.utc([2017, 3, 2]);
        const endDate = moment.utc([2017, 3, 8]);
        const spy = jest.fn();
        const picker = shallow(
            <WeekPicker
                onDateSelected={spy}
                currentStartDate={startDate}
                currentEndDate={endDate}
            />
        );
        const controlledPicker = picker.find('DayPicker');
        const selected = controlledPicker.prop('modifiers').selected;
        range(2, 8).forEach(day => {
            const date = moment.utc([2017, 3, day]);
            expect(selected(date)).toEqual(true);
        });
        expect(selected(startDate.clone().add(1, 'month'))).toEqual(false);

        const newDate = moment.utc([2017, 3, 9]);
        controlledPicker.prop('onDayClick')(newDate);
        const newStartDate = newDate.clone().utc().startOf('week');
        const newEndDate = newDate.clone().utc().endOf('week');
        expect(spy).toBeCalledWith(newStartDate, newEndDate);
    });
});
