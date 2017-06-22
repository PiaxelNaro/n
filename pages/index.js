// @flow
import React from 'react';
import withRedux from 'next-redux-wrapper';
import createStore from '../store';

import PageLayout from '../containers/PageLayout';
import withUser from '../modules/user/withUser';
import { localizePage } from '../modules/i18n';

const Page = () =>
    <PageLayout>
        <div style={{
          height: '300px',
        }}>main content</div>
    </PageLayout>;

export default withRedux(createStore)(withUser(localizePage(Page)));
