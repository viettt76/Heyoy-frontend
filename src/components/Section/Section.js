import clsx from 'clsx';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import SectionItem from './SectionItem';
import styles from './Section.module.scss';
import './Section.scss'
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

const Section = ({ label, buttonSeeMore, listSectionItems = [], numberItemInSlide = 1 }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['section-top'])}>
                <h5 className={clsx(styles['section-label'])}>{label}</h5>
                {buttonSeeMore && <Button className={clsx(styles['btn-see-more'])}>Xem thêm</Button>}
            </div>
            <Slider
                infinite={false}
                speed={1000}
                slidesToShow={numberItemInSlide}
                slidesToScroll={numberItemInSlide}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                responsive={[
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ]}
            >
                {listSectionItems.map((item, index) => {
                    return (
                        <SectionItem numberItemInSlide={numberItemInSlide} key={`section-item-${index}`} data={item} />
                    );
                })}
            </Slider>
        </div>
    );
};

export default Section;
