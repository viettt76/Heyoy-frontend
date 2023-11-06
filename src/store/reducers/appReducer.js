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
        default:
            return state;
    }
}

export default appReducer;