export const path = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PERSONAL_INFO: '/me/personal-information',

    SYSTEM: '/system/*',
    SYSTEM_MANAGE_USER: '/manage-user',
    SYSTEM_MANAGE_ADMIN: '/manage-admin',
    SYSTEM_MANAGE_DOCTOR: '/manage-doctor',
    SYSTEM_MANAGE_SCHEDULE: '/manage-schedule',
    SYSTEM_MANAGE_SPECIALTY: '/manage-specialty',
    SYSTEM_MANAGE_CLINIC: '/manage-clinic',
    SYSTEM_MANAGE_PATIENT: '/manage-patient',

    DETAIL_SPECIALTY: '/specialty/:id',
    DETAIL_CLINIC: '/clinic/:id',
    DETAIL_DOCTOR: '/doctor/:id',
    VERIFY_BOOKING: '/verify-booking',

    MY_APPOINTMENT: '/my-appointment'
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en',
};

export const manageActions = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY',
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N',
};