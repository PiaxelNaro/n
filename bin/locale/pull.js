const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const { ensureDir, getLocaleFileContext, convertPo2JSON } = require('./util');
const { LOCALE_LIST, SMARTLING_API_URL } = require('./config');

function pullLocale() {
    const result = {
        success: 0,
        fail: 0,
    };

    LOCALE_LIST.forEach(locale => {
        const ctx = getLocaleFileContext(locale);
        ensureDir(ctx.buildPath);
        const curlCommand = `curl -o ${ctx.buildPath} -d "apiKey=${ctx.key}&fileUri=${ctx.fileUri}&projectId=${ctx.id}&retrievalType=${ctx.type}&locale=${ctx.locale}" "${SMARTLING_API_URL}/file/get"`;

        execSync(curlCommand);
        const poFile = fs.readFileSync(ctx.buildPath);
        const buildDirPath = path.dirname(ctx.buildPath);

        try {
            // check if it is the po content response
            // if not po content, it will throw error here
            convertPo2JSON(ctx.buildPath);
            // move to normal path;
            execSync(`mv ${ctx.buildPath} ${ctx.localePath}`);
            console.log(chalk.green(`√ SUCCESS: ${ctx.localePath}`));

            result.success += 1;
        } catch (error) {
            try {
                const errRes = JSON.parse(poFile);
                if (errRes.response) {
                    console.log(chalk.red(`Error: ${errRes.response.code}`));
                    console.error(chalk.red(errRes.response.messages));
                    console.log(chalk.yellow('Skip to next item...'));
                    console.log('');
                }
            } catch (parseError) {
                // if res is not po and not json, trigger unknown error;
                console.log(chalk.red('Unknown Error: '));
                console.error(parseError);
                console.log(chalk.red('PULL STOPED'));
                throw Error('Pull Error');
            }

            result.fail += 1;
        }

        execSync(`rm -rf ${buildDirPath}`);
    });

    console.log(`PULL SUCCESS: ${result.success}`);
    console.log(chalk.red(`PULL FAIL: ${result.fail}`));
}

module.exports = pullLocale;
