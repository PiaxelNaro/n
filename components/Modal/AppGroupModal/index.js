// @flow
import React from 'react';
import styled from 'styled-components';
import ClickOutside from 'react-click-outside';
import MdPlusCircle from 'react-icons/lib/md/control-point';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../BasicModal';
import Button from '../../Button';
import FlexGrid from '../../FlexGrid';
import Spinner from '../../Spinner';
import AppList from './AppList';
import AppGroup, { type AppGroupObject } from './AppGroup';
import { translate, sprintf, type I18nType } from '../../../modules/i18n';

const StyledModalBody = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    overflow-y: auto;
    padding: 15px;

    & > :nth-child(n + 2) {
        margin-top: 15px;
    }
`;

const StyledGroupListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 -15px;
`;

const CenteredModalBody = styled(FlexGrid)`
    height: 100%;
    justify-content: center;
`;

const CreateGroupButton = styled(Button.Blank)`
    color: #3F88D4;
`;

const StyledInputWrapper = styled.input`
    color: #2F4B66;
    height: 27px;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-size: 13px;
`;

const ErrorWrapper = styled.div`
    border-radius: 4px;
    padding: 10px;
    background-color: #F2DEDE;
    border: 1px solid #B94B49;
    color: #B94B49;
`;

const AppGroupModal = class extends React.Component {
    props: {
        apps: Array<Object>,
        groupsPromise: Promise<Array<AppGroupObject>>,
        createGroup: string => any,
        addAppsToGroup: (number, Array<number>) => any,
        onRequestClose: () => any,
        i18n: I18nType,
    };

    state: {
        showFooterActions: boolean,
        loading: boolean,
        error: boolean,
        groups: Array<AppGroupObject>,
        groupLoading: { [number]: boolean },
    };

    toggleFooter: Function;
    onKeyPress: Function;
    addAppsToGroup: Function;

    constructor() {
        super();

        this.state = {
            showFooterActions: true,
            loading: true,
            error: false,
            groups: [],
            groupLoading: {},
        };

        this.toggleFooter = this.toggleFooter.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.addAppsToGroup = this.addAppsToGroup.bind(this);
    }

    componentDidMount() {
        this.props.groupsPromise.then(
            groups => {
                this.setState({ loading: false, error: false, groups });
            },
            () => {
                this.setState({ loading: false, error: true });
            }
        );
    }

    toggleFooter() {
        this.setState(prevState => ({
            showFooterActions: !prevState.showFooterActions,
        }));
    }

    onKeyPress(event: SyntheticInputEvent) {
        const { gettext } = this.props.i18n;

        if (event.key === 'Enter') {
            const groupName = event.target.value;
            const tmpId = String(Math.random());
            this.setState(state => ({
                groupLoading: {
                    ...state.groupLoading,
                    [tmpId]: true,
                },
                groups: [
                    ...state.groups,
                    {
                        id: tmpId,
                        name: groupName,
                        apps: [],
                    },
                ],
            }));
            this.props.createGroup(groupName).then(
                newGroup => {
                    this.setState(state => ({
                        groupLoading: {
                            ...state.groupLoading,
                            [tmpId]: false,
                        },
                        groups: state.groups.map(group => {
                            if (group.id !== tmpId) {
                                return group;
                            }
                            return newGroup;
                        }),
                    }));
                },
                () => {
                    this.setState(state => ({
                        error: sprintf(
                            gettext('Unable to create "%s". Please try again later.'),
                            groupName
                        ),
                        groupLoading: {
                            ...state.groupLoading,
                            [tmpId]: false,
                        },
                        groups: state.groups.filter(({ id }) => id !== tmpId),
                    }));
                }
            );
            this.toggleFooter();
        }
    }

    setGroupLoading(groupId: number, isLoading: boolean) {
        this.setState(state => ({
            groupLoading: {
                ...state.groupLoading,
                [groupId]: isLoading,
            },
        }));
    }

    updateGroup(newGroups: AppGroupObject) {
        this.setState(state => ({
            groups: state.groups.map(group => {
                if (newGroups[group.id]) {
                    return newGroups[group.id];
                }
                return group;
            }),
        }));
    }

    addAppsToGroup(groupId: number, appIds: Array<number>) {
        this.setGroupLoading(groupId, true);

        this.props.addAppsToGroup(groupId, appIds).then(
            groups => {
                this.updateGroup(groups);
                this.setGroupLoading(groupId, false);
            },
            () => {
                this.setState({ error: true });
                this.setGroupLoading(groupId, false);
            }
        );
    }

    render() {
        const { apps, onRequestClose } = this.props;
        const { gettext } = this.props.i18n;

        let error;
        if (this.state.error) {
            let msg = gettext('Something went wrong. Please try again later.');
            if (typeof this.state.error === 'string') {
                msg = this.state.error;
            }
            error = <ErrorWrapper>{msg}</ErrorWrapper>;
        }

        let body;
        if (this.state.loading) {
            body = (
                <FlexGrid.Item flex={1}>
                    <CenteredModalBody gutter="5px">
                        <Spinner size={16} />
                        <span>{gettext('Loading data')}</span>
                    </CenteredModalBody>
                </FlexGrid.Item>
            );
        } else {
            const appIds = apps.map(app => app.id);
            body = (
                <StyledGroupListWrapper>
                    {this.state.groups.map(group =>
                        <AppGroup
                            key={group.id}
                            group={group}
                            appIds={appIds}
                            addToGroup={this.addAppsToGroup}
                            isLoading={Boolean(this.state.groupLoading[group.id])}
                            i18n={this.props.i18n}
                        />
                    )}
                </StyledGroupListWrapper>
            );
        }

        let footer;
        if (this.state.showFooterActions) {
            footer = (
                <FlexGrid>
                    <FlexGrid.Item>
                        <CreateGroupButton
                            onClick={this.toggleFooter}
                            className="js-create-group"
                        >
                            <FlexGrid gutter="3px">
                                <MdPlusCircle size={16} />
                                <span>
                                    {gettext('Create a new group')}
                                </span>
                            </FlexGrid>
                        </CreateGroupButton>
                    </FlexGrid.Item>
                    <Button.Primary onClick={onRequestClose}>
                        {gettext('Done')}
                    </Button.Primary>
                </FlexGrid>
            );
        } else {
            footer = (
                <ClickOutside onClickOutside={this.toggleFooter}>
                    <StyledInputWrapper
                        autoFocus
                        maxLength="50"
                        placeholder={gettext('Give your group a name and press enter')}
                        onKeyPress={this.onKeyPress}
                    />
                </ClickOutside>
            );
        }

        return (
            <Modal isOpen onRequestClose={onRequestClose}>
                <ModalHeader
                    title={gettext('Add to your group')}
                    onRequestClose={onRequestClose}
                />
                <ModalBody>
                    <StyledModalBody>
                        {error}
                        <AppList apps={apps} i18n={this.props.i18n} />
                        {body}
                    </StyledModalBody>
                </ModalBody>
                <ModalFooter>{footer}</ModalFooter>
            </Modal>
        );
    }
};

export { AppGroupModal as _AppGroupModal };
export default translate(AppGroupModal);
