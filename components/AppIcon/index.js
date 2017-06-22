// @flow
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import FlexGrid from '../FlexGrid';

/**
 * <AppIcon/>
 * @param {String} src
 * @param {String} size big | small | medium
 * @param {String} store
 * @param {Boolean} showStoreIcon show store icon at the bottom right
 * @example  <AppIcon size={size} store={store} showStoreIcon={Boolean(true)} />
 */
// There is no standard app icon size,
// so we could not difine the specific width and height of icon <img />
const Icon = styled.img`
    width: 100%;
    height: auto;
`;
Icon.Wrapper = styled(FlexGrid)`
    position: relative;
    overflow: hidden;
    &.small {
        width: 22px;
        height: 22px;
    }
    &.medium {
        width: 34px;
        height: 34px;
    }
    &.big {
        width: 64px;
        height: 64px;
    }
    &.ios > img {
        border-radius: 15.625%;
    }
    &.appletv.small > img {
        border-radius: 1px;
    }
    &.appletv.medium > img {
        border-radius: 2px;
    }
    &.appletv.big > img {
        border-radius: 4px;
    }
`;
Icon.StoreOverlay = styled.div`
    position: absolute;
    bottom: -4px;
    right: -4px;
    padding: 4px;
    border-radius: 50%;
    background: #fff;
`;
const AppIcon = ({
    src,
    size,
    store,
    showStoreIcon,
}: {
    src: string,
    size: 'small' | 'medium' | 'big',
    store?: string,
    showStoreIcon?: boolean,
}) => {
    const classes = classnames({
        small: size === 'small',
        medium: size === 'medium',
        big: size === 'big',
        ios: store === 'ios',
        appletv: store === 'appletv',
    });
    if (showStoreIcon) {
        return (
            <Icon.Wrapper className={classes}>
                <Icon src={src} alt="" width="" height="" />
                <Icon.StoreOverlay>
                    <StoreIcon type={store} />
                </Icon.StoreOverlay>
            </Icon.Wrapper>
        );
    }
    return (
        <Icon.Wrapper className={classes}>
            <Icon src={src} alt="" width="" height="" />
        </Icon.Wrapper>
    );
};

/**
 * <Flag/>
 * @param {String} code
 * @example <Flag code={code} />
 */
const Flag = ({ code }: { code: string }) => {
    let size = {
        width: 16,
        height: 11,
    };
    if (code === 'ww') {
        size = {
            width: 32,
            height: 32,
        };
    }
    return (
        <Flag.Image
            src={`/static/flags/${code}.gif`}
            width={size.width}
            height={size.height}
            alt=""
        />
    );
};
Flag.Image = styled.img`
    width: 12px;
    height: auto;
`;

/**
 * <StoreIcon/>
 * @param {String} type android | ios | appletv | ibook | ga | mac  | gp  |amz | wp | win
 * @param {String} size default 12px
 * @example <StoryIcon type={type} />
 */
const StoreIcon = styled.i`
    width: ${props => (props.size ? props.size : '12px')};
    height: ${props => (props.size ? props.size : '12px')};
    display: block;
    background:${props => `url(/static/store/${props.type}.png)`} no-repeat center;
    background-position: 0 0;
    background-size: ${props => (props.size ? `${props.size} ${props.size}` : '12px 12px')};
`;

export default AppIcon;
export { Flag, StoreIcon };
