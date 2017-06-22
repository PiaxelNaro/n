import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Text from '.';

const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
storiesOf('Text', module).add('Ellipsis Text', () => (
    <div style={{ width: '200px' }}>
        <Text color="red" ellipsis>{lorem}</Text>
    </div>
));
