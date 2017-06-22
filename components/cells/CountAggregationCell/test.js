// @flow
import React from 'react';
import { shallow } from 'enzyme';
import CountAggregationCell, { _CountAggregationOverlay as CountAggregationOverlay } from '.';
import mockI18n from '../../../modules/i18n/mockI18n';

describe('<CountAggregationCell />', () => {
    it('renders overlay trigger', () => {
        const FakeRow: any = jest.fn();
        FakeRow.displayName = 'FakeRow';
        const component = shallow(
            <CountAggregationCell count={3} link="https://foo" items={[]} Row={FakeRow} />
        );
        expect(component).toMatchSnapshot();
        const overlay = shallow(component.find('OverlayTrigger').prop('getOverlay')());
        expect(overlay).toMatchSnapshot();
    });
});

describe('<CountAggregationOverlay />', () => {
    it('renders small list', () => {
        const FakeRow: any = jest.fn();
        FakeRow.displayName = 'FakeRow';
        const component = shallow(
            <CountAggregationOverlay
                i18n={mockI18n}
                count={3}
                link="https://foo"
                items={[
                    {
                        name: 'bar',
                    },
                    {
                        name: 'foo',
                    },
                ]}
                Row={FakeRow}
            />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders see more link', () => {
        const MockRow: any = jest.fn();
        const component = shallow(
            <CountAggregationOverlay
                i18n={mockI18n}
                count={45}
                link="https://foo"
                items={[]}
                Row={MockRow}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
