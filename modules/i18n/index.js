// @flow
import { sprintf } from 'jed';
import I18nProvider from './I18nProvider';
import translate from './translate';
import { localizePage } from './localizePage';
import { LANG_MAP } from './util';

export type I18nType = {
    lang: string,
    gettext: string => string,
    pgettext: (string, string) => string,
    ngettext: (string, string, number) => string,
    npgettext: (string, string, string, number) => string,
};

export { I18nProvider, translate, localizePage, sprintf, LANG_MAP };