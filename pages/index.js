// @flow
import React from 'react';
import withRedux from 'next-redux-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createStore from '../store';
import PageLayout from '../containers/PageLayout';
import withUser from '../modules/user/withUser';
import { localizePage } from '../modules/i18n';
import DatePickerExampleSimple from '../components/date/MuiDatePicker';
import TableExampleControlled from '../containers/Table';

const Page = () =>
    <PageLayout>
        <h3>main content</h3>
        <MuiThemeProvider>
            <DatePickerExampleSimple />
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TableExampleControlled />
        </MuiThemeProvider>
    </PageLayout>;

export default withRedux(createStore)(withUser(localizePage(Page)));
