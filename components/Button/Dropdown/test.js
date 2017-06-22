// @flow
import React from 'react';
import { shallow } from 'enzyme';
import DropdownButton from '.';

describe('<DropdownButton>', () => {
    it('renders without label', () => {
        expect(shallow(<DropdownButton value="Country" />)).toMatchSnapshot();
    });

    it('renders with label', () => {
        expect(
            shallow(<DropdownButton value="Ad Mob" label="Network" labelIcon={<i />} />)
        ).toMatchSnapshot();
    });
});
