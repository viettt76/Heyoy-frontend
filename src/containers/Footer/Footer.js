import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import logo from '~/assets/images/logo.png';

const Footer = () => {
    const location = useLocation();

    if (location.pathname.includes('/system') || location.pathname === '/login') {
        return null;
    }
    
    return (
        <div className={clsx('d-md-flex', styles['footer'])}>
            <div className={clsx('col-md-6')}>
                <Link to="/">
                    <img className={clsx(styles['logo'])} src={logo} alt="logo" width="60px" />
                </Link>
                <div>
                    <span>
                        <b>Công ty Cổ phần Công nghệ BookingCare</b>
                    </span>
                    <span>
                        <i className="fa-solid fa-location-dot"></i> &nbsp;Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường
                        Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                    </span>
                    <span>
                        <i className="fa-solid fa-check"></i> &nbsp;ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày
                        16/03/2015
                    </span>
                </div>
                <div className={clsx('mt-3')}>
                    <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" width="78px" />
                    <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" width="78px" />
                </div>
                <div>
                    <span>
                        <b>Văn phòng tại TP Hồ Chí Minh</b>
                    </span>
                    <span>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</span>
                </div>
                <div className={clsx('mt-3')}>
                    <span>
                        <b>Hỗ trợ khách hàng</b>
                    </span>
                    <span>support@bookingcare.vn (7h - 18h)</span>
                </div>
                <div className={clsx('mt-3')}>
                    <span>
                        <b>Hotline</b>
                    </span>
                    <span>
                        <span className={clsx(styles['hotline'])}>024-7301-2468</span> (7h - 18h)
                    </span>
                </div>
            </div>
            <ul className={clsx('col-md-3', 'mt-md-0', 'mt-3', styles['list-menu'])}>
                <li>
                    <Link to="/">Liên hệ hợp tác</Link>
                </li>
                <li>
                    <Link to="/">Danh bạ y tế</Link>
                </li>
                <li>
                    <Link to="/">Sức khỏe doanh nghiệp</Link>
                </li>
                <li>
                    <Link to="/">Gói chuyển đổi số doanh nghiệp</Link>
                </li>
                <li>
                    <Link to="/">Tuyển dụng</Link>
                </li>
                <li>
                    <Link to="/">Câu hỏi thường gặp</Link>
                </li>
                <li>
                    <Link to="/">Điều khoản sử dụng</Link>
                </li>
                <li>
                    <Link to="/">Chính sách Bảo mật</Link>
                </li>
                <li>
                    <Link to="/">Quy trình hỗ trợ giải quyết khiếu nại</Link>
                </li>
                <li>
                    <Link to="/">Quy chế hoạt động</Link>
                </li>
            </ul>
            <div className={clsx('col-md-3')}>
                <span>
                    <b style={{ whiteSpace: 'nowrap' }}>Đối tác bảo trợ nội dung</b>
                </span>
                <div className={clsx('mt-md-2', styles['partner'])}>
                    <img
                        className={clsx(styles['partner-image'])}
                        src="https://cdn.bookingcare.vn/fo/w256/2023/09/08/093706-hellodoctorlogo.png"
                        alt=""
                    />
                    <div className={clsx(styles['partner-content'])}>
                        <b>Hello Doctor</b>
                        <span>Bảo trợ chuyên mục nội dung “sức khỏe tinh thần”</span>
                    </div>
                </div>
                <div className={clsx('mt-md-3', styles['partner'])}>
                    <img
                        className={clsx(styles['partner-image'])}
                        src="https://cdn.bookingcare.vn/fo/w256/2022/03/21/082316-logo-bernard.png"
                        alt=""
                    />
                    <div className={clsx(styles['partner-content'])}>
                        <b>Hệ thống y khoa chuyên sâu quốc tế Bernard</b>
                        <span>Bảo trợ chuyên mục nội dung “y khoa chuyên sâu”</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
