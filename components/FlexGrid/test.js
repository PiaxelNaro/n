// @flow
import React from 'react';
import { shallow } from 'enzyme';
import FlexGrid, { ColumnGrid } from '.';

describe('<FlexGrid>', () => {
    it('renders inline or as block', () => {
        expect(shallow(<FlexGrid />)).toMatchSnapshot();
        expect(shallow(<FlexGrid inline />)).toMatchSnapshot();
    });
});

describe('<FlexGrid.Item>', () => {
    it('adapt css to flex values', () => {
        expect(shallow(<FlexGrid.Item flex={0} />)).toMatchSnapshot();
        expect(shallow(<FlexGrid.Item flex={1} />)).toMatchSnapshot();
        expect(shallow(<FlexGrid.Item flex={2} />)).toMatchSnapshot();
    });
});

describe('<ColumnGrid />', () => {
    it('setup a vertical spacing grid', () => {
        expect(shallow(<ColumnGrid gutter="8px" />)).toMatchSnapshot();
    });
});
