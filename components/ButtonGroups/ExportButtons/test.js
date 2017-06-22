// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ExportButtons from '.';

describe('<ExportButtons>', () => {
    it('renders button', () => {
        const links = {
            csv: 'testCsv',
            xlsx: 'testXlsx',
        };
        const buttons = shallow(
            <ExportButtons csvLink={links.csv} xlsxLink={links.xlsx} />
        );

        expect(buttons).toMatchSnapshot();
    });
});
