// @flow
import getPositionCoords from '.';

describe('getPositionCoords()', () => {
    const target: any = {
        getBoundingClientRect: () => ({
            top: 20,
            left: 40,
            right: 70,
            height: 30,
            width: 200,
        }),
    };

    it('gets position from body', () => {
        const body = {
            scrollTop: 20,
            scrollLeft: 10,
            clientTop: 10,
            clientLeft: 20,
            clientWidth: 800,
        };
        const win = {
            document: { body, documentElement: {} },
        };

        expect(getPositionCoords(target, win)).toEqual({
            alignTo: 'left',
            style: { left: 30, top: 60, width: 200 },
        });
    });

    it('gets position from documentElement', () => {
        const documentElement = {
            scrollTop: 20,
            scrollLeft: 10,
            clientTop: 10,
            clientLeft: 20,
            clientWidth: 800,
        };
        const win = {
            document: { body: {}, documentElement },
        };

        expect(getPositionCoords(target, win)).toEqual({
            alignTo: 'left',
            style: { left: 30, top: 60, width: 200 },
        });
    });

    it('gets position from page offset', () => {
        const win = {
            document: { body: {}, documentElement: {} },
            pageYOffset: 3,
            pageXOffset: 3,
        };
        expect(getPositionCoords(target, win)).toEqual({
            alignTo: 'right',
            style: { left: 43, top: 53, width: 200 },
        });
    });
});
