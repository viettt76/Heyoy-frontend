import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';

import logo from '~/assets/images/logo.png';
import styles from './Header.module.scss';
import * as actions from '~/store/actions';
import { BarsIcon, ClockRotateLeftIcon, HeadsetIcon, SearchIcon } from '~/components/Icons';
import { languages } from '~/utils';

const Header = () => {
    const dispatch = useDispatch();

    const intl = useIntl();

    const processLogout = () => dispatch(actions.processLogout());

    const [showMenu, setShowMenu] = useState(false);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

    return (
        <>
            <div className={clsx(styles['header-container'])}>
                <div className={clsx(styles['header-left'])}>
                    <div className={clsx(styles['menu'])} onClick={handleShowMenu}>
                        <BarsIcon />
                    </div>
                    <Offcanvas show={showMenu} onHide={handleCloseMenu}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Some text as placeholder. In real life you can have the elements you have chosen. Like,
                            text, images, lists, etc.
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Link to="/">
                        <img className={clsx(styles['logo'])} src={logo} alt="" />
                    </Link>

                    <ul className={[clsx(styles['nav-menu'])]}>
                        <li className={clsx(styles['menu-item'])}>
                            <NavLink to="/dich-vu/tai-nha">
                                <FormattedMessage id="header.at-home" />
                            </NavLink>
                        </li>
                        <li className={clsx(styles['menu-item'])}>
                            <NavLink to="/dich-vu/tai-vien">
                                <FormattedMessage id="header.at-hospital" />
                            </NavLink>
                        </li>
                        <li className={clsx(styles['menu-item'])}>
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
                        <span>
                            <FormattedMessage id="header.appointment-schedule" />
                        </span>
                    </div>
                    <div className={clsx(styles['header-right-item'])}>
                        <HeadsetIcon />
                        <span>
                            <FormattedMessage id="header.support" />
                        </span>
                    </div>
                </div>

                {/* <div className={clsx('btn', styles['btn-logout'])} onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div> */}

                {/* <div>
                    <div onClick={() => handleChangeLanguage(languages.EN)}>{languages.EN}</div>
                    <div onClick={() => handleChangeLanguage(languages.VI)}>{languages.VI}</div>
                </div> */}
            </div>
        </>
    );
};

export default Header;
