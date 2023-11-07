import clsx from 'clsx';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import SectionItem from './SectionItem';
import styles from './Section.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';

const NextArrow = ({ className, style, onClick }) => {
    return (
        <div className={clsx(className, styles['next-btn'])} style={{ ...style }} onClick={onClick}>
            <ChevronRightIcon />
        </div>
    );
};

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <div className={clsx(className, styles['prev-btn'])} style={{ ...style }} onClick={onClick}>
            <ChevronLeftIcon />
        </div>
    );
};

const Section = ({ label, buttonSeeMore }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['section-top'])}>
                <h5 className={clsx(styles['section-label'])}>{label}</h5>
                {buttonSeeMore && <Button className={clsx(styles['btn-see-more'])}>Xem thêm</Button>}
            </div>
            <Slider
                infinite={true}
                speed={1000}
                slidesToShow={1}
                slidesToScroll={1}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
            >
                <div className={clsx(styles['slide'])}>
                    <SectionItem
                        title="Cơ xương khớp"
                        src="https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg"
                    />
                    <SectionItem
                        title="Thần kinh"
                        src="https://cdn.bookingcare.vn/fo/w640/2023/06/20/113208-than-kinh.jpg"
                    />
                    <SectionItem
                        title="Tiêu hoá"
                        src="https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg"
                    />
                </div>
                <div className={clsx(styles['slide'])}>
                    <SectionItem
                        title="Tim mạch"
                        src="https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg"
                    />
                    <SectionItem
                        title="Tai mũi họng"
                        src="https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Section;
