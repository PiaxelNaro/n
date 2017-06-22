import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReportHeader from '.';

storiesOf('ReportHeader', module)
    .add('Dashboard Report Header', () => (
        <ReportHeader
            subtitle="subsub title"
            title="Titletitle"
            link={{
                text: 'About this report',
                url: 'https://www.google.com',
            }}
        />
    ))
    .add('Report Header Without Subtitle', () => (
        <ReportHeader
            title="Titletitle"
            link={{
                text: 'About this report',
                url: 'https://www.google.com',
            }}
        />
    ));
