// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Footer from '.';

import data from '../../data/footer';

storiesOf('Footer', module).add('render footer', () => <Footer content={data} />);
