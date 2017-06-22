// @flow
import React from 'react';
import { shallow } from 'enzyme';

import mockI18n from '../../modules/i18n/mockI18n';
import { _Footer as Footer } from '.';

import data from '../../data/footer';

describe('<Footer>', () => {
    it('renders footer', () => {
        const wrapper = shallow(<Footer i18n={mockI18n} content={data} />);
        expect(wrapper).toMatchSnapshot();
    });
});
