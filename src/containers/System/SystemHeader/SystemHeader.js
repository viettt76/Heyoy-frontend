import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Offcanvas, Container, Navbar } from 'react-bootstrap';
import clsx from 'clsx';

import styles from './SystemHeader.module.scss';
import * as actions from '~/store/actions';
import { BarsIcon } from '~/components/Icons';
import { LANGUAGES } from '~/utils';
import MenuMultiLevelHover from '~/components/MenuMultiLevelHover';
import { FormattedMessage } from 'react-intl';

const menus = [
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
        name: 'menu.admin.specialist',
        menu: [
            {
                name: 'menu.admin.manage-specialist',
                to: '/system/manage-specialist',
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

const SystemHeader = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const processLogout = () => dispatch(actions.processLogout());

    const [showMenu, setShowMenu] = useState(false);

    const userInfo = useSelector((state) => state?.user?.userInfo);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

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
                                    </li>{' '}
                                    <li>
                                        <Link to="/system/manage-user">Manage user</Link>
                                    </li>
                                    <li>
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
                            <span className={clsx(styles['welcome'])}>
                                <FormattedMessage id="system.header.welcome" /> {userInfo?.firstName}{' '}
                                {userInfo?.lastName}
                            </span>
                        )}
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default SystemHeader;
