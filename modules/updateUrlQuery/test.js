// @flow
import Router from 'next/router';
import updateUrlQuery from '.';

jest.mock('next/router', () => ({
    pathname: 'current',
    query: {
        preset: 'a',
    },
    replace: jest.fn(),
    push: jest.fn(),
}));

describe('updateUrlQuery()', () => {
    it('replace current url with new query', () => {
        updateUrlQuery({ a: 1 });
        const href = 'current?a=1';
        expect(Router.push).toHaveBeenCalledWith(href, href, { shallow: false });
    });

    it('reload current url with new query', () => {
        updateUrlQuery({ b: 'b' }, { replace: true, shallow: true });
        const href = 'current?b=b';
        expect(Router.replace).toHaveBeenCalledWith(href, href, { shallow: true });
    });
});
