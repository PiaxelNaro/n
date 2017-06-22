import React from 'react';
import { shallow } from 'enzyme';
import AAIcon from '.';

describe('<AAIcon>', () => {
    it('render icon', () => {
        const selector = shallow(<AAIcon name="aa-home" />);
        expect(selector).toMatchSnapshot();
        expect(selector.hasClass('aaicon-aa-home')).toEqual(true);
    });
});
