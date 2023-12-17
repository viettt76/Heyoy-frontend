import clsx from 'clsx';
import Slider from 'react-slick';
import SectionItem from './SectionItem';
import styles from './Section.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { FormattedMessage } from 'react-intl';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';

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

const Section = ({ label, buttonSeeMore, seeMoreTo, listSectionItems, numberItemInSlide = 1 }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['section-top'])}>
                <h5 className={clsx(styles['section-label'])}>
                    <FormattedMessage id={label} />
                </h5>
                {buttonSeeMore && (
                    <Link to={seeMoreTo} className={clsx(styles['btn-see-more'])}>
                        <FormattedMessage id="homepage.see-more" />
                    </Link>
                )}
            </div>
            <Slider
                infinite={false}
                speed={1000}
                slidesToShow={numberItemInSlide}
                slidesToScroll={numberItemInSlide}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                className={clsx({ 'float-left': listSectionItems?.length < numberItemInSlide })}
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
                {listSectionItems?.length > 0 &&
                    listSectionItems.map((item, index) => {
                        return (
                            <SectionItem
                                numberItemInSlide={numberItemInSlide}
                                key={`section-item-${index}`}
                                data={item}
                            />
                        );
                    })}
            </Slider>
        </div>
    );
};

Section.propTypes = {
    label: PropTypes.string.isRequired,
    buttonSeeMore: PropTypes.bool,
    listSectionItems: oneOfType([PropTypes.array.isRequired, PropTypes.bool.isRequired]),
    numberItemInSlide: PropTypes.number,
};

export default Section;
