import React from 'react';
import { shallow, mount } from 'enzyme';
import { _PageSizeSelector as PageSizeSelector } from '.';
import mockI18n from '../../modules/i18n/mockI18n';

describe('<PageSizeSelector>', () => {
    it('renders PageSizeSelector with default options', () => {
        expect(
            shallow(<PageSizeSelector current={100} i18n={mockI18n} />)
        ).toMatchSnapshot();
    });

    it('renders PageSizeSelector with customized options', () => {
        const spy = jest.fn();
        const select = mount(
            <PageSizeSelector
                options={[10, 50, 100]}
                current={10}
                onSelectionChanged={spy}
                i18n={mockI18n}
            />
        );
        expect(select).toMatchSnapshot();

        const value = 50;
        select.find('select').simulate('change', {
            target: {
                value,
            },
        });
        expect(spy).toHaveBeenCalledWith(value);
    });
});
