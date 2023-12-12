import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MenuOffcanvas.module.scss';
import { LANGUAGES, path } from '~/utils';
import * as actions from '~/store/actions';
import { isLoggedInSelector, languageSelector, userInfoSelector } from '~/store/seletors';

const MenuOffcanvas = ({ showMenu, handleCloseMenu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language = useSelector(languageSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const userInfo = useSelector(userInfoSelector);

    const [isDoctorOrAdmin, setIsDoctorOrAdmin] = useState(false);

    useEffect(() => {
        if (userInfo?.roleId === 'R1' || userInfo?.roleId === 'R2') {
            setIsDoctorOrAdmin(true);
        } else {
            setIsDoctorOrAdmin(false);
        }
    }, [userInfo]);

    const processLogout = () => {
        dispatch(actions.processLogout());
        navigate(path.HOME);
    };

    const handleChangeLanguage = (language) => {
        dispatch(actions.appChangeLanguage(language));
    };

    return (
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
                            <Link to="/login">
                                <FormattedMessage id="header.login" />
                            </Link>
                        </li>
                    )}

                    {isLoggedIn && (
                        <li className={clsx(styles['menu-popup-item'])}>
                            <Link to="/me/personal-information">
                                <FormattedMessage id="header.personal-information" />
                            </Link>
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
                    {isDoctorOrAdmin && (
                        <li className={clsx(styles['menu-popup-item'])}>
                            <Link to="/">
                                {' '}
                                <FormattedMessage id="header.home" />
                            </Link>
                        </li>
                    )}
                    {isDoctorOrAdmin && (
                        <li className={clsx(styles['menu-popup-item'])}>
                            <Link to="/system/manage-user">
                                {' '}
                                <FormattedMessage id="header.system" />
                            </Link>
                        </li>
                    )}
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MenuOffcanvas;
