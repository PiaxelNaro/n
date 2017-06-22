const path = require('path');
const { execSync } = require('child_process');
const po2json = require('po2json');
const mkdirp = require('mkdirp');

const {
    LOCALE_PATH,
    SMARTLING_LOCALE_FILE,
    SMARTLING_API_KEY,
    SMARTLING_PROJECT_ID,
} = require('./config');

function ensureDir(filePath) {
    const dirPath = path.dirname(filePath);
    mkdirp.sync(dirPath);
}

function convertPo2JSON(poFilePath) {
    const translations = po2json.parseFileSync(poFilePath, {
        'fallback-to-msgid': true,
        stringify: true,
        format: 'jed1.x',
        domain: 'messages',
    });
    return translations;
}

function getBranch() {
    const branch = execSync('git rev-parse --abbrev-ref HEAD');
    return encodeURIComponent(branch.toString().trim());
}

function getLocalePath(localeName) {
    return path.join(LOCALE_PATH, localeName, SMARTLING_LOCALE_FILE);
}

function getLocaleFileContext(locale = 'en-US', type = 'pending') {
    const file = SMARTLING_LOCALE_FILE;
    const branch = getBranch();
    const localePath = path.join(LOCALE_PATH, locale, file);
    const buildPath = path.join(LOCALE_PATH, locale, '_tmp', file);
    const fileUri = `/files/aa-react/${branch}-${file}`;

    const ctx = {
        localePath,
        buildPath,
        file,
        fileUri,
        key: SMARTLING_API_KEY,
        id: SMARTLING_PROJECT_ID,
        branch,
        type,
        locale,
    };
    return ctx;
}

module.exports = {
    ensureDir,
    getLocaleFileContext,
    getBranch,
    getLocalePath,
    convertPo2JSON,
};
