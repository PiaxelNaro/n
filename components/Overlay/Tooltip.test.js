// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
    it('renders text and tooltip', () => {
        const tooltip = shallow(<Tooltip content="Lorem ipsum dolor.">Lorem</Tooltip>);
        expect(tooltip).toMatchSnapshot();
        expect(
            shallow(tooltip.find('OverlayTrigger').prop('getOverlay')())
        ).toMatchSnapshot();
    });
});
