import React from 'react';
import { shallow } from 'enzyme';

import ReportHeader from '.';

describe('<ReportHeader>', () => {
    it('Render UI', () => {
        const reportHeader = shallow(
            <ReportHeader
                subtitle="SUBSUB TITLE"
                title="Titletitle"
                link={{
                    text: 'About this report',
                    url: 'https://www.google.com',
                }}
            />
        );
        expect(reportHeader).toMatchSnapshot();
    });
});
