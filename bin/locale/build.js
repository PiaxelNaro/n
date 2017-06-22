#!/usr/bin/env node
const chalk = require('chalk');
const argv = require('minimist')(process.argv);

const push = require('./push');
const pull = require('./pull');
const extract = require('./extract');
const convert = require('./convert');

function runTask(taskFn, taskName, onFailFn) {
    console.log('');
    console.log(`BEGIN TO ${taskName}:`);

    try {
        taskFn(taskName);
    } catch (err) {
        console.log(chalk.red(`${taskName} FAILED!`));
        console.log(chalk.red('---------------------------------------------'));
        console.log('');
        if (!onFailFn) {
            return;
        }

        if (onFailFn(taskName) !== true) {
            console.log('');
            throw Error(err);
        }
    }

    console.log(`${taskName} FINISHED`);
    console.log('');
}

function run(name, taskList) {
    taskList.forEach(task => {
        runTask(task[0], task[1], taskName => {
            console.log(`ERROR: ${taskName}`);
            console.log(chalk.red(`X LOCALE ${name} FAILED!`));
        });
    });
    console.log(chalk.green(`√ LOCALE ${name} DONE!`));
    console.log(chalk.green('---------------------------------------------'));
    console.log('');
}

if (argv.pull) {
    run('PULL', [[extract, 'EXTRACT'], [pull, 'PULL'], [convert, 'CONVERT']]);
} else {
    run('BUILD', [
        [extract, 'EXTRACT'],
        [push, 'PUSH'],
        [pull, 'PULL'],
        [convert, 'CONVERT'],
    ]);
}
