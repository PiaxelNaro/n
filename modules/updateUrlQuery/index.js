// @flow
import qs from 'querystring';
import nextRouter from 'next/router';

const Router: any = nextRouter;

export default (
    params: Object,
    options: { replace?: boolean, shallow?: boolean } = { replace: false, shallow: false }
) => {
    const url = `${Router.pathname}?${qs.stringify(params)}`;
    if (options.replace) {
        Router.replace(url, url, { shallow: options.shallow });
    } else {
        Router.push(url, url, { shallow: options.shallow });
    }
};
