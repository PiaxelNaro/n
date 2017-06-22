// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import LockIcon from 'react-icons/lib/md/lock-outline';
import AAIcon from '../../components/AAIcon';
import FlexGrid from '../../components/FlexGrid';

const Wrapper = styled.a`
    display: block;
    padding: 5px 15px;
    text-decoration: none;
    cursor: pointer;
    color: #F2F2F2;
    &:hover,
    &:focus {
        background-color: #233140;
    };
    &.is-active {
        background-color: #2f669f;
    };
`;

const Version = styled.div`
    margin: 0 0 0 5px;
    font-size: 9px;
    color: #3f88d4;
    text-transform: uppercase;
`;

const Link = ({
    onClick,
    icon,
    isActive = false,
    isBeta,
    isNew,
    isLocked,
    isConnected,
    children,
}: {
    onClick?: () => void,
    icon?: any,
    isActive?: boolean,
    isBeta?: boolean,
    isNew?: boolean,
    isLocked?: boolean,
    isConnected?: boolean,
    children?: any,
}) => {
    let _onClick = null;
    if (!isLocked) {
        _onClick = onClick;
    }
    const classes = classnames({
        'is-active': isActive,
    });

    return (
        <Wrapper className={classes} onClick={_onClick}>
            <FlexGrid gutter="2px">
                {icon}
                <FlexGrid.Item>
                    <FlexGrid>
                        {children}
                        <Version>
                            {isBeta ? 'beta' : ''}
                            {isNew ? 'new' : ''}
                        </Version>
                    </FlexGrid>
                </FlexGrid.Item>
                {isLocked ? <LockIcon size="14" /> : ''}
                {isConnected ? <AAIcon name="aa-connections" /> : ''}
            </FlexGrid>
        </Wrapper>
    );
};

export default Link;
