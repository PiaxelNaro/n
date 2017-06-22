// @flow
import createStore from '.';

describe('createStore()', () => {
    it('setup Redux devtools', () => {
        global.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn(store => store);
        createStore();
        expect(global.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalled();
    });
});
