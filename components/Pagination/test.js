// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '.';

describe('<Pagination>', () => {
    it('render children', () => {
        expect(
            shallow(
                <Pagination
                    current={3}
                    total={10}
                    onPageChange={() => {}}
                />
            )
        ).toMatchSnapshot();
    });

    it('render first page, the prev button should be disabled', () => {
        expect(
            shallow(
                <Pagination
                    current={1}
                    total={10}
                    onPageChange={() => {}}
                />
            )
        ).toMatchSnapshot();
    });

    it('render last page, the next button should be disabled', () => {
        expect(
            shallow(
                <Pagination
                    current={10}
                    total={10}
                    onPageChange={() => {}}
                />
            )
        ).toMatchSnapshot();
    });

    it('click prev and next button will invoke callback', () => {
        const onPageChange = jest.fn();
        const pager = mount(
            <Pagination
                current={3}
                total={10}
                onPageChange={onPageChange}
            />
        );
        const buttons = pager.find('button');

        buttons.first().simulate('click');
        expect(onPageChange).toHaveBeenCalledWith(2);
        buttons.last().simulate('click');
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('prev button will be disabled if current is 0', () => {
        const onPageChange = jest.fn();
        const pager = mount(
            <Pagination
                current={1}
                total={10}
                onPageChange={onPageChange}
            />
        );
        pager.find('button').first().prop('onClick')();
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it('next button will be disabled if current is the last', () => {
        const onPageChange = jest.fn();
        const pager = mount(
            <Pagination
                current={10}
                total={10}
                onPageChange={onPageChange}
            />
        );
        pager.find('button').last().prop('onClick')();
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it('test valid input, callback will be invoked', () => {
        const onPageChange = jest.fn();
        const pager = mount(
            <Pagination
                current={3}
                total={10}
                onPageChange={onPageChange}
            />
        );
        const input = pager.find('input').first();
        input.simulate('change', {
            target: {
                value: '10',
            },
        });
        input.simulate('keyPress', { key: 'Test' });
        expect(onPageChange).not.toHaveBeenCalled();

        input.simulate('keyPress', { key: 'Enter' });
        expect(onPageChange).toHaveBeenCalledWith(10);

        // test regexp for input value
        input.simulate('change', {
            target: {
                value: 'abc11d',
            },
        });
        expect(input.prop('value')).toEqual('11');

        // test componentWillReceiveProps(nextProps)
        pager.setProps({
            current: 9,
        });
        expect(input.prop('value')).toEqual(9);
    });

    it('test invalid input, callback will not be invoked', () => {
        const onPageChange = jest.fn();
        const pager = mount(
            <Pagination
                current={3}
                total={10}
                onPageChange={onPageChange}
            />
        );
        const input = pager.find('input').first();
        input.simulate('change', {
            target: {
                value: '99',
            },
        });
        input.simulate('keyPress', { key: 'Enter' });
        expect(onPageChange).not.toHaveBeenCalled();
    });
});
