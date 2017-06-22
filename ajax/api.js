// @flow
import fetchPonyfill from 'fetch-ponyfill';
import pick from 'lodash/pick';
import Cookies from 'universal-cookie';

const { fetch } = fetchPonyfill();

export type NextRequest = {
    headers: { [string]: string },
    url: string,
};

const withDomain = (path: string, prependDomain: boolean) => {
    if (!prependDomain) {
        return path;
    }

    const domain: any = process.env.PROXY_SERVER;
    return `${domain}${path}`;
};

const requestAuthentication = (res, request) => {
    if (res) {
        let next = '';
        if (request) {
            next = `?next=${encodeURIComponent(request.url)}`;
        }
        res.writeHead(302, {
            Location: `/account/login${next}`,
        });
        res.end();
    } else {
        const loc = global.window.location;
        const next = encodeURIComponent(loc.pathname + loc.search);
        global.window.location = `/account/login?next=${next}`;
    }
};

const authFetch = (path: string, options: Object = {}, request: ?NextRequest) => {
    const cookies = new Cookies(request ? request.headers.cookie || '' : null);
    let headers;
    if (request) {
        headers = pick(request.headers, 'user-agent', 'accept-language', 'cookie');
    }

    const fullOptions = {
        headers: {},
        ...options,
    };
    if (fullOptions.body && typeof fullOptions.body !== 'string') {
        fullOptions.body = JSON.stringify(fullOptions.body);
    }

    return fetch(withDomain(path, request != null), {
        credentials: 'same-origin',
        ...fullOptions,
        headers: {
            ...headers,
            'content-type': 'application/json',
            accept: 'application/json, text/plain, */*',
            'x-requested-with': 'XMLHttpRequest',
            'x-csrftoken': cookies.get('csrftoken'),
            ...fullOptions.headers,
        },
    });
};

const checkStatus = (
    res: Response,
    userResponse: ?http$ServerResponse,
    request: ?NextRequest
) => {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }

    if (res.status === 401) {
        requestAuthentication(userResponse, request);
    }

    throw new Error(res.statusText);
};

const parseJSON = (res: Response) => res.json();

export { authFetch, checkStatus, parseJSON };
