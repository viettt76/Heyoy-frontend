export const userInfoSelector = (state) => state.user?.userInfo;

export const isLoggedInSelector = (state) => state.user?.isLoggedIn;

export const languageSelector = (state) => state.app.language;
