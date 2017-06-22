// @flow
import userReducer from './reducers';
import setUser from './actions';
import getUser from './selectors';

describe('User reducer', () => {
    it('fetch user', () => {
        const initialState = {
            profile: {
                surveyName: '',
                email: '',
            },
            isANA: false,
            isINT: false,
            intAuth: {},
        };

        expect(
            userReducer(
                initialState,
                setUser({
                    user: {
                        profile: {
                            surveyName: 'fe',
                            email: 'fe@.com',
                        },
                        isANA: true,
                        isINT: true,
                        intAuth: {},
                    },
                })
            )
        ).toEqual({
            profile: {
                surveyName: 'fe',
                email: 'fe@.com',
            },
            isANA: true,
            isINT: true,
            intAuth: {},
        });
    });
});

describe('User selectors', () => {
    it('getUser()', () => {
        const state = {
            user: {
                profile: {
                    surveyName: '',
                    email: '',
                },
                isANA: false,
                isINT: true,
                intAuth: {},
            },
        };
        expect(getUser(state)).toEqual(state.user);
    });
});
