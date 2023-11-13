const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    APP_CHANGE_LANGUAGE: 'APP_CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // Admin
    GET_GENDER_USER: 'GET_GENDER_USER',
    GET_ROLE_USER: 'GET_ROLE_USER',
    GET_POSITION_USER: 'GET_POSITION_USER',
});

export default actionTypes;
