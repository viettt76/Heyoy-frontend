import { path } from '~/utils';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import SystemPage from '~/pages/System';
import DetailSpecialty from '~/pages/DetailSpecialty';
import DetailClinic from '~/pages/DetailClinic';
import DetailDoctor from '~/pages/DetailDoctor';
import VerifyBooking from '~/pages/VerifyBooking';

export const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: Login },
    { path: path.REGISTER, component: Register },
    { path: path.SYSTEM, component: SystemPage },
    { path: path.DETAIL_SPECIALTY, component: DetailSpecialty },
    { path: path.DETAIL_CLINIC, component: DetailClinic },
    { path: path.DETAIL_DOCTOR, component: DetailDoctor },
    { path: path.VERIFY_BOOKING, component: VerifyBooking },
];
