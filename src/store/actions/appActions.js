import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE,
});

export const appChangeLanguage = (language) => ({
    type: actionTypes.APP_CHANGE_LANGUAGE,
    payload: language,
});
