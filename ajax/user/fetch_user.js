// @flow

import user from '../../data/user';

const fetchUser = () =>
    new Promise(resolve => {
        resolve({ user });
    });
export default fetchUser;
