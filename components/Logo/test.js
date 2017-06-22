import React from 'react';
import { shallow } from 'enzyme';
import Logo from '.';

describe('<Logo>', () => {
    it('default', () => {
        expect(
            shallow(<Logo />)
        ).toMatchSnapshot();
    });

    it('mini', () => {
        expect(
            shallow(<Logo mini />)
        ).toMatchSnapshot();
    });

    it('mini & premium', () => {
        expect(
            shallow(<Logo mini premium />)
        ).toMatchSnapshot();
    });
});
