import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import logo from '~/assets/images/logo.png';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
    return (
        <div className={clsx('d-md-flex flex-wrap', styles['footer'])}>
            <div className={clsx('col-md-6')}>
                <Link to="/">
                    <img className={clsx(styles['logo'])} src={logo} alt="logo" width="60px" />
                </Link>
                <div>
                    <span>
                        <b>
                            <FormattedMessage id="footer.name-company" />
                        </b>
                    </span>
                    <span>
                        <i className="fa-solid fa-location-dot"></i> &nbsp;{' '}
                        <FormattedMessage id="footer.address-company" />
                    </span>
                    <span>
                        <i className="fa-solid fa-check"></i> &nbsp;
                        <FormattedMessage id="footer.business-registration-date" />
                    </span>
                </div>
                <div className={clsx('mt-3')}>
                    <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" width="78px" />
                    <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" width="78px" />
                </div>
                <div>
                    <span>
                        <b>
                            <FormattedMessage id="footer.office" />
                        </b>
                    </span>
                    <span>
                        <FormattedMessage id="footer.address-office" />
                    </span>
                </div>
                <div className={clsx('mt-3')}>
                    <span>
                        <b>
                            <FormattedMessage id="footer.customer-support" />
                        </b>
                    </span>
                    <span>support@bookingcare.vn</span>
                </div>
                <div className={clsx('mt-3')}>
                    <span>
                        <b>Hotline</b>
                    </span>
                    <span>
                        <span className={clsx(styles['hotline'])}>024-7301-2468</span>
                    </span>
                </div>
            </div>
            <ul className={clsx('col-lg-3 col-md-6', 'mt-md-0', 'mt-5', styles['list-menu'])}>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.contact-for-cooperation" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.medical-directory" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.business-health" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.enterprise-digital-transformation-package" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.recruitment" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.frequently-asked-questions" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.term" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.privacy-policy" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.complaint-resolution-support-process" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FormattedMessage id="footer.operating-regulations" />
                    </Link>
                </li>
            </ul>
            <div className={clsx('col-lg-3 col-md-12 mt-md-5 mt-sm-5')}>
                <span>
                    <b style={{ whiteSpace: 'nowrap' }}>
                        <FormattedMessage id="footer.content-sponsorship-partners" />
                    </b>
                </span>
                <div className={clsx('mt-md-2', styles['partner'])}>
                    <img
                        className={clsx(styles['partner-image'])}
                        src="https://cdn.bookingcare.vn/fo/w256/2023/09/08/093706-hellodoctorlogo.png"
                        alt=""
                    />
                    <div className={clsx(styles['partner-content'])}>
                        <b>Hello Doctor</b>
                        <span>
                            <FormattedMessage id="footer.sponsor-the-content-section" /> “
                            <FormattedMessage id="footer.mental-health" />”
                        </span>
                    </div>
                </div>
                <div className={clsx('mt-md-3', styles['partner'])}>
                    <img
                        className={clsx(styles['partner-image'])}
                        src="https://cdn.bookingcare.vn/fo/w256/2022/03/21/082316-logo-bernard.png"
                        alt=""
                    />
                    <div className={clsx(styles['partner-content'])}>
                        <b>
                            <FormattedMessage id="footer.international-specialized-medical-system" />
                        </b>
                        <span>
                            <FormattedMessage id="footer.sponsor-the-content-section" /> “
                            <FormattedMessage id="footer.specialized-medicine" />”
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
