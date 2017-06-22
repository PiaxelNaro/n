// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BasicModalStory from './BasicModal/storyComponent';
import AppGroupModalStory from './AppGroupModal/storyComponent';

storiesOf('Modal', module)
    .add('Basic Modal', () => <BasicModalStory />)
    .add('AppGroup Modal', () => <AppGroupModalStory />);
