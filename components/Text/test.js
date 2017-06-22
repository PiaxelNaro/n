// @flow
import React from 'react';
import { mount } from 'enzyme';
import Text from '.';

describe('<Text>', () => {
    it('render', () => {
        const text = mount(<Text />);
        expect(text).toMatchSnapshot();
        expect(text.prop('ellipsis')).toBeUndefined();
        expect(text.prop('size')).toBeUndefined();
        expect(text.prop('color')).toBeUndefined();
        expect(text.prop('width')).toBeUndefined();
    });

    it('render text', () => {
        const text = mount(<Text ellipsis />);
        expect(text).toMatchSnapshot();
        expect(text.prop('ellipsis')).toBeTruthy();

        text.setProps({
            size: '16px',
        });
        text.update();
        expect(text.prop('size')).toEqual('16px');

        text.setProps({
            color: 'red',
        });
        text.update();
        expect(text.prop('color')).toEqual('red');

        text.setProps({
            width: '10px',
        });
        text.update();
        expect(text.prop('width')).toEqual('10px');

        text.setProps({
            textTransform: 'uppercase',
        });
        text.update();
        expect(text.prop('textTransform')).toEqual('uppercase');
    });
});
