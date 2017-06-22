// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import BackToTopButton from '.';
import * as eventAggregator from '../../modules/eventAggregator';

const scrollAggregator: any = eventAggregator.scrollAggregator;

jest.mock('../../modules/eventAggregator', () => {
    const unsubscribe = jest.fn();
    return {
        scrollAggregator: jest.fn(() => unsubscribe),
    };
});

describe('<BackToTopButton>', () => {
    it('scroll to top button should display if user scroll down', () => {
        const button = shallow(<BackToTopButton />);
        expect(button).toMatchSnapshot();

        // Scroll down
        const inst: any = button.instance();
        inst.scrollWatcher(1);
        button.update();
        expect(button).toMatchSnapshot();

        // Scroll up
        inst.scrollWatcher(0);
        button.update();
        expect(button).toMatchSnapshot();
    });

    it('scroll to top on click', () => {
        global.document.body.scrollTop = 10;
        global.document.documentElement.scrollTop = 10;
        const button = mount(<BackToTopButton />);
        expect(scrollAggregator).toHaveBeenCalledTimes(1);

        // Trigger a scroll event
        scrollAggregator.mock.calls[0][0](10);

        button.simulate('click');
        expect(global.document.body.scrollTop).toEqual(0);
        expect(global.document.documentElement.scrollTop).toEqual(0);

        // Unmounting will clean the listeners.
        button.unmount();
        expect(scrollAggregator(jest.fn())).toHaveBeenCalledTimes(1);
    });
});
