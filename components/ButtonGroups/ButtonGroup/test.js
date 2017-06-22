// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ButtonGroup from '.';
import Button from '../../Button';

describe('<ButtonGroup>', () => {
    it('renders ButtonGroup', () => {
        expect(
            shallow(
                <ButtonGroup>
                    <Button>My</Button>
                    <Button>ButtonGroup</Button>
                </ButtonGroup>
            )
        ).toMatchSnapshot();
    });
});
