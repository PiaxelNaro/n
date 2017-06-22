// @flow
import React from 'react';
import invert from 'lodash/invert';

import { LANG_MAP } from '../../modules/i18n';
import TagList from '../TagList';

const ISO_LANG_MAP: Object = invert(LANG_MAP);

const onLanguageChange = (lang: string) => {
    const location = global.location;
    const pathname = location.pathname;
    const search = location.search;
    const hash = location.hash;
    const next = encodeURIComponent(`${pathname}${search}${hash}`);
    const shorthandLang = ISO_LANG_MAP[lang];
    const url = `/i18n/activate/${shorthandLang}/?next=${next}`;

    location.assign(url);
};

const LanguageSelector = ({
    current,
    languages,
}: {
    current: string,
    languages: Array<{
        code: string,
        label: string,
    }>,
}) =>
    <TagList
        items={languages.map(({ code, label }) => ({
            id: code,
            name: label,
        }))}
        current={current}
        onChange={onLanguageChange}
    />;

export default LanguageSelector;
