import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENDER_USER:
            return {
                ...state,
                genders: action.payload,
            };
        case actionTypes.GET_ROLE_USER:
            return {
                ...state,
                roles: action.payload,
            };
        case actionTypes.GET_POSITION_USER:
            return {
                ...state,
                positions: action.payload,
            };
        default:
            return state;
    }
};

export default adminReducer;
