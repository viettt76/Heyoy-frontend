import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import _ from 'lodash';
import slugify from 'slugify';
import Tippy from '@tippyjs/react/headless';
import logo from '~/assets/images/logo.png';
import styles from './Header.module.scss';
import { BarsIcon, ClockRotateLeftIcon, HeadsetIcon, SearchIcon } from '~/components/Icons';
import { LANGUAGES, convertBufferToString, useFormatMessage } from '~/utils';
import { getAppointmentByPatientService, searchService } from '~/services';
import MenuOffcanvas from '~/components/MenuOffcanvas';
import { languageSelector, userInfoSelector } from '~/store/selectors';
import { useDebounce } from '~/hooks';

const Header = () => {
    const location = useLocation();

    const language = useSelector(languageSelector);
    const userInfo = useSelector(userInfoSelector);

    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [showSearchResults, setShowSearchResults] = useState(false);

    const [listAppointments, setListAppointments] = useState([]);

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => setShowMenu(true);

    useEffect(() => {
        if (userInfo?.roleId === 'R3') {
            let fetchAppointmentByPatientService = async () => {
                let res = await getAppointmentByPatientService(userInfo?.id);
                if (res?.data) {
                    let data = res.data;
                    let arr = _.sortBy(data, ['date', 'timeType'], ['asc']);
                    setListAppointments(arr);
                }
            };
            fetchAppointmentByPatientService();
        }
    }, [userInfo, location]);

    let query = useDebounce(searchKeywords, 500);
    useEffect(() => {
        let fetchSearch = async () => {
            let res = await searchService(query);
            if (res?.data) {
                setSearchResults(res.data);
            } else {
                setSearchResults({});
            }
        };
        fetchSearch();
    }, [query]);

    useEffect(() => {
        setSearchKeywords('');
        setShowSearchResults(false);
    }, [location]);

    return (
        <div className={clsx(styles['header-container'])}>
            <Navbar expand="lg">
                <Container>
                    <div className={clsx(styles['header-left'])}>
                        <div className={clsx(styles['menu-popup-icon'])} onClick={handleShowMenu}>
                            <BarsIcon />
                        </div>
                        <MenuOffcanvas showMenu={showMenu} setShowMenu={setShowMenu} />

                        <Link className={clsx(styles['logo'])} to="/">
                            <img src={logo} alt="" />
                        </Link>

                        <ul className={[clsx(styles['nav-menu'])]}>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/list/specialty">
                                    <FormattedMessage id="header.Specialty" />
                                </NavLink>
                            </li>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/list/clinic">
                                    <FormattedMessage id="header.clinic" />
                                </NavLink>
                            </li>
                            <li className={clsx('d-md-block', 'd-none', styles['menu-item'])}>
                                <NavLink to="/list/doctor">
                                    <FormattedMessage id="header.doctor" />
                                </NavLink>
                            </li>
                        </ul>

                        <Tippy
                            interactive
                            visible={showSearchResults && !_.isEmpty(searchResults)}
                            placement="bottom"
                            onClickOutside={() => setShowSearchResults(false)}
                            render={(attrs) => (
                                <div className={clsx(styles['list-result-search'])} tabIndex="-1" {...attrs}>
                                    {_.isEmpty(searchResults) ? (
                                        <div>
                                            <FormattedMessage id="popular.no-data" />
                                        </div>
                                    ) : (
                                        <>
                                            {!_.isEmpty(searchResults) && searchResults?.specialty?.length > 0 && (
                                                <ul className={clsx(styles['result-by-field'])}>
                                                    {searchResults.specialty.map((specialty, index) => (
                                                        <li
                                                            className={clsx(styles['result-item'])}
                                                            key={`specialty-${index}`}
                                                        >
                                                            <Link
                                                                to={`/specialty/${slugify(
                                                                    specialty?.name?.toLowerCase(),
                                                                    '-',
                                                                )}-${specialty?.id}`}
                                                            >
                                                                {specialty?.image ? (
                                                                    <img
                                                                        className={clsx(styles['avatar'])}
                                                                        src={convertBufferToString(specialty?.image)}
                                                                        alt={specialty?.name}
                                                                    />
                                                                ) : (
                                                                    <i className="fa-solid fa-suitcase-medical"></i>
                                                                )}
                                                                {specialty?.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {!_.isEmpty(searchResults) && searchResults?.clinic?.length > 0 && (
                                                <ul className={clsx(styles['result-by-field'])}>
                                                    {searchResults.clinic.map((clinic, index) => (
                                                        <li
                                                            className={clsx(styles['result-item'])}
                                                            key={`clinic-${index}`}
                                                        >
                                                            <Link
                                                                to={`/clinic/${slugify(
                                                                    clinic?.name?.toLowerCase(),
                                                                    '-',
                                                                )}-${clinic?.id}`}
                                                            >
                                                                {clinic?.image ? (
                                                                    <img
                                                                        className={clsx(styles['avatar'])}
                                                                        src={convertBufferToString(clinic?.image)}
                                                                        alt={clinic?.name}
                                                                    />
                                                                ) : (
                                                                    <i className="fa-solid fa-hospital"></i>
                                                                )}
                                                                {clinic?.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {!_.isEmpty(searchResults) && searchResults?.doctor?.length > 0 && (
                                                <ul className={clsx(styles['result-by-field'])}>
                                                    {searchResults.doctor.map((doctor, index) => (
                                                        <li
                                                            className={clsx(styles['result-item'])}
                                                            key={`doctor-${index}`}
                                                        >
                                                            <Link
                                                                to={`/doctor/${slugify(
                                                                    `${doctor?.positionData?.valueVi?.toLowerCase()} ${doctor?.lastName?.toLowerCase()} ${doctor?.firstName?.toLowerCase()}`,
                                                                    '-',
                                                                )}-${doctor?.id}`}
                                                            >
                                                                {doctor?.image ? (
                                                                    <img
                                                                        className={clsx(styles['avatar'])}
                                                                        src={convertBufferToString(doctor?.image)}
                                                                        alt={
                                                                            language === LANGUAGES.VI
                                                                                ? `${doctor?.positionData?.valueVi} ${doctor?.lastName} ${doctor?.firstName}`
                                                                                : `${doctor?.positionData?.valueEn} ${doctor?.firstName} ${doctor?.lastName}`
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <i className="fa-solid fa-user-doctor"></i>
                                                                )}
                                                                {language === LANGUAGES.VI
                                                                    ? `${doctor?.positionData?.valueVi} ${doctor?.lastName} ${doctor?.firstName}`
                                                                    : `${doctor?.positionData?.valueEn} ${doctor?.firstName} ${doctor?.lastName}`}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        >
                            <div className={clsx(styles['search-input'])}>
                                <SearchIcon width="15px" height="15px" />
                                <input
                                    value={searchKeywords}
                                    placeholder={useFormatMessage('popular.search')}
                                    onChange={(e) => setSearchKeywords(e.target.value)}
                                    onFocus={() => setShowSearchResults(true)}
                                />
                            </div>
                        </Tippy>
                    </div>

                    {userInfo?.roleId === 'R3' && (
                        <div className={clsx(styles['header-right'])}>
                            <Tippy
                                arrow={true}
                                placement="bottom"
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
