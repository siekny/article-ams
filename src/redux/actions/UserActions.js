import axios from 'axios';
import { BASE_URL } from '../../config/API'
import { User } from '../../constants/ActionType';
import { getUserStorage, saveStorage } from '../../constants/Storage';

const loginStart = () => {
    return {
        type: User.LOGIN_START
    };
};
const loginSuccess = (data) => {
    return {
        type: User.LOGIN_SUCCESS,
        data
    };
};
const loginFail = (error) => {
    return {
        type: User.LOGIN_FAIL,
        error
    };
};

const logoutStart = () => {
    return {
        type: User.LOGOUT
    };
};

export const login = (email) => {
    console.log('email', email);
    return (dispatch) => {
        dispatch(loginStart());
        // get key for login
        axios
            .get(`${BASE_URL}/users/email/` + encodeURIComponent(email))
            .then((res) => {
                const user = res.data
                const loginEmail = user.email
                const loginUserId = user.userId
                const loginUserName = user.userName
                const loginProfile = user.profile

                saveStorage(loginEmail, loginUserId, loginUserName, loginProfile)

                const data = {
                    loginEmail,
                    loginUserId,
                    loginUserName,
                    loginProfile
                };
                dispatch(loginSuccess(data));
            })
            .then((error) => {
                console.log('error', error);
                dispatch(loginFail(error))
            })
    }
};

export const isUserLogin = () => {
    return (dispatch) => {
        const loginEmail = localStorage.getItem("loginEmail");
        const loginUser = localStorage.getItem("loginUser");
        const data = {
            loginEmail,
            loginUser
        };
        dispatch(loginSuccess(data));
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("loginKey");
        localStorage.removeItem("accessToken");
        dispatch(logoutStart());
    };
};