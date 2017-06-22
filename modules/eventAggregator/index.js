// @flow
const makeEventAggregator = (target: HTMLElement, event: string, getValue: Function) => {
    let currentValue = NaN;
    let lastSentValue = NaN;
    let listenerAdded = false;
    let handlers = [];

    const eventHandler = (...args) => {
        currentValue = getValue(...args);
    };

    const loopHandlers = () => {
        if (!handlers.length) {
            return;
        }

        if (lastSentValue !== currentValue) {
            lastSentValue = currentValue;
            handlers.forEach(handler => handler(currentValue));
        }

        global.requestAnimationFrame(loopHandlers);
    };

    const startWatching = () => {
        if (listenerAdded) {
            return true;
        }

        listenerAdded = true;
        eventHandler();
        target.addEventListener(event, eventHandler);
        global.requestAnimationFrame(loopHandlers);
        return false;
    };

    const stopWatching = () => {
        target.removeEventListener(event, eventHandler);
        lastSentValue = NaN;
        currentValue = NaN;
        listenerAdded = false;
        handlers = [];
    };

    return (handler: Function) => {
        handlers.push(handler);
        if (startWatching()) {
            handler(currentValue);
        }

        return () => {
            // Remove handlers from
            handlers = handlers.filter(item => item !== handler);

            // Stop watcher if there's no handlers left
            if (!handlers.length) {
                stopWatching();
            }
        };
    };
};

export default makeEventAggregator;

export const scrollAggregator = makeEventAggregator(
    global.document,
    'scroll',
    () => global.document.body.scrollTop || global.document.documentElement.scrollTop
);

export const resizeAggregator = makeEventAggregator(
    global.window,
    'resize',
    () => global.document.body.offsetWidth
);
