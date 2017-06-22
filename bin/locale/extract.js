/**
 * Document https://github.com/lukasgeiter/gettext-extractor/wiki
 * Support JS/Html/Attribute Extractors
 **/

const { GettextExtractor, JsExtractors } = require('gettext-extractor');

const { ensureDir, getLocalePath } = require('./util');
const { LOCALE_LIST, EXTRACT_GLOB } = require('./config');

const extractor = new GettextExtractor();

function extract() {
    extractor
        .createJsParser([
            JsExtractors.callExpression(
                [
                    'gettext',
                    'i18n.gettext',
                    'props.i18n.gettext',
                    'this.props.i18n.gettext',
                ],
                {
                    arguments: {
                        text: 0,
                    },
                }
            ),
            JsExtractors.callExpression(
                [
                    'pgettext',
                    'i18n.pgettext',
                    'props.i18n.pgettext',
                    'this.props.i18n.pgettext',
                ],
                {
                    arguments: {
                        context: 0,
                        text: 1,
                    },
                }
            ),
            JsExtractors.callExpression(
                [
                    'ngettext',
                    'i18n.ngettext',
                    'props.i18n.ngettext',
                    'this.props.i18n.ngettext',
                ],
                {
                    arguments: {
                        text: 0,
                        textPlural: 1,
                    },
                }
            ),
            JsExtractors.callExpression(
                [
                    'npgettext',
                    'i18n.npgettext',
                    'props.i18n.npgettext',
                    'this.props.i18n.npgettext',
                ],
                {
                    arguments: {
                        context: 0,
                        text: 1,
                        textPlural: 2,
                    },
                }
            ),
        ])
        .parseFilesGlob(EXTRACT_GLOB);

    LOCALE_LIST.forEach(localeName => {
        // copy the same empty po query file to each locale folder
        const lPath = getLocalePath(localeName);
        ensureDir(lPath);
        extractor.savePotFile(lPath);
    });

    extractor.printStats();
}

module.exports = extract;
