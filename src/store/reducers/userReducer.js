import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    temporaryDetails: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.GET_INFO_TEMPORARY:
            return {
                ...state,
                temporaryDetails: action.payload,
            };
        case actionTypes.DELETE_INFO_TEMPORARY:
            return {
                ...state,
                temporaryDetails: null,
            };
        default:
            return state;
    }
};

export default userReducer;
