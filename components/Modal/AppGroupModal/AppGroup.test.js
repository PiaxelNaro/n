// @flow
import React from 'react';
import { shallow } from 'enzyme';
import AppGroup from './AppGroup';
import mockI18n from '../../../modules/i18n/mockI18n';

describe('<AppGroup>', () => {
    it('renders enabled group', () => {
        const fn = jest.fn();
        const groupList = shallow(
            <AppGroup
                appIds={[3, 4]}
                group={{
                    id: 1,
                    name: 'Group 1',
                    link: '/group-1',
                    apps: [{ id: 1 }, { id: 2 }],
                }}
                addToGroup={fn}
                i18n={mockI18n}
            />
        );
        expect(groupList).toMatchSnapshot();

        groupList.find('ButtonSecondary').simulate('click');
        expect(fn).toHaveBeenCalledWith(1, [3, 4]);
    });

    it('renders in loading mode', () => {
        expect(
            shallow(
                <AppGroup
                    isLoading
                    appIds={[3, 4]}
                    group={{
                        id: 1,
                        name: 'Group 1',
                        link: '/group-1',
                        apps: [{ id: 1 }, { id: 2 }],
                    }}
                    addToGroup={jest.fn()}
                    i18n={mockI18n}
                />
            )
        ).toMatchSnapshot();
    });

    it('renders in partially added mode', () => {
        expect(
            shallow(
                <AppGroup
                    appIds={[3, 4]}
                    group={{
                        id: 1,
                        name: 'Group 1',
                        link: '/group-1',
                        apps: [{ id: 1 }, { id: 3 }],
                    }}
                    addToGroup={jest.fn()}
                    i18n={mockI18n}
                />
            )
        ).toMatchSnapshot();
    });

    it('renders in all added mode', () => {
        expect(
            shallow(
                <AppGroup
                    appIds={[3, 4]}
                    group={{
                        id: 1,
                        name: 'Group 1',
                        link: '/group-1',
                        apps: [{ id: 3 }, { id: 4 }],
                    }}
                    addToGroup={jest.fn()}
                    i18n={mockI18n}
                />
            )
        ).toMatchSnapshot();
    });
});
