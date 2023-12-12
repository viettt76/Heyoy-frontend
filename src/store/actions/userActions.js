import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});

export const getInfoTemporary = (userInfo) => ({
    type: actionTypes.GET_INFO_TEMPORARY,
    payload: userInfo
})

export const deleteInfoTemporary = () => ({
    type: actionTypes.DELETE_INFO_TEMPORARY,
})