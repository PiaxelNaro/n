// @flow
import { createSelector } from 'reselect';
import { type I18nType } from '../../modules/i18n';
import { type UserType } from '../../modules/user';

// If user is Non-ANA, empty sub navs
const getANASidebar = (user: UserType, i18n: I18nType) => {
    if (user.isANA) {
        return [
            {
                id: 'c',
                title: '',
                items: [
                    {
                        id: 'c1',
                        title: i18n.gettext('帮助'),
                        href: '/help/',
                        isVisible: true,
                    },
                    {
                        id: 'c2',
                        title: i18n.gettext('课程'),
                        href: '/course',
                        isVisible: true,
                    },
                ],
            },
        ];
    }
    return null;
};

// Store PP locked when
// 1. user does not buy any store contract
// 2. user only buy store PYA or store PYP
const isStorePPLocked = (user: UserType) =>
    !user.isINT || !user.intAuth.store || !user.intAuth.store.pp;

// Store PYA invisible when
// 1. user does not buy any store contract
// 2. user is store PP only or store PYP only
const isStorePYAUser = (user: UserType) =>
    user.isINT && user.intAuth.store && user.intAuth.store.pya;

// Store PYP visible when
// user is store PYA or store PYP
const isStorePYPVisible = (user: UserType) =>
    user.isINT &&
    user.intAuth.store &&
    (user.intAuth.store.pyp || user.intAuth.store.pya);

// Store PYP locked when
// 1. user does not buy store contract
// 2. user is not store PYP
const isStorePYPLocked = (user: UserType) =>
    !user.isINT || !user.intAuth.store || !user.intAuth.store.pyp;

// Usage PP unlocked when user buy usage pp
const isUsagePPLocked = (user: UserType) =>
    !user.isINT || !user.intAuth.usage || !user.intAuth.usage.pp;

// Usage PYA show and unlocked if user buy usage pya
const isUsagePYAUser = (user: UserType) =>
    user.isINT && user.intAuth.usage && user.intAuth.usage.pya;

// Usage retention unlocked if user buy usage pp
const isUsagePPUser = (user: UserType) =>
    user.isINT && user.intAuth.usage && user.intAuth.usage.pp;

const isMarketAsoUser = (user: UserType) =>
    user.isINT && user.intAuth.marketing && user.intAuth.marketing.aso;

const isMarketAdvertisingUser = (user: UserType) =>
    user.isINT && user.intAuth.marketing && user.intAuth.marketing.advertising;

const getINTSidebar = (user: UserType, i18n: I18nType) =>
    [
        {
            id: 'a',
            title: i18n.gettext('排课'),
            items: [
                {
                    id: 'a1',
                    title: i18n.gettext('选课'),
                    href: '/#',
                    isVisible: true,
                    isLocked: !user.isINT,
                },
            ],
        },
        {
            id: 'b',
            title: i18n.gettext('查询'),
            items: [
                {
                    id: 'b1',
                    title: i18n.gettext('课程表'),
                    href: '/apps/ios/top-chart/',
                    isVisible: true,
                },
            ],
        }
    ].map(child => ({
        ...child,
        items: child.items.filter(item => item.isVisible),
    }));

const getSidebar = createSelector(
    user => user,
    (user, i18n) => i18n,
    (user: UserType, i18n: I18nType) => {
        const ANA_NAV = getANASidebar(user, i18n);
        const INT_NAV = getINTSidebar(user, i18n);
        return {
            current: 'a1',
            home: {
                id: 'home',
                title: i18n.gettext('首页'),
                href: '/home',
                isVisible: true,
            },
            platforms: [
                {
                    id: 'my_app_analytics',
                    title: i18n.gettext('学生功能'),
                    href: '/f',
                    icon: 'aa-connections',
                    items: ANA_NAV,
                },
                {
                    id: 'market_intelligence',
                    title: i18n.gettext('管理员功能'),
                    items: INT_NAV,
                },
            ],
        };
    }
);

export default getSidebar;
