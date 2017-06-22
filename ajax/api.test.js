// @flow
import fetchPonyfill from 'fetch-ponyfill';
import { authFetch, checkStatus, parseJSON } from './api';

const { fetch } = fetchPonyfill();

jest.mock('fetch-ponyfill', () => {
    const api = {
        fetch: jest.fn(() => ({})),
    };
    return jest.fn(() => api);
});
jest.mock(
    'universal-cookie',
    () =>
        class {
            // eslint-disable-next-line class-methods-use-this
            get() {
                return 'safe-csrf';
            }
        }
);

describe('authFetch()', () => {
    it('set authentification headers server side', () => {
        process.env.PROXY_SERVER = 'https://test.local';

        authFetch(
            '/some-api/',
            {},
            {
                url: '/',
                headers: {
                    'user-agent': 'Test UA',
                    'accept-language': 'FR, en-us',
                    cookie: 'auth=foobar; csrftoken=safe-csrf',
                },
            }
        );

        expect(fetch).toHaveBeenCalledWith('https://test.local/some-api/', {
            credentials: 'same-origin',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'accept-language': 'FR, en-us',
                cookie: 'auth=foobar; csrftoken=safe-csrf',
                'user-agent': 'Test UA',
                'x-csrftoken': 'safe-csrf',
                'x-requested-with': 'XMLHttpRequest',
            },
        });
    });

    it('set authentification headers server side without cookies', () => {
        process.env.PROXY_SERVER = 'https://test.local';

        authFetch(
            '/some-api/',
            {},
            {
                url: '/',
                headers: {
                    'user-agent': 'Test UA',
                    'accept-language': 'FR, en-us',
                },
            }
        );

        expect(fetch).toHaveBeenCalledWith('https://test.local/some-api/', {
            credentials: 'same-origin',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'accept-language': 'FR, en-us',
                'user-agent': 'Test UA',
                'x-csrftoken': 'safe-csrf',
                'x-requested-with': 'XMLHttpRequest',
            },
        });
    });

    it('set authentification headers client side', () => {
        jest.mock('is-node', () => false);
        global.document.cookie = 'auth=foobar; csrftoken=safe-csrf-2';

        authFetch('/some-api/');

        expect(fetch).toHaveBeenCalledWith('/some-api/', {
            credentials: 'same-origin',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'x-csrftoken': 'safe-csrf',
                'x-requested-with': 'XMLHttpRequest',
            },
        });
    });

    it('can send post requests', () => {
        authFetch('/some-api/', {
            method: 'post',
            body: '{"data":"foo"}',
        });

        expect(fetch).toHaveBeenCalledWith('/some-api/', {
            credentials: 'same-origin',
            method: 'post',
            body: '{"data":"foo"}',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'x-csrftoken': 'safe-csrf',
                'x-requested-with': 'XMLHttpRequest',
            },
        });
    });

    it('serialize post request body', () => {
        authFetch('/some-api/', {
            body: { foo: 'bar' },
        });

        expect(fetch).toHaveBeenCalledWith('/some-api/', {
            credentials: 'same-origin',
            body: '{"foo":"bar"}',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'x-csrftoken': 'safe-csrf',
                'x-requested-with': 'XMLHttpRequest',
            },
        });
    });
});

describe('checkStatus()', () => {
    it('handle successful request', () => {
        const res: any = {
            status: 200,
        };
        expect(checkStatus(res)).toEqual(res);
    });

    it('handle server side authentication error', () => {
        const res: any = {
            status: 401,
        };
        const serverRes: any = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };
        expect(() => checkStatus(res, serverRes)).toThrow();
        expect(serverRes.writeHead).toHaveBeenCalledWith(302, {
            Location: '/account/login',
        });
        expect(serverRes.end).toHaveBeenCalled();
    });

    it('handle server side authentication error with redirect', () => {
        const res: any = {
            status: 401,
        };
        const serverRes: any = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };
        const req = {
            url: '/a-report?a=b',
            headers: {},
        };
        expect(() => checkStatus(res, serverRes, req)).toThrow();
        expect(serverRes.writeHead).toHaveBeenCalledWith(302, {
            Location: '/account/login?next=%2Fa-report%3Fa%3Db',
        });
        expect(serverRes.end).toHaveBeenCalled();
    });

    it('handle client side authentication error', () => {
        const res: any = {
            status: 401,
        };
        expect(() => checkStatus(res)).toThrow();
    });

    it('handle error', () => {
        const res: any = {
            status: 500,
            statusText: 'uh oh!',
        };
        expect(() => checkStatus(res)).toThrow(res.statusText);
    });
});

describe('parseJSON()', () => {
    it('parses response to JSON', () => {
        const res: any = {
            json: jest.fn(() => ({ parsed: true })),
        };
        expect(parseJSON(res)).toEqual({ parsed: true });
    });
});
