// @flow
import getSidebar from './utils';
import mockI18n from '../../modules/i18n/mockI18n';
import { type NavItem } from './platform';
import { type UserType } from '../../modules/user';

describe('getSidebar()', () => {
    it('test non ana non int user', () => {
        const user: UserType = {
            profile: {
                surveyName: 'fe',
                email: 'fe@.com',
            },
            isANA: false,
            isINT: false,
            intAuth: {},
        };
        const sidebar: any = getSidebar(user, mockI18n);
        expect(sidebar.platforms[0].items).toBeNull();

        const checkItem: NavItem = sidebar.platforms[1].items[0].items.find(
            item => item.id === 'market_intelligence_custom_comparator'
        );
        expect(checkItem.isLocked).toEqual(true);
    });

    it('test int user', () => {
        const user: UserType = {
            profile: {
                surveyName: 'fe',
                email: 'fe@.com',
            },
            isANA: true,
            isINT: true,
            intAuth: {
                store: {
                    pp: true,
                    pya: true,
                    pyp: false,
                },
                usage: {
                    pp: true,
                    pya: true,
                },
                marketing: {
                    advertising: true,
                    aso: true,
                },
            },
        };
        const sidebar: {
            platforms: Array<any>,
        } = getSidebar(user, mockI18n);
        expect(sidebar.platforms[0].items).not.toBeNull();

        const checkItem: NavItem = sidebar.platforms[1].items[0].items.find(
            item => item.id === 'market_intelligence_custom_comparator'
        );
        expect(checkItem.isLocked).toEqual(false);
    });

    it('test store PYP user', () => {
        const user: UserType = {
            profile: {
                surveyName: 'fe',
                email: 'fe@.com',
            },
            isANA: true,
            isINT: true,
            intAuth: {
                store: {
                    pp: true,
                    pya: true,
                    pyp: true,
                },
                usage: {
                    pp: true,
                    pya: true,
                },
                marketing: {
                    advertising: true,
                    aso: true,
                },
            },
        };
        const sidebar: {
            platforms: Array<any>,
        } = getSidebar(user, mockI18n);
        const checkItem: NavItem = sidebar.platforms[1].items[2].items.find(
            item => item.id === 'market_intelligence_downloads_and_revenue_top_publishers'
        );
        expect(checkItem.isLocked).toEqual(false);
    });
});
