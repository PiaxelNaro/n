// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Spinner from '.';

storiesOf('Spinner', module).add('sizing', () => (
    <div>
        <Spinner size={10} />
        <Spinner size={20} />
        <Spinner size={30} />
        <Spinner size={40} />
        <Spinner size={50} />
    </div>
));
