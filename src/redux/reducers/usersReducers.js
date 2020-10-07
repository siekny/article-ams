import { User } from '../../constants/ActionType';
import { updateObject } from '../../utilities/Utilities';

const initState = {
    loading: false,
    error: null,
    loginEmail: null,
    accessUser: null,
    user: null
};

const loginStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const loginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        loginEmail: action.data.loginEmail,
        loginUser: action.data.loginUser
    });
};
const loginFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const logoutStart = (state, action) => {
    return updateObject(state, {
        loginEmail: null,
        loginUser: null
    });
};

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case User.LOGIN_START:
            return loginStart(state, action);

        case User.LOGIN_SUCCESS:
            return loginSuccess(state, action);

        case User.LOGIN_FAIL:
            return loginFail(state, action);

        case User.LOGOUT:
            return logoutStart(state, action);
        default:
            return state;
    }
};