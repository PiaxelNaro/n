// @flow
import React from 'react';
import AAIcon from '../../components/AAIcon';
import Text from '../../components/Text';
import Container from './container';
import Link from './link';
import Platform from './platform';

const Sidebar = ({
    home,
    platforms,
    current,
    isCollapsable = false,
    isPremium = false,
    onClickNav,
}: {
    home: any,
    platforms: any,
    current: string,
    isCollapsable?: boolean,
    isPremium?: boolean,
    onClickNav: string => void,
}) =>
    <Container link={home.href} isCollapsable={isCollapsable} isPremium={isPremium}>
        <Link
            link={home.href}
            icon={<AAIcon name="aa-home" />}
            isActive={current === home.id}
        >
            <Text ellipsis>
                {home.title}
            </Text>
        </Link>

        {platforms.map(platform => {
            if (!platform.items) {
                return (
                    <Link
                        key={platform.id}
                        link={platform.href}
                        icon={<AAIcon name={platform.icon} />}
                        isActive={current === platform.id}
                    >
                        <Text ellipsis textTransform="uppercase">
                            {platform.title}
                        </Text>
                    </Link>
                );
            }
            return (
                <Platform
                    current={current}
                    key={platform.id}
                    title={platform.title}
                    navGroup={platform.items}
                    onClick={onClickNav}
                />
            );
        })}
    </Container>;

export default Sidebar;
