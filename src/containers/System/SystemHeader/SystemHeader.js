import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import clsx from 'clsx';

import styles from './SystemHeader.module.scss';
import { BarsIcon } from '~/components/Icons';
import { LANGUAGES, convertBufferToString } from '~/utils';
import MenuMultiLevelHover from '~/components/MenuMultiLevelHover';
import MenuOffcanvas from '~/components/MenuOffcanvas';
import { languageSelector, userInfoSelector } from '~/store/seletors';

const adminMenus = [
    {
        name: 'menu.admin.manage-user',
        menu: [
            {
                name: 'menu.admin.manage-admin',
                to: '/system/manage-admin',
                // submenu: [
                //     {
                //         name: 'Quản trị viên',
                //     }
                // ],
            },
            {
                name: 'menu.admin.manage-doctor',
                to: '/system/manage-doctor',
            },

            {
                name: 'menu.admin.manage-patient',
                to: '/system/manage-patient',
            },
            {
                name: 'menu.doctor.manage-schedule',
                to: '/system/manage-schedule',
            },
        ],
    },
    {
        name: 'menu.admin.clinic',
        menu: [
            {
                name: 'menu.admin.manage-clinic',
                to: '/system/manage-clinic',
            },
        ],
    },
    {
        name: 'menu.admin.specialty',
        menu: [
            {
                name: 'menu.admin.manage-specialty',
                to: '/system/manage-specialty',
            },
        ],
    },
    {
        name: 'menu.admin.handbook',
        menu: [
            {
                name: 'menu.admin.manage-handbook',
                to: '/system/manage-handbook',
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
                to: '/system/manage-schedule',
            },
            {
                name: 'menu.doctor.manage-patient',
                to: '/system/manage-patient',
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

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    if (!location.pathname.includes('/system')) {
        return null;
    }

    return (
        <div className={clsx(styles['header-container'])}>
            <Navbar expand="lg">
                <Container>
                    <div className={clsx(styles['header-left'])}>
                        <div className={clsx(styles['menu-popup-icon'])} onClick={handleShowMenu}>
                            <BarsIcon />
                        </div>
                        <MenuOffcanvas showMenu={showMenu} handleCloseMenu={handleCloseMenu} />

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
