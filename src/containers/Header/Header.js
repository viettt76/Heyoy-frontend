import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Offcanvas, Container, Navbar } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import logo from '~/assets/images/logo.png';
import styles from './Header.module.scss';
import * as actions from '~/store/actions';
import { BarsIcon, ClockRotateLeftIcon, HeadsetIcon, SearchIcon } from '~/components/Icons';
import { LANGUAGES } from '~/utils';

const Header = () => {
    const location = useLocation();

    const dispatch = useDispatch();

    const processLogout = () => dispatch(actions.processLogout());

    const [showMenu, setShowMenu] = useState(false);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

    if (location.pathname.includes('/system') || location.pathname === '/login') {
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
                        <Offcanvas className={clsx(styles['off-canvas'])} show={showMenu} onHide={handleCloseMenu}>
                            <Offcanvas.Body className={clsx(styles['off-canvas-body'])}>
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
                                    <li>
                                        <Link to="/system/manage-user">Manage user</Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <Link className={clsx(styles['logo'])} to="/">
                            <img src={logo} alt="" />
                        </Link>

                        <ul className={[clsx(styles['nav-menu'])]}>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/dich-vu/tai-nha">
                                    <FormattedMessage id="header.at-home" />
                                </NavLink>
                            </li>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/dich-vu/tai-vien">
                                    <FormattedMessage id="header.at-hospital" />
                                </NavLink>
                            </li>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/dich-vu/song-khoe">
                                    <FormattedMessage id="header.live-healthy" />
                                </NavLink>
                            </li>
                        </ul>

                        <div className={clsx(styles['search-input'])}>
                            <SearchIcon width="15px" height="15px" />
                            <input placeholder="Tìm kiếm" />
                        </div>
                    </div>

                    <div className={clsx(styles['header-right'])}>
                        <div className={clsx(styles['header-right-item'])}>
                            <ClockRotateLeftIcon />
                            <span className={clsx(styles['header-right-item-label'])}>
                                <FormattedMessage id="header.appointment-schedule" />
                            </span>
                        </div>
                        <div className={clsx(styles['header-right-item'])}>
                            <HeadsetIcon />
                            <span className={clsx(styles['header-right-item-label'])}>
                                <FormattedMessage id="header.support" />
                            </span>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
