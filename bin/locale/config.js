const path = require('path');

const ROOT = path.dirname(__dirname);
const LOCALE_PATH = path.join(ROOT, 'locale', '_locales');
const LOCALE_PUBLIC_JSON_PATH = path.join(ROOT, '../static', '_locales');

const CONFIG = {
    ROOT,
    LOCALE_PATH,
    LOCALE_PUBLIC_JSON_PATH,
    EXTRACT_GLOB: './!(node_modules|coverage|.git|.next)/**/!(test).*',
    LOCALE_LIST: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN', 'ru-RU', 'fr-FR', 'de-DE'],
    SMARTLING_API_KEY: '7941b3ff-0744-4f62-b39c-076babb8c32a',
    SMARTLING_PROJECT_ID: 'f1b36b513',
    SMARTLING_API_URL: 'https://api.smartling.com/v1',
    SMARTLING_LOCALE_FILE: 'aa_react.po',
    LOCALE_JSON_FILE: 'aa_react.json',
};

module.exports = CONFIG;
