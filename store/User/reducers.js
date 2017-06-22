// @flow
import { handleActions } from 'redux-actions';
import setUser from './actions';

export default handleActions(
    {
        [setUser]: (state, action) => ({
            ...state,
            ...action.payload.user,
        }),
    },
    {
        profile: {},
        isANA: false,
        isINT: false,
        intAuth: {},
    }
);
