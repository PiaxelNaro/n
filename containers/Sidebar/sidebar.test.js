import React from 'react';
import { shallow } from 'enzyme';
import Container from './container';
import Link from './link';
import Platform, { NavGroup } from './platform';
import Sidebar from './sidebar';

describe('<Link>', () => {
    it('render sidebar link', () => {
        const spy = jest.fn();
        const link = shallow(<Link link="/dashboard" icon={<div />} onClick={spy} />);
        expect(link).toMatchSnapshot();
        expect(link.hasClass('is-active')).toBeFalsy();

        link.prop('onClick')();
        expect(spy).toHaveBeenCalled();

        link.setProps({
            isBeta: true,
            isNew: true,
            isActive: true,
            isLocked: true,
            isConnected: true,
        });
        link.update();
        expect(link).toMatchSnapshot();
        expect(link.hasClass('is-active')).toBeTruthy();
    });
});

describe('<Container>', () => {
    it('render container', () => {
        const selector = shallow(
            <Container link="/home">
                test
            </Container>
        );
        expect(selector).toMatchSnapshot();

        selector.setProps({
            isCollapsable: true,
            isPremium: true,
        });
        selector.update();
        expect(selector).toMatchSnapshot();

        selector.find('.AASidebar').prop('onMouseEnter')();
        expect(selector.find('.AASidebar').hasClass('is-hover')).toBe(true);
        selector.find('.AASidebar').prop('onMouseLeave')();
        expect(selector.find('.AASidebar').hasClass('is-hover')).toBe(false);
    });

    it('render container wrapper', () => {
        const selector = shallow(
            <Container link="home">
                test
            </Container>
        );
        expect(selector.dive()).toMatchSnapshot();

        selector.dive().setProps({
            isCollapsable: true,
        });
        expect(selector.dive()).toMatchSnapshot();
    });
});

describe('<NavGroup>', () => {
    it('render NavGroup with title', () => {
        const spy = jest.fn();
        const title = 'App Store Rankings';
        const itemList = [
            {
                id: 'my_app_analytics_overview',
                title: 'Overview',
                href: '/comparator/',
            },
        ];
        const selector = shallow(
            <NavGroup title={title} items={itemList} onClick={spy} />
        );
        expect(selector).toMatchSnapshot();
        expect(selector.find('.AASidebar-group-title').length).toEqual(1);

        selector.find('Link').at(0).prop('onClick')();
        expect(spy).toHaveBeenCalledWith('/comparator/');
    });

    it('render NavGroup without header', () => {
        const itemList = [
            {
                id: 'my_app_analytics_overview',
                title: 'Overview',
                href: '/comparator/',
            },
        ];
        const selector = shallow(<NavGroup title="" items={itemList} />);
        expect(selector).toMatchSnapshot();
        expect(selector.find('.AASidebar-group-title').length).toEqual(0);
    });
});

describe('<Platform>', () => {
    it('render', () => {
        const navGroup = [
            {
                id: 'analytics_navs',
                title: '',
                items: [
                    {
                        id: 'my_app_analytics_overview',
                        title: 'Overview',
                        href: '/comparator/',
                    },
                ],
            },
        ];
        const spy = jest.fn();
        const selector = shallow(
            <Platform
                title=""
                current="my_app_analytics_overview"
                navGroup={navGroup}
                onClick={spy}
            />
        );
        expect(selector).toMatchSnapshot();

        // test collapse and expand sidebar
        expect(selector.hasClass('collapse')).toBeFalsy();
        selector.find('.AASidebar-platform-title').simulate('click');
        selector.update();
        expect(selector.hasClass('collapse')).toBeTruthy();
        selector.find('.AASidebar-platform-title').simulate('click');
        expect(selector.hasClass('collapse')).toBeFalsy();

        // test onClick
        selector.find('NavGroup').at(0).prop('onClick')();
        expect(spy).toHaveBeenCalled();
    });
});

describe('<Sidebar>', () => {
    it('render sidebar', () => {
        const spy = jest.fn();
        const platforms = [
            {
                id: 'my_app_analytics',
                title: 'My app analytics',
                href: '/comparator/landing/',
                items: [
                    {
                        id: 'analytics_navs',
                        title: '',
                        items: [
                            {
                                id: 'my_app_analytics_overview',
                                title: 'Overview',
                                href: '/comparator/',
                            },
                        ],
                    },
                ],
            },
        ];
        const sidebar = shallow(
            <Sidebar home="/home" platforms={platforms} onClickNav={spy} />
        );
        expect(sidebar).toMatchSnapshot();

        sidebar.find('Platform').at(0).prop('onClick')();
        expect(spy).toHaveBeenCalled();
    });

    it('render sidebar without analytics subNavs', () => {
        const platforms = [
            {
                id: 'my_app_analytics',
                title: 'My app analytics',
                href: '/comparator/landing/',
                items: null,
            },
        ];
        platforms[0].items = null;
        const sidebar = shallow(
            <Sidebar
                current=""
                home="/home"
                platforms={platforms}
                isPremium={Boolean(true)}
                isCollapsable
            />
        );
        expect(sidebar).toMatchSnapshot();
    });
});
