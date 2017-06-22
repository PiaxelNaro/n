const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const { ensureDir, getLocalePath, convertPo2JSON } = require('./util');
const { LOCALE_LIST, LOCALE_PUBLIC_JSON_PATH, LOCALE_JSON_FILE } = require('./config');

function getPublicLocaleJSONPath(lang) {
    return path.join(LOCALE_PUBLIC_JSON_PATH, lang, LOCALE_JSON_FILE);
}

function convert() {
    LOCALE_LIST.forEach(lang => {
        const poFilePath = getLocalePath(lang);
        const jsonPath = getPublicLocaleJSONPath(lang);

        ensureDir(jsonPath);
        const localeContent = convertPo2JSON(poFilePath);
        fs.writeFileSync(jsonPath, localeContent);

        console.log(chalk.green(`√ SUCCESS: ${lang}`));
    });
}

module.exports = convert;
