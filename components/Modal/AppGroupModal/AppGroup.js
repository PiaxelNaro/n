// @flow
import React from 'react';
import styled from 'styled-components';
import FaCheckCircle from 'react-icons/lib/fa/check-circle-o';
import MdPlusCircle from 'react-icons/lib/md/control-point';
import Button from '../../Button';
import FlexGrid from '../../FlexGrid';
import Text from '../../Text';
import Spinner from '../../Spinner';
import { sprintf, type I18nType } from '../../../modules/i18n';

export type AppGroupObject = {
    id: number,
    link: string,
    name: string,
    apps: Array<{ id: number }>,
};

const StyledGroupWrapper = styled.li`
    padding: 5px 15px;
    height: 30px;
    line-height: 30px;
    color: #102235;
    font-size: 13px;
    :hover {
        background-color: whiteSmoke;
        .action-context {
           display: none;
        }
        .action-button {
           display: block;
        }
    }

    .action-button {
        display: none;
    }
`;

const Link = styled.a`
    color: #102235;
    text-decoration: none;
`;

const StyledGroupAppsCount = styled.span`
    margin: 0px 5px;
    color: #797979;
    white-space: nowrap;
`;

const AppGroup = ({
    group,
    appIds,
    addToGroup,
    isLoading = false,
    i18n,
}: {
    group: AppGroupObject,
    appIds: Array<number>,
    addToGroup: (number, Array<number>) => void,
    isLoading?: boolean,
    i18n: I18nType,
}) => {
    const { gettext, ngettext } = i18n;
    const selectedAppsCount = appIds.length;
    const addedAppsCount = group.apps.filter(app => appIds.includes(app.id)).length;
    let groupAction = null;
    const addAppsToGroups = () => addToGroup(group.id, appIds);

    /**
     * Three conditions of adding selected apps to group
     *  1. None added
     *  2. All Added
     *  3. Partial added
     */
    if (isLoading) {
        groupAction = <Spinner size={16} />;
    } else if (!addedAppsCount) {
        groupAction = (
            <div>
                <span className="action-context">
                    <MdPlusCircle size="16" color="#3F88D4" />
                </span>
                <span className="action-button">
                    <Button.Secondary onClick={addAppsToGroups}>
                        {gettext('Add To Group')}
                    </Button.Secondary>
                </span>
            </div>
        );
    } else if (selectedAppsCount === addedAppsCount) {
        groupAction = (
            <div>
                <FlexGrid inline className="action-context">
                    <StyledGroupAppsCount>
                        {gettext('All added')}
                    </StyledGroupAppsCount>
                    <FaCheckCircle size="16" color="#00BFAA" />
                </FlexGrid>
                <span className="action-button">
                    <Button.Secondary href={group.link}>
                        {gettext('Go To Group')}
                    </Button.Secondary>
                </span>
            </div>
        );
    } else {
        groupAction = (
            <div>
                <FlexGrid inline className="action-context">
                    <StyledGroupAppsCount>
                        {sprintf(gettext('%d already added'), addedAppsCount)}
                    </StyledGroupAppsCount>
                    <MdPlusCircle size="16" color="#3F88D4" />
                </FlexGrid>
                <span className="action-button">
                    <Button.Secondary onClick={addAppsToGroups}>
                        {gettext('Add Remaining')}
                    </Button.Secondary>
                </span>
            </div>
        );
    }

    return (
        <StyledGroupWrapper>
            <FlexGrid>
                <FlexGrid.Item>
                    <FlexGrid>
                        <Text ellipsis>
                            <Link href={group.link}>
                                {group.name}
                            </Link>
                        </Text>
                        <StyledGroupAppsCount>
                            {sprintf(
                                ngettext('(%d app)', '(%d apps)', group.apps.length),
                                group.apps.length
                            )}
                        </StyledGroupAppsCount>
                    </FlexGrid>
                </FlexGrid.Item>
                {groupAction}
            </FlexGrid>
        </StyledGroupWrapper>
    );
};

export default AppGroup;
