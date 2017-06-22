// @flow
import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelector from '.';

import languages from '../../data/languages';

describe('<LanguageSelector>', () => {
    it('renders languages', () => {
        global.location.assign = jest.fn();
        const wrapper = shallow(
            <LanguageSelector languages={languages} current="en-US" />
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.find('TagList').prop('onChange')('ja-JP');
        expect(global.location.assign).toHaveBeenCalled();
    });
});
