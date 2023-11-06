import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

import logo from '~/assets/images/logo.png';
import styles from './Header.module.scss';
import * as actions from '../../store/actions';
import { BarsIcon, ClockRotateLeftIcon, HeadsetIcon, SearchIcon } from '~/components/Icons';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const processLogout = () => dispatch(actions.processLogout());

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={clsx(styles['header-container'])}>
                <div className={clsx(styles['header-left'])}>
                    <div className={clsx(styles['menu'])} onClick={handleShow}>
                        <BarsIcon />
                    </div>
                    <Offcanvas show={show} onHide={handleClose}>
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
                            <NavLink activestyle={{ color: 'red' }} to="/dich-vu/tai-nha">
                                Tại nhà
                            </NavLink>
                        </li>
                        <li className={clsx(styles['menu-item'])}>
                            <NavLink activestyle={{ color: 'red' }} to="/dich-vu/tai-vien">
                                Tại viện
                            </NavLink>
                        </li>
                        <li className={clsx(styles['menu-item'])}>
                            <NavLink activestyle={{ color: 'red' }} to="/dich-vu/song-khoe">
                                Sống khoẻ
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
                        <span>Lịch hẹn</span>
                    </div>
                    <div className={clsx(styles['header-right-item'])}>
                        <HeadsetIcon />
                        <span>Hỗ trợ</span>
                    </div>
                </div>

                <div className={clsx('btn', styles['btn-logout'])} onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </>
    );
};

export default Header;
