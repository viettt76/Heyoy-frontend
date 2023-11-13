import { path } from '~/utils';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import SystemUserManage from '~/pages/SystemUserManage';
import System from '~/pages/System';
import ManageAdmin from '~/containers/System/ManageAdmin';
import NeurologySpecialist from '~/pages/NeurologySpecialist';
import MusculoskeletalSpecialist from '~/pages/MusculoskeletalSpecialist';
import MakeAnAppointment from '~/pages/MakeAnAppointment';

export const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: Login },
    { path: path.SYSTEM_MANAGE_USER, component: SystemUserManage },
    { path: path.SYSTEM, component: System },
    { path: '/system/manage-admin', component: ManageAdmin },
    { path: '/chuyen-khoa-than-kinh', component: NeurologySpecialist },
    { path: '/chuyen-khoa-co-xuong-khop', component: MusculoskeletalSpecialist },
    { path: '/dat-lich-kham', component: MakeAnAppointment },
];
