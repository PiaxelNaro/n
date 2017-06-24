// @flow
import { connect } from 'react-redux';
import Router from 'next/router';

import { translate, type I18nType } from '../../modules/i18n';
import getUser from '../../store/User/selectors';
import Sidebar from './sidebar';
import getSidebar from './utils';

const onClickNav = (url: string) => Router.push(url);

const mapStateToProps = (
    state: Object,
    props: { i18n: I18nType, isCollapsable: boolean }
) => {
    const user = getUser(state);
    const navs = getSidebar(user, props.i18n);
    return {
        home: navs.home,
        platforms: navs.platforms,
        isPremium: user.isAdmin,
        onClickNav,
    };
};

export default translate(connect(mapStateToProps)(Sidebar));
export { mapStateToProps };
