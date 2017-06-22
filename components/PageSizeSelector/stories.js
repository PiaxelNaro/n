import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PageSizeSelector from '.';
import mockI18n from '../../modules/i18n/mockI18n';

storiesOf('PageSizeSelector', module)
    .add('Default options', () => (
        <PageSizeSelector
            current={100}
            onSelectionChanged={action('onSelectionChanged')}
            i18n={mockI18n}
        />
    ))
    .add('Customized options', () => (
        <PageSizeSelector
            options={[10, 50, 100]}
            current={50}
            onSelectionChanged={action('onSelectionChanged')}
            i18n={mockI18n}
        />
    ));
