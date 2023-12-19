import { path } from '~/utils';

import LayoutSystem from '~/layouts/LayoutSystem';
import LayoutOnlyHeader from '~/layouts/LayoutOnlyHeader';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import PersonalInfo from '~/pages/PersonalInfo';

import SystemPage from '~/pages/System';

import DetailSpecialty from '~/pages/DetailSpecialty';
import DetailClinic from '~/pages/DetailClinic';
import DetailDoctor from '~/pages/DetailDoctor';

import ListSpecialty from '~/pages/ListSpecialty';
import ListClinic from '~/pages/ListClinic';
import ListDoctor from '~/pages/ListDoctor';

import VerifyBooking from '~/pages/VerifyBooking';

import NotFound from '~/pages/NotFound';

export const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: Login, layout: null },
    { path: path.REGISTER, component: Register, layout: null },
    { path: path.PERSONAL_INFO, component: PersonalInfo },

    { path: path.SYSTEM, component: SystemPage, layout: LayoutSystem },

    { path: path.DETAIL_SPECIALTY, component: DetailSpecialty },
    { path: path.DETAIL_CLINIC, component: DetailClinic },
    { path: path.DETAIL_DOCTOR, component: DetailDoctor },

    { path: path.LIST_SPECIALTY, component: ListSpecialty },
    { path: path.LIST_CLINIC, component: ListClinic },
    { path: path.LIST_DOCTOR, component: ListDoctor },

    { path: path.VERIFY_BOOKING, component: VerifyBooking, layout: LayoutOnlyHeader },

    { path: '*', component: NotFound, layout: null },
];
