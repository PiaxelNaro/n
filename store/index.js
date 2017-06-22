// @flow
import { createStore, combineReducers } from 'redux';
import report from './Report/reducers';
import user from './User/reducers';

const rootReducer = combineReducers({
    report,
    user,
});

/* eslint-disable no-underscore-dangle */
export default (initialState: Object = {}) =>
    createStore(
        rootReducer,
        initialState,
        global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
    );
/* eslint-enable */
