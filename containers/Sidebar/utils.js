// @flow
import { createSelector } from 'reselect';
import { type I18nType } from '../../modules/i18n';
import { type UserType } from '../../modules/user';

// If user is Non-ANA, empty sub navs
const getStudentSidebar = (user: UserType, i18n: I18nType) => {
    if (user.isAdmin) {
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

const isAdmin = (user: UserType) =>
    user.auth && user.auth.admin;

const getAdminSidebar = (user: UserType, i18n: I18nType) =>
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
                    isLocked: !user.isVisit,
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
        const STU_NAV = getStudentSidebar(user, i18n);
        let ADM_NAV;
        if (isAdmin(user)) {
            ADM_NAV = getAdminSidebar(user, i18n);
        }
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
                    items: STU_NAV,
                },
                {
                    id: 'market_intelligence',
                    title: i18n.gettext('管理员功能'),
                    items: ADM_NAV,
                },
            ],
        };
    }
);

export default getSidebar;
