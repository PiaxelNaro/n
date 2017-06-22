// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '.';

describe('<Toggle>', () => {
    it('renders toggle', () => {
        const spy = jest.fn();
        const toggle = shallow(<Toggle onClick={spy} />);
        expect(toggle).toMatchSnapshot();

        toggle.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);

        toggle.setProps({
            checked: true,
        });
        toggle.update();
        expect(toggle).toMatchSnapshot();
        expect(toggle.prop('checked')).toBeTruthy();

        toggle.setProps({
            disabled: true,
        });
        toggle.update();
        expect(toggle).toMatchSnapshot();
        expect(toggle.prop('disabled')).toBeTruthy();
    });
});
