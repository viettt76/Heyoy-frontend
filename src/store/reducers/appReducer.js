import actionTypes from '../actions/actionTypes';

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/',
    loading: false,
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
        case actionTypes.APP_START_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.APP_END_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default appReducer;