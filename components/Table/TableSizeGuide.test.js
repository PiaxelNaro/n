// @flow

import React from 'react';
import { shallow } from 'enzyme';
import TableSizeGuide from './TableSizeGuide';
import { normalizeColumn } from './utils';

describe('<TableSizeGuide />', () => {
    it('set weight and min-width to table cells', () => {
        const columns = [
            { key: '1', size: ['auto'] },
            { key: '2', size: ['extraSmall'] },
            { key: '3', size: ['small'] },
            { key: '4', size: ['medium'] },
            { key: '5', size: ['large'] },
            { key: '6', size: ['extraLarge'] },
            {
                subColumns: [
                    { key: '7', size: ['auto'] },
                    { key: '8', size: ['extraSmall'] },
                    { key: '9', size: ['small'] },
                    { key: '10', size: ['medium'] },
                    { key: '11', size: ['large'] },
                    { key: '12', size: ['extraLarge'] },
                ],
            },
        ].map(normalizeColumn);

        expect(shallow(<TableSizeGuide columns={columns} />)).toMatchSnapshot();
    });
});
