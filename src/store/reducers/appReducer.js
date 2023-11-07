import actionTypes from '../actions/actionTypes';

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.APP_CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;