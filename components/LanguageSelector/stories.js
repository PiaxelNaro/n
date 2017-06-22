// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LanguageSelector from '.';
import languages from '../../data/languages';

storiesOf('LanguageSelector', module).add('render language selector', () =>
    <LanguageSelector languages={languages} current={'en-US'} />
);
