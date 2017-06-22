// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { _AppGroupModal as AppGroupModal } from '.';
import mockI18n from '../../../modules/i18n/mockI18n';

describe('<AppGroupModal>', () => {
    it('handles group loading lifecycle', () => {
        let successCallback = jest.fn();
        let failureCallback = jest.fn();
        const fakePromise: any = {
            then: (success: Function, failure: Function) => {
                successCallback = success;
                failureCallback = failure;
            },
        };
        const modal = shallow(
            <AppGroupModal
                apps={[{ id: 0 }]}
                onRequestClose={jest.fn()}
                groupsPromise={fakePromise}
                createGroup={jest.fn()}
                addAppsToGroup={jest.fn()}
                i18n={mockI18n}
            />
        );
        modal.instance().componentDidMount();

        // 1. Component in loading state
        expect(modal.find('Spinner').exists()).toBeTruthy();

        // 2. Component in failure state
        failureCallback();
        expect(modal.find('AppGroupModal__ErrorWrapper').exists()).toBeTruthy();

        // 3. Component in success mode
        successCallback([
            {
                id: 1,
                name: 'Group 1',
                link: '/group-1',
                apps: [],
            },
        ]);
        expect(modal.find('AppGroup').exists()).toBeTruthy();
    });

    it('allows creating new groups', () => {
        let successCallback = jest.fn();
        const createGroupFn = jest.fn(() => ({
            then: success => {
                successCallback = success;
            },
        }));
        const fakePromise: any = {
            then: cb => {
                cb([
                    {
                        id: 1,
                        name: 'Group 1',
                        link: '',
                        apps: [],
                    },
                ]);
            },
        };
        const modal = shallow(
            <AppGroupModal
                apps={[{ id: 0 }]}
                onRequestClose={jest.fn()}
                groupsPromise={fakePromise}
                createGroup={createGroupFn}
                addAppsToGroup={jest.fn()}
                i18n={mockI18n}
            />
        );
        modal.instance().componentDidMount();
        expect(modal).toMatchSnapshot();

        modal.find('.js-create-group').simulate('click');
        modal.update();
        expect(modal).toMatchSnapshot();

        const input = modal.find('AppGroupModal__StyledInputWrapper');

        // No-op if the input is empty
        input.simulate('keyPress', { key: 'Test' });
        expect(createGroupFn).not.toHaveBeenCalled();

        input.simulate('keyPress', { key: 'Enter', target: { value: 'test' } });
        expect(createGroupFn).toHaveBeenCalledWith('test');

        // Loading state
        modal.update();
        let groups = modal.find('AppGroup');
        expect(groups.length).toEqual(2);
        expect(groups.at(0).prop('isLoading')).toBe(false);
        expect(groups.at(1).prop('isLoading')).toBe(true);

        // Success state
        successCallback({
            id: 2,
            name: 'Group 2',
            link: '',
            apps: [],
        });
        modal.update();
        groups = modal.find('AppGroup');
        expect(groups.length).toEqual(2);
        expect(groups.at(0).prop('isLoading')).toBe(false);
        expect(groups.at(1).prop('isLoading')).toBe(false);
    });

    it('handles failure to create group', () => {
        let errorCallback = jest.fn();
        const createGroupFn = jest.fn(() => ({
            then: (success, error) => {
                errorCallback = error;
            },
        }));
        const fakePromise: any = {
            then: cb => {
                cb([
                    {
                        id: 1,
                        name: 'Group 1',
                        link: '',
                        apps: [],
                    },
                ]);
            },
        };
        const modal = shallow(
            <AppGroupModal
                apps={[{ id: 0 }]}
                onRequestClose={jest.fn()}
                groupsPromise={fakePromise}
                createGroup={createGroupFn}
                addAppsToGroup={jest.fn()}
                i18n={mockI18n}
            />
        );
        modal.instance().componentDidMount();

        modal.find('.js-create-group').simulate('click');
        modal.update();
        const input = modal.find('AppGroupModal__StyledInputWrapper');
        input.simulate('keyPress', { key: 'Enter', target: { value: 'test' } });
        expect(createGroupFn).toHaveBeenCalledWith('test');

        // Error state
        errorCallback();
        modal.update();
        expect(modal.find('AppGroup').length).toEqual(1);
        expect(modal.find('AppGroupModal__ErrorWrapper').exists()).toBe(true);
    });

    it('allows adding apps to a group', () => {
        let successCallback = jest.fn();
        let errorCallback = jest.fn();
        const addAppsToGroup = jest.fn(() => ({
            then: (success, error) => {
                successCallback = success;
                errorCallback = error;
            },
        }));
        const fakePromise: any = {
            then: cb => {
                cb([
                    {
                        id: 1,
                        name: 'Group 1',
                        link: '',
                        apps: [],
                    },
                    {
                        id: 2,
                        name: 'Group 2',
                        link: '',
                        apps: [],
                    },
                ]);
            },
        };
        const modal = shallow(
            <AppGroupModal
                apps={[{ id: 0 }]}
                onRequestClose={jest.fn()}
                groupsPromise={fakePromise}
                createGroup={jest.fn()}
                addAppsToGroup={addAppsToGroup}
                i18n={mockI18n}
            />
        );
        modal.instance().componentDidMount();

        modal.find('AppGroup').at(0).prop('addToGroup')(1, [0]);
        expect(addAppsToGroup).toHaveBeenCalledWith(1, [0]);
        expect(modal.find('AppGroup').at(0).prop('group').apps.length).toEqual(0);

        // Loading state
        modal.update();
        expect(modal.find('AppGroup').at(0).prop('isLoading')).toBe(true);
        expect(modal.find('AppGroup').at(1).prop('isLoading')).toBe(false);

        // Error state
        errorCallback();
        modal.update();
        expect(modal.find('AppGroup').at(0).prop('isLoading')).toBe(false);
        expect(modal.find('AppGroupModal__ErrorWrapper').exists()).toBe(true);

        // Success state
        successCallback({
            '1': {
                id: 1,
                name: 'Group 1',
                link: '',
                apps: [{ id: 0 }],
            },
        });
        modal.update();
        expect(modal.find('AppGroup').at(0).prop('isLoading')).toBe(false);
        expect(modal.find('AppGroup').at(0).prop('group').apps.length).toEqual(1);
        expect(modal.find('AppGroup').at(1).prop('group').apps.length).toEqual(0);
    });
});
