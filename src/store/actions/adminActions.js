import actionTypes from './actionTypes';
import { getAllCodeService } from '~/services/userService';

export const getGenderUser = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService('gender');

            if (res?.errCode === 0) {
                return dispatch({
                    type: actionTypes.GET_GENDER_USER,
                    payload: res.data,
                });
            } else {
                return dispatch({
                    type: actionTypes.GET_GENDER_USER,
                    payload: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRoleUser = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService('role');
            if (res?.errCode === 0) {
                return dispatch({
                    type: actionTypes.GET_ROLE_USER,
                    payload: res.data,
                });
            } else {
                return dispatch({
                    type: actionTypes.GET_ROLE_USER,
                    payload: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPositionUser = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService('position');
            if (res?.errCode === 0) {
                return dispatch({
                    type: actionTypes.GET_POSITION_USER,
                    payload: res.data,
                });
            } else {
                return dispatch({
                    type: actionTypes.GET_POSITION_USER,
                    payload: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
