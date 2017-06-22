const { execSync } = require('child_process');
const chalk = require('chalk');

const { getLocaleFileContext } = require('./util');
const { LOCALE_LIST, SMARTLING_API_URL } = require('./config');

function pushLocale() {
    const result = {
        success: 0,
        fail: 0,
    };

    LOCALE_LIST.forEach(locale => {
        const ctx = getLocaleFileContext(locale);
        const curlCommand = `curl -F "file=@${ctx.localePath};type=text/plain" "${SMARTLING_API_URL}/file/plupload?apiKey=${ctx.key}&projectId=${ctx.id}&fileUri=${ctx.fileUri}&fileType=GETTEXT"`;

        const resBuf = execSync(curlCommand);

        try {
            const res = JSON.parse(resBuf.toString());
            if (res.response.code === 'SUCCESS') {
                console.log(chalk.green(`√ SUCCESS: ${ctx.localePath}`));

                result.success += 1;
            } else {
                console.log(chalk.red(`Error: ${res.response.code}`));
                console.error(chalk.red(res.response.messages));
                console.log(chalk.yellow('Skip to next item...'));
                console.log('');

                result.fail += 1;
            }
        } catch (err) {
            console.log(chalk.red('Unknow Error: '));
            console.log(err);
            console.log(chalk.red('PUSH STOPED'));
            throw Error('Push Error');
        }
    });

    console.log(`PUSH SUCCESS: ${result.success}`);
    console.log(chalk.red(`PUSH FAIL: ${result.fail}`));
}

module.exports = pushLocale;
