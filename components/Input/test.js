// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Input from '.';

describe('<Input>', () => {
    it('renders input field and handle change events', () => {
        const spy = jest.fn();
        const input = shallow(
            <Input
                value="bar"
                onChange={spy}
                onClick={() => null}
                placeholder="Hey"
                icon="l"
                width="200px"
            />
        );
        expect(input).toMatchSnapshot();

        input.find('Input__RawInput').simulate('change', { target: { value: 'bar' } });
        expect(spy).toHaveBeenCalledWith('bar');
    });
});
