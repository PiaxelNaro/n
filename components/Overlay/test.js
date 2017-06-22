// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import Overlay, { OverlayWrapper, OverlayPositionner } from '.';

jest.useFakeTimers();

describe('<Overlay>', () => {
    it('renders children', () => {
        expect(shallow(<Overlay>My Overlay</Overlay>)).toMatchSnapshot();
    });

    it('renders as tooltip', () => {
        expect(shallow(<Overlay showArrow>My Overlay</Overlay>)).toMatchSnapshot();
    });
});

describe('<OverlayWrapper>', () => {
    it('render with arrow', () => {
        const overlayWrapper = shallow(
            <OverlayWrapper showArrow className="AAOverlay">
                My Right Overlay Wrapper
            </OverlayWrapper>
        );
        expect(overlayWrapper).toMatchSnapshot();
    });
});

describe('<OverlayPositionner />', () => {
    it('Assign right className', () => {
        const positionner = shallow(<OverlayPositionner alignTo="left" />);
        expect(positionner.prop('className')).toContain('align-left');
    });
});

describe('<Overlay.Trigger>', () => {
    it('toggle overlay', () => {
        const overlay = shallow(
            <Overlay.Trigger trigger="click" getOverlay={() => <div id="overlay" />}>
                Hello
            </Overlay.Trigger>
        );
        expect(overlay).toMatchSnapshot();

        // Toggle with button
        overlay.find('OverlayControl').simulate('click');
        expect(overlay.find('#overlay').exists()).toBe(true);
        expect(overlay).toMatchSnapshot();

        overlay.find('OverlayControl').simulate('click');
        jest.runAllTimers();
        expect(overlay.find('#overlay').exists()).toBe(false);

        // Test click outside
        overlay.find('OverlayControl').simulate('click');
        expect(overlay.find('#overlay').exists()).toBe(true);

        overlay.find('Portal').prop('onClose')();
        jest.runAllTimers();
        expect(overlay.find('#overlay').exists()).toBe(false);
    });

    it("click won't trigger toggle overlay with hover type", () => {
        const overlay = shallow(
            <Overlay.Trigger trigger="hover" getOverlay={() => <div id="overlay" />}>
                Hello
            </Overlay.Trigger>
        );
        expect(overlay).toMatchSnapshot();

        // there should be no click handler
        expect(overlay.find('OverlayControl').prop('onClick')).toEqual(false);

        overlay.find('OverlayControl').simulate('mouseOver');
        expect(overlay.find('#overlay').exists()).toBe(true);

        overlay.find('OverlayControl').simulate('mouseOut');
        jest.runAllTimers();
        expect(overlay.find('#overlay').exists()).toBe(false);
    });

    it('position overlay under the trigger element', () => {
        const overlay = shallow(
            <Overlay.Trigger trigger="click" getOverlay={() => <div id="overlay" />}>
                Hello
            </Overlay.Trigger>
        );
        const instance: any = overlay.instance();
        const triggerEl: any = {
            getBoundingClientRect: () => ({
                top: 20,
                height: 30,
                width: 200,
                left: 40,
                right: 70,
            }),
        };
        instance.triggerEl = triggerEl;

        overlay.find('OverlayControl').simulate('click');
        expect(overlay.find('Overlay__OverlayPositionner').prop('style')).toEqual({
            left: 40,
            top: 50,
            width: 200,
        });
    });

    it('assigns refs', () => {
        const overlay = mount(
            <Overlay.Trigger trigger="click" getOverlay={() => <div id="overlay" />}>
                Hello
            </Overlay.Trigger>
        );
        overlay.find('OverlayControl').simulate('click');
        expect(overlay.find('Portal').exists()).toBe(true);
    });
});
