import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import clsx from 'clsx';

import styles from './SystemHeader.module.scss';
import { BarsIcon } from '~/components/Icons';
import { LANGUAGES, convertBufferToString, path } from '~/utils';
import MenuMultiLevelHover from '~/components/MenuMultiLevelHover';
import MenuOffcanvas from '~/components/MenuOffcanvas';
import { languageSelector, userInfoSelector } from '~/store/selectors';

const adminMenus = [
    {
        name: 'menu.admin.manage-general',
        menu: [
            {
                name: 'menu.admin.manage-user',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_USER)}`,
                // submenu: [
                //     {
                //         name: 'Quản trị viên',
                //     }
                // ],
            },
            {
                name: 'menu.admin.manage-doctor',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_DOCTOR)}`,
            },

            {
                name: 'menu.admin.manage-patient',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_PATIENT)}`,
            },
            {
                name: 'menu.doctor.manage-schedule',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_SCHEDULE)}`,
            },
        ],
    },
    {
        name: 'menu.admin.clinic',
        menu: [
            {
                name: 'menu.admin.manage-clinic',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_CLINIC)}`,
            },
        ],
    },
    {
        name: 'menu.admin.specialty',
        menu: [
            {
                name: 'menu.admin.manage-specialty',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_SPECIALTY)}`,
            },
        ],
    },
    {
        name: 'menu.admin.handbook',
        menu: [
            {
                name: 'menu.admin.manage-handbook',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_HANDBOOK)}`,
            },
        ],
    },
];

const doctorMenus = [
    {
        name: 'menu.doctor.manage-info',
        menu: [
            {
                name: 'menu.doctor.manage-schedule',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_SCHEDULE)}`,
            },
            {
                name: 'menu.doctor.manage-patient',
                to: `${path.SYSTEM.replace('/*', path.SYSTEM_MANAGE_PATIENT)}`,
            },
        ],
    },
];

const SystemHeader = () => {
    const location = useLocation();

    const userInfo = useSelector(userInfoSelector);
    const language = useSelector(languageSelector);

    const [role, setRole] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [srcImage, setSrcImage] = useState('');
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        if (userInfo?.image?.type === 'Buffer') {
            const src = convertBufferToString(userInfo?.image || '');
            setSrcImage(src);
        } else if (userInfo?.image) {
            setSrcImage(userInfo?.image);
        }
    }, [userInfo]);

    useEffect(() => {
        setRole(userInfo?.roleId);

        switch (role) {
            case 'Admin' && 'admin' && 'R1':
                setMenus(adminMenus);
                break;
            case 'Doctor' && 'doctor' && 'R2':
                setMenus(doctorMenus);
                break;
            default:
                setMenus([]);
        }
    }, [role, userInfo]);

    const handleShowMenu = () => setShowMenu(true);

    return (
        <div className={clsx(styles['header-container'])}>
            <Navbar expand="lg" className="w-100">
                <Container>
                    <div className={clsx(styles['header-left'])}>
                        <div className={clsx(styles['menu-popup-icon'])} onClick={handleShowMenu}>
                            <BarsIcon />
                        </div>
                        <MenuOffcanvas showMenu={showMenu} setShowMenu={setShowMenu} />

                        <div className={clsx(styles['nav-menu'])}>
                            {menus.map((menu, index) => {
                                return (
                                    <MenuMultiLevelHover
                                        key={`menu-${index}`}
                                        menus={menu}
                                        location={location.pathname}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={clsx(styles['header-right'])}>
                        {userInfo && (
                            <>
                                <img
                                    className={clsx(styles['avatar'])}
                                    src={srcImage}
                                    alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                                />
                                <span className={clsx(styles['welcome'])}>
                                    {language === LANGUAGES.VI
                                        ? `${userInfo?.lastName} ${userInfo?.firstName}`
                                        : `${userInfo?.firstName} ${userInfo?.lastName}`}
                                </span>
                            </>
                        )}
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default SystemHeader;
