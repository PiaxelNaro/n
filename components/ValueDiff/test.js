// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ValueDiff, { Wrapper } from '.';

describe('<ValueDiff />', () => {
    it('renders value with unit', () => {
        expect(
            shallow(<ValueDiff value={0.234551} type="value" unit="%" />)
        ).toMatchSnapshot();
        expect(
            shallow(<ValueDiff value={0.234551} type="growth" unit="%" />)
        ).toMatchSnapshot();
    });

    it('renders value without unit', () => {
        expect(shallow(<ValueDiff value={-3.2} type="value" />)).toMatchSnapshot();
        expect(shallow(<ValueDiff value={-3.2} type="growth" />)).toMatchSnapshot();
    });

    it('renders neutral value', () => {
        expect(shallow(<ValueDiff value={0} type="value" />)).toMatchSnapshot();
        expect(shallow(<ValueDiff value={0} type="growth" />)).toMatchSnapshot();
    });

    it('renders value without type', () => {
        expect(shallow(<ValueDiff value={1} />)).toMatchSnapshot();
        expect(shallow(<ValueDiff value={-1} />)).toMatchSnapshot();
    });

    it('sets color properly', () => {
        expect(shallow(<Wrapper type="positive" />)).toMatchSnapshot();
    });
});
