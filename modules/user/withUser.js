// @flow
import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import setUser from '../../store/User/actions';
import fetchUser from '../../ajax/user/fetch_user';

export default function withUser(WrappedComponent: Object) {
    class WithUserPage extends React.Component {
        static async getInitialProps(ctx: { store: Object }) {
            const { store } = ctx;
            const getInitialProps: (ctx?: Object) => any =
                WrappedComponent.getInitialProps || (() => {});
            const [user, wrappedComponentProps] = await Promise.all([
                fetchUser(),
                getInitialProps(ctx),
            ]);
            store.dispatch(setUser(user));
            return wrappedComponentProps;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithUserPage.displayName = `WithUserPage(${WrappedComponent.displayName})`;

    return hoistStatics(WithUserPage, WrappedComponent, {
        getInitialProps: true,
    });
}
