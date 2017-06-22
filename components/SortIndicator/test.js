// @flow
import React from 'react';
import { shallow } from 'enzyme';
import SortIndicator from '.';

describe('<SortIndicator />', () => {
    it('render sort direction', () => {
        expect(shallow(<SortIndicator />)).toMatchSnapshot();
        expect(shallow(<SortIndicator direction="asc" />)).toMatchSnapshot();
        expect(shallow(<SortIndicator direction="desc" />)).toMatchSnapshot();
    });
});
