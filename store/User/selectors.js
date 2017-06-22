// @flow
import { type UserType } from '../../modules/user';

const getUser = (state: { user: UserType }) => state.user;
export default getUser;
