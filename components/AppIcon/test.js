// @flow
import React from 'react';
import { shallow } from 'enzyme';

import AppIcon, { Flag, StoreIcon } from '.';

describe('<AppIcon>', () => {
    it('renders app icon', () => {
        const selector = shallow(
            <AppIcon src="/static/logo.png" size="small" store="ios" />
        );
        expect(selector).toMatchSnapshot();
    });
    it('renders app icon with store icon', () => {
        expect(
            shallow(
                <AppIcon
                    src="/static/logo.png"
                    size="medium"
                    store="ios"
                    showStoreIcon={Boolean(true)}
                />
            )
        ).toMatchSnapshot();
    });
});

describe('<StoreIcon>', () => {
    it('render app store icon', () => {
        expect(shallow(<StoreIcon type="android" />)).toMatchSnapshot();
        expect(shallow(<StoreIcon type="android" size="16px" />)).toMatchSnapshot();
    });
});

describe('<Flag>', () => {
    it('render flag icon', () => {
        expect(shallow(<Flag code="cn" />)).toMatchSnapshot();
    });
    it('render world wide flag', () => {
        expect(shallow(<Flag code="ww" />)).toMatchSnapshot();
    });
});
