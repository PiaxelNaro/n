// @flow
import React from 'react';
import { shallow } from 'enzyme';
import PageLayout from '.';

describe('<PageLayout />', () => {
    it('renders base page layout', () => {
        expect(shallow(<PageLayout>hey</PageLayout>)).toMatchSnapshot();
    });
});
