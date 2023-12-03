import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Offcanvas, Container, Navbar } from 'react-bootstrap';
import clsx from 'clsx';

import styles from './SystemHeader.module.scss';
import * as actions from '~/store/actions';
import { BarsIcon } from '~/components/Icons';
import { LANGUAGES, convertBufferToString } from '~/utils';
import MenuMultiLevelHover from '~/components/MenuMultiLevelHover';

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
    const dispatch = useDispatch();

    const location = useLocation();

    const processLogout = () => dispatch(actions.processLogout());

    const [role, setRole] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [srcImage, setSrcImage] = useState('');
    const [menus, setMenus] = useState([]);

    const userInfo = useSelector((state) => state?.user?.userInfo);
    const language = useSelector((state) => state.app.language);

    useEffect(() => {
        if (userInfo?.image?.type === 'Buffer') {
            const src = convertBufferToString(userInfo?.image);
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

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

    if (!location.pathname.includes('/system')) {
        return null;
    }
    
    return (
        <>
            <Navbar expand="lg" className={clsx('bg-body-tertiary', styles['header-container'])}>
                <Container fluid>
                    <div className={clsx(styles['header-left'])}>
                        <div className={clsx(styles['menu-popup-icon'])} onClick={handleShowMenu}>
                            <BarsIcon />
                        </div>
                        <Offcanvas className={clsx(styles['offcanvas'])} show={showMenu} onHide={handleCloseMenu}>
                            <Offcanvas.Body className={clsx(styles['offcanvas-body'])}>
                                <ul className={clsx(styles['menu-popup'])}>
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <div className={clsx(styles['btn-logout'])} onClick={processLogout}>
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>
                                    </li>
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <div>
                                            <div onClick={() => handleChangeLanguage(LANGUAGES.EN)}>{LANGUAGES.EN}</div>
                                            <div onClick={() => handleChangeLanguage(LANGUAGES.VI)}>{LANGUAGES.VI}</div>
                                        </div>
                                    </li>
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <Link
                                            to={
                                                menus?.length > 0 && menus[0]?.menu?.length > 0 && menus[0]?.menu[0]?.to
                                            }
                                        >
                                            System
                                        </Link>
                                    </li>
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            </Offcanvas.Body>
                        </Offcanvas>

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
        </>
    );
};

export default SystemHeader;
