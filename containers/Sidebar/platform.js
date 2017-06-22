// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import AAIcon from '../../components/AAIcon';

import Text from '../../components/Text';
import Link from './link';

export type NavItem = {
    id: string,
    title: string,
    href?: string,
    isNew?: boolean,
    isBeta?: boolean,
    isLocked?: boolean,
    isConnected?: boolean,
    isVisible?: boolean,
};

const GroupItem = styled(Text)`
    padding-left: 15px;
`;

const NavGroupWrapper = styled.div`
    margin: 0 0 10px;
`;

const NavGroupTitle = styled(Text)`
    margin: 10px 0 0;
    padding: 5px 15px 5px 30px;
    color: #818A94;
    text-transform: uppercase;
    font-size: 10px;
`;

export const NavGroup = ({
    title,
    current,
    items,
    onClick,
}: {
    title: string,
    current: string,
    items: Array<NavItem>,
    onClick: any => void,
}) => {
    let GroupTitle;
    if (title) {
        GroupTitle = (
            <NavGroupTitle ellipsis className="AASidebar-group-title">
                {title}
            </NavGroupTitle>
        );
    }

    return (
        <NavGroupWrapper className="AASidebar-group">
            {GroupTitle}
            {items.map(item =>
                <Link
                    key={item.title}
                    isActive={current === item.id}
                    isNew={item.isNew}
                    isBeta={item.isBeta}
                    isConnected={item.isConnected}
                    isLocked={item.isLocked}
                    onClick={() => onClick(item.href)}
                >
                    <GroupItem ellipsis>
                        {item.title}
                    </GroupItem>
                </Link>
            )}
        </NavGroupWrapper>
    );
};

const Wrapper = styled.div`
    margin: 0 0 10px 0;
`;

const Content = styled.div`
    opacity: 1;
    max-height: 1000px;
    overflow: hidden;
    visibility: visible;
    transition: all 0.2s ease-in;
    &.collapse {
        max-height: 0;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in;
    }
`;

const PlatformTitle = styled(Text)`
    color: #818a94;
    text-transform: uppercase;
    font-size: 12px;
`;

class Platform extends React.Component {
    constructor() {
        super();
        this.state = {
            collapse: false,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    props: {
        current: string,
        title: string,
        navGroup: Array<{ id: string, title: string, items: Array<NavItem> }>,
        onClick: string => void,
    };

    state: {
        collapse: boolean,
    };

    toggleCollapse: Function;

    toggleCollapse() {
        this.setState({
            collapse: Boolean(!this.state.collapse),
        });
    }

    render() {
        const { title, navGroup } = this.props;
        const classes = classnames({
            collapse: this.state.collapse,
        });

        let arrowIcon = <AAIcon name="aa-caret-down" />;
        if (this.state.collapse) {
            arrowIcon = <AAIcon name="aa-caret-right" />;
        }

        return (
            <Wrapper className={`AASidebar-platform ${classes}`}>
                <Link
                    icon={arrowIcon}
                    className="AASidebar-platform-title"
                    onClick={this.toggleCollapse}
                >
                    <PlatformTitle ellipsis>{title}</PlatformTitle>
                </Link>
                <Content className={`AASidebar-platform-content ${classes}`}>
                    {navGroup &&
                        navGroup.map(group =>
                            <NavGroup
                                key={group.id}
                                title={group.title}
                                current={this.props.current}
                                items={group.items}
                                onClick={this.props.onClick}
                            />
                        )}
                </Content>
            </Wrapper>
        );
    }
}

export default Platform;
NavGroup.displayName = 'NavGroup';
