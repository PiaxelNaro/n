// @flow
import NextRouter from 'next/router';
import { mapStateToProps } from '.';
import mockI18n from '../../modules/i18n/mockI18n';

const Router: any = NextRouter;

jest.mock('next/router', () => ({
    pathname: 'test',
    push: jest.fn(),
}));

describe('<Sidebar />', () => {
    it('connects Sidebar to the redux store', () => {
        const props = mapStateToProps(
            {
                user: {
                    user: {
                        isPremium: true,
                        isANA: false,
                        isINT: false,
                    },
                },
            },
            {
                isCollapsable: true,
                i18n: mockI18n,
            }
        );

        expect(props.home.href).toEqual('/dashboard/home/');

        const href = '/home';
        props.onClickNav(href);
        expect(Router.push).toHaveBeenCalledWith(href);
    });
});
