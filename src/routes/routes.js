import { path } from '~/utils'

import Home from '~/pages/Home'
import Login from '~/pages/Login'
import SystemUserManage from '~/pages/SystemUserManage'

export const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: Login },
    { path: path.SYSTEM_USER_MANAGE, component: SystemUserManage },
]