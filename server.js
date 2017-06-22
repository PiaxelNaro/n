const { createServer } = require('http');
const { parse } = require('url');
const httpProxy = require('http-proxy');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const proxyServer = process.env.PROXY_SERVER;
console.log('> Proxy on', proxyServer);

const app = next({ dev });
const handle = app.getRequestHandler();
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    autoRewrite: true,
    cookieDomainRewrite: '',
});

app.prepare().then(() => {
    const address = {
        port: 3000,
        hostname: '0.0.0.0',
    };
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (
            pathname.startsWith('/media/') ||
            pathname.startsWith('/ajax/') ||
            pathname.startsWith('/i18n/') ||
            pathname.startsWith('/account/login') ||
            pathname.startsWith('/search')
        ) {
            proxy.web(req, res, {
                target: proxyServer,
                secure: false,
            });
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(address.port, address.hostname, err => {
        if (err) throw err;
        console.log(`> Ready on http://${address.hostname}:${address.port}`);
    });
});
