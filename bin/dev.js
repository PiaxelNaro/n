#!/usr/bin/env node
const inquirer = require('inquirer');
const argv = require('minimist')(process.argv.slice(2));
const spawn = require('child_process').spawn;

const servers = [
    'www',
    'f-ui1',
    'f-ui2',
    'f-ui3',
    'f-int1',
    'f-int2',
    'f-int3',
    'f-int4',
    'f-flash1',
    'f-flash2',
    'f-flash3',
    'f-flash4',
    'ui1',
    'ui2',
    'ui3',
    'ss1',
    'ss2',
    'nl1',
    'nl2',
    'ss3',
    'sns1',
    'sns2',
    'sns3',
    'sns4',
    'loc',
    'ci-fc',
    'vm',
    'int1',
    'int2',
    'int3',
    'int4',
    'dna1',
    'an1',
    'f-an1',
    'f-an2',
    'f-an3',
    'f-an4',
];

function getProxy() {
    if (argv.proxy && servers.find(server => server === argv.proxy)) {
        return new Promise(resolve => {
            resolve(argv);
        });
    }
    return inquirer.prompt([
        {
            type: 'list',
            name: 'proxy',
            message: 'Choose your proxy server:',
            paginated: true,
            choices: servers,
        },
    ]);
}

getProxy().then(data => {
    const env = Object.assign({}, process.env, {
        PROXY_SERVER: `https://${data.proxy}..com`,
    });

    spawn('docker-compose', ['up', 'nginx', 'next'], {
        stdio: [0, 1, 2],
        env,
    });
});
