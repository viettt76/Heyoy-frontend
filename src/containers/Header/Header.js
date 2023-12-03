import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas, Container, Navbar } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import Tippy from '@tippyjs/react/headless';
import logo from '~/assets/images/logo.png';
import styles from './Header.module.scss';
import * as actions from '~/store/actions';
import { BarsIcon, ClockRotateLeftIcon, HeadsetIcon, SearchIcon } from '~/components/Icons';
import { LANGUAGES } from '~/utils';
import { getAppointmentByPatientService } from '~/services';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const language = useSelector((state) => state.app.language);
    const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
    const userInfo = useSelector((state) => state.user?.userInfo);

    const processLogout = () => dispatch(actions.processLogout());

    const [listAppointments, setListAppointments] = useState([]);

    const [showMenu, setShowMenu] = useState(false);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

    useEffect(() => {
        if (userInfo?.roleId === 'R3') {
            let fetchAppointmentByPatientService = async () => {
                let res = await getAppointmentByPatientService(userInfo?.id);
                if (res?.data) {
                    setListAppointments(res.data);
                }
            };
            fetchAppointmentByPatientService();
        }
    }, [userInfo, location]);

    if (location.pathname.includes('/system') || location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <div>
            <Navbar expand="lg" className={clsx(styles['header-container'])}>
                <Container>
                    <div className={clsx(styles['header-left'])}>
                        <div className={clsx(styles['menu-popup-icon'])} onClick={handleShowMenu}>
                            <BarsIcon />
                        </div>
                        <Offcanvas className={clsx(styles['off-canvas'])} show={showMenu} onHide={handleCloseMenu}>
                            <Offcanvas.Body className={clsx(styles['off-canvas-body'])}>
                                <ul className={clsx(styles['menu-popup'])}>
                                    {isLoggedIn ? (
                                        <li className={clsx(styles['menu-popup-item'])}>
                                            <div className={clsx(styles['btn-logout'])} onClick={processLogout}>
                                                <i className="fas fa-sign-out-alt"></i>
                                            </div>
                                        </li>
                                    ) : (
                                        <li className={clsx(styles['menu-popup-item'])}>
                                            <Link to="/login">Login</Link>
                                        </li>
                                    )}
                                    <li className={clsx(styles['menu-popup-item'])}>
                                        <span
                                            className={clsx(styles['languages'], {
                                                [styles['active']]: language === LANGUAGES.EN,
                                            })}
                                            onClick={() => handleChangeLanguage(LANGUAGES.EN)}
                                        >
                                            {LANGUAGES.EN}
                                        </span>
                                        <span
                                            className={clsx(styles['languages'], {
                                                [styles['active']]: language === LANGUAGES.VI,
                                            })}
                                            onClick={() => handleChangeLanguage(LANGUAGES.VI)}
                                        >
                                            {LANGUAGES.VI}
                                        </span>
                                    </li>
                                    {userInfo?.roleId === 'R1' ||
                                        (userInfo?.roleId === 'R2' && (
                                            <li className={clsx(styles['menu-popup-item'])}>
                                                <Link to="/">Home</Link>
                                            </li>
                                        ))}
                                    {userInfo?.roleId === 'R1' ||
                                        (userInfo?.roleId === 'R2' && (
                                            <li className={clsx(styles['menu-popup-item'])}>
                                                <Link to="/system/manage-user">System</Link>
                                            </li>
                                        ))}
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

                    {userInfo?.roleId === 'R3' && (
                        <div className={clsx(styles['header-right'])}>
                            <Tippy
                                arrow={true}
                                interactive
                                delay={[100, 200]}
                                render={(attrs) => (
                                    <ul className={clsx(styles['list-appointment'])} tabIndex="-1" {...attrs}>
                                        {listAppointments?.length > 0 &&
                                            listAppointments.map((appointment, index) => {
                                                let date = appointment?.date;
                                                let day = new Date(date).getDate();
                                                let month = new Date(date).getMonth() + 1;
                                                let year = new Date(date).getFullYear();
                                                date = `${day}/${month}/${year}`;
                                                return (
                                                    <li
                                                        key={`appointment-${index}`}
                                                        className={clsx(styles['appointment'])}
                                                    >
                                                        <div>
                                                            <FormattedMessage id="header.day" /> {date},{' '}
                                                            {language === LANGUAGES.VI
                                                                ? appointment?.timeTypeBookingData?.valueVi
                                                                : appointment?.timeTypeBookingData?.valueEn}
                                                        </div>
                                                        <div>
                                                            <FormattedMessage id="header.doctor" />{' '}
                                                            {language === LANGUAGES.VI
                                                                ? `${appointment?.doctorUserData?.lastName} ${appointment?.doctorUserData?.firstName}`
                                                                : `${appointment?.doctorUserData?.firstName} ${appointment?.doctorUserData?.lastName}`}
                                                            , <FormattedMessage id="header.specialty" />{' '}
                                                            {appointment?.Doctor_Info?.specialtyData?.name}
                                                        </div>
                                                        <div>
                                                            {language === LANGUAGES.VI
                                                                ? appointment?.statusBookingData?.valueVi
                                                                : appointment?.statusBookingData?.valueEn}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                )}
                            >
                                <div className={clsx(styles['header-right-item'])}>
                                    <ClockRotateLeftIcon />
                                    <span className={clsx(styles['header-right-item-label'])}>
                                        <FormattedMessage id="header.appointment-schedule" />
                                    </span>
                                </div>
                            </Tippy>

                            <div className={clsx(styles['header-right-item'])}>
                                <HeadsetIcon />
                                <span className={clsx(styles['header-right-item-label'])}>
                                    <FormattedMessage id="header.support" />
                                </span>
                            </div>
                        </div>
                    )}
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
