// @flow
import makeEventAggregator, { scrollAggregator, resizeAggregator } from '.';

describe('makeEventAggregator()', () => {
    const getValue = jest.fn(() => 'a');
    global.requestAnimationFrame = jest.fn();
    const target: any = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    };
    const aggregator = makeEventAggregator(target, 'my-event', getValue);

    // This module is lazy, it'll only add listeners when required.
    expect(getValue).not.toHaveBeenCalled();
    expect(target.addEventListener).not.toHaveBeenCalled();

    const cb1 = jest.fn();
    const unsubscribe1 = aggregator(cb1);
    expect(target.addEventListener).toHaveBeenCalled();

    const cb2 = jest.fn();
    const unsubscribe2 = aggregator(cb2);
    expect(target.addEventListener).toHaveBeenCalledTimes(1);

    const eventHandler = target.addEventListener.mock.calls[0][1];
    const rAF = global.requestAnimationFrame.mock.calls[0][0];

    // Multiple events will be aggregated
    eventHandler('arg');
    expect(getValue).toHaveBeenCalledWith('arg');
    eventHandler();

    expect(cb1).not.toHaveBeenCalled();

    // On the next animation frame, we'll call the handlers and schedule the next check for the
    // next frame.
    rAF();
    expect(cb1).toHaveBeenCalledWith('a');
    expect(cb2).toHaveBeenCalledWith('a');
    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(2);

    // Handlers are not called when value doesn't change
    eventHandler();
    rAF();
    expect(cb1).toHaveBeenCalledTimes(1);

    // Clean itself on unsubscribe
    unsubscribe1();
    expect(target.removeEventListener).not.toHaveBeenCalled();
    unsubscribe2();
    expect(target.removeEventListener).toHaveBeenCalled();
});

describe('scrollAggregator', () => {
    it('aggregate document scroll events', () => {
        const spyFirstCallBack = () => 1;
        const spySecondCallBack = () => 2;
        global.requestAnimationFrame = jest.fn();
        global.document.addEventListener = jest.fn();
        global.document.removeEventListener = jest.fn();
        const unmountFirst = scrollAggregator(spyFirstCallBack);
        const scrollHandler = global.document.addEventListener.mock.calls[0][1];
        const loopHandlers = global.requestAnimationFrame.mock.calls[0][0];
        scrollHandler();
        expect(global.document.addEventListener).toHaveBeenCalledTimes(1);

        global.document.body.scrollTop = 1;
        scrollHandler();
        loopHandlers();
        expect(global.requestAnimationFrame).toHaveBeenCalledTimes(2);

        const unmountSecond = scrollAggregator(spySecondCallBack);
        unmountFirst();
        loopHandlers();
        expect(global.requestAnimationFrame).toHaveBeenCalledTimes(3);
        expect(global.document.removeEventListener).toHaveBeenCalledTimes(0);

        unmountSecond();
        loopHandlers();
        expect(global.document.removeEventListener).toHaveBeenCalledTimes(1);
    });
});

describe('resizeAggregator', () => {
    it('aggregate window resize events', () => {
        const spy = jest.fn();
        global.requestAnimationFrame = jest.fn();
        global.window.addEventListener = jest.fn();
        global.window.removeEventListener = jest.fn();

        const unsubscribe = resizeAggregator(spy);

        const triggerResize = global.window.addEventListener.mock.calls[0][1];
        const triggerRaF = global.requestAnimationFrame.mock.calls[0][0];

        expect(global.window.addEventListener).toHaveBeenCalledTimes(1);

        triggerResize();
        triggerRaF();
        expect(spy).toHaveBeenCalledTimes(1);
        unsubscribe();
    });
});
