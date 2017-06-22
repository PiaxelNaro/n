// @flow
import React from 'react';
import Button from '../../Button';
import FlexGrid, { ColumnGrid } from '../../FlexGrid';
import AppGroupModal from '.';
import { type AppGroupObject } from './AppGroup';
import apps from '../../../data/apps';
import mockI18n from '../../../modules/i18n/mockI18n';

const groups = [
    {
        id: 0,
        name: 'My Group',
        link:
            'https://www..com/intelligence/apps/comparator/?group_id=90300000036979&platform=all&countries=CN&granularity=daily&date=2017-04-04~2017-05-05',
        apps: [apps[0], apps[1]],
    },
    {
        id: 1,
        name: 'Favorite',
        link:
            'https://www..com/intelligence/apps/comparator/?group_id=90300000036979&platform=all&countries=CN&granularity=daily&date=2017-04-04~2017-05-05',
        apps: [apps[1], apps[2]],
    },
    {
        id: 2,
        name: 'Favorite 2',
        link:
            'https://www..com/intelligence/apps/comparator/?group_id=90300000036979&platform=all&countries=CN&granularity=daily&date=2017-04-04~2017-05-05',
        apps: [],
    },
];

class AppGroupModalStory extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
            loadFailure: false,
            ajaxFailure: false,
            selectedApps: [],
            appGroups: groups.reduce(
                (m, group) => ({
                    ...m,
                    [group.id]: group,
                }),
                {}
            ),
        };

        this.createGroup = this.createGroup.bind(this);
        this.addAppsToGroup = this.addAppsToGroup.bind(this);
        this.selectApp = this.selectApp.bind(this);
    }

    state: {
        open: boolean,
        loadFailure: boolean,
        ajaxFailure: boolean,
        selectedApps: Array<Object>,
        appGroups: { [number]: AppGroupObject },
    };

    createGroup: Function;
    addAppsToGroup: Function;
    selectApp: Function;

    createGroup(groupName: string) {
        const group = {
            id: String(Math.random()),
            name: groupName,
            apps: [],
        };

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.state.ajaxFailure) {
                    reject();
                } else {
                    this.setState(state => ({
                        appGroups: {
                            ...state.appGroups,
                            [group.id]: group,
                        },
                    }));
                    resolve(group);
                }
            }, 2000);
        });
    }

    addAppsToGroup(groupId: number, appIds: Array<number>) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.state.ajaxFailure) {
                    reject();
                } else {
                    const prevGroup = this.state.appGroups[groupId];
                    const group = {
                        ...prevGroup,
                        apps: [...prevGroup.apps.map(({ id }) => id), ...appIds]
                            .filter((id, index, self) => self.indexOf(id) === index)
                            .map(appId => apps.find(({ id }) => id === appId)),
                    };
                    this.setState(state => ({
                        appGroups: {
                            ...state.appGroups,
                            [group.id]: group,
                        },
                    }));
                    resolve({ [group.id]: group });
                }
            }, 2000);
        });
    }

    getGroups() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.state.loadFailure) {
                    reject();
                } else {
                    resolve(Object.values(this.state.appGroups));
                }
            }, 2000);
        });
    }

    selectApp(event: SyntheticInputEvent) {
        const appId = parseFloat(event.target.value);
        const app = apps.find(({ id }) => id === appId);

        if (event.target.checked) {
            this.state.selectedApps.push(app);
        } else {
            const filteredApps = this.state.selectedApps.filter(
                selectedApp => selectedApp.id !== appId
            );
            this.setState({
                selectedApps: filteredApps,
            });
        }
    }

    render() {
        const appCheckboxes = apps.map(app =>
            <label key={app.id}>
                <FlexGrid gutter="3px">
                    <input
                        type="checkbox"
                        name="app"
                        onClick={e => this.selectApp(e)}
                        value={app.id}
                    />
                    <img src={app.icon} width="34" height="34" alt="" />
                </FlexGrid>
            </label>
        );

        const currentGroups = Object.values(this.state.appGroups).map((group: any) => {
            const groupApps = group.apps.map(app =>
                <img src={app.icon} width="34" height="34" alt="" key={app.id} />
            );

            return (
                <FlexGrid key={group.id} gutter="3px">
                    {group.name}: {groupApps}
                </FlexGrid>
            );
        });

        let modal;
        if (this.state.open) {
            modal = (
                <AppGroupModal
                    apps={this.state.selectedApps}
                    onRequestClose={() => this.setState({ open: false })}
                    groupsPromise={this.getGroups()}
                    createGroup={this.createGroup}
                    addAppsToGroup={this.addAppsToGroup}
                    i18n={mockI18n}
                />
            );
        }

        return (
            <ColumnGrid gutter="16px">
                <div>
                    <h3>All Apps:</h3>
                    <FlexGrid gutter="10px">
                        {appCheckboxes}
                    </FlexGrid>
                </div>
                <div>
                    <Button.Primary
                        onClick={() => this.setState(state => ({ open: !state.open }))}
                    >
                        Add To Group
                    </Button.Primary>
                </div>
                <div>
                    <h3>Current Groups:</h3>
                    {currentGroups}
                </div>
                <div>
                    <h3>Force status:</h3>
                    <div>
                        <label>
                            Load failure:
                            <input
                                type="checkbox"
                                onChange={e =>
                                    this.setState({ loadFailure: e.target.checked })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Ajax failure:
                            <input
                                type="checkbox"
                                onChange={e =>
                                    this.setState({ ajaxFailure: e.target.checked })}
                            />
                        </label>
                    </div>
                </div>
                {modal}
            </ColumnGrid>
        );
    }
}

export default AppGroupModalStory;
