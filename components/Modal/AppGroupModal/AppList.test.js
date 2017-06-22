// @flow
import React from 'react';
import { shallow } from 'enzyme';
import AppList from './AppList';
import apps from '../../../data/apps';
import mockI18n from '../../../modules/i18n/mockI18n';

describe('<AppList>', () => {
    it('test appList', () => {
        let appList = shallow(<AppList apps={apps} i18n={mockI18n} />);
        expect(appList).toMatchSnapshot();
        expect(appList.find('AppIcon').length).toBe(9);
        expect(appList.find('.js-more-apps-marker').length).toBe(1);

        appList = shallow(<AppList apps={apps.slice(0, 5)} i18n={mockI18n} />);
        expect(appList).toMatchSnapshot();
        expect(appList.find('AppIcon').length).toBe(5);
        expect(appList.find('.js-more-apps-marker').length).toBe(0);
    });
});
