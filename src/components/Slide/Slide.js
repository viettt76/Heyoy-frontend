import Carousel from 'react-bootstrap/Carousel';
import clsx from 'clsx';
import './Slide.scss'
import styles from './Slide.module.scss';
import slide1 from '~/assets/images/slides/slide1.png';
import slide2 from '~/assets/images/slides/slide2.png';
import slide3 from '~/assets/images/slides/slide3.jpg';
import slide4 from '~/assets/images/slides/slide4.png';

const Slide = () => {
    return (
        <>
            <Carousel prevIcon={<></>} nextIcon={<></>}>
                <Carousel.Item interval='1000'>
                    <div style={{ backgroundImage: `url(${slide1})` }} className={clsx(styles['slide'])}></div>
                </Carousel.Item>
                <Carousel.Item interval='1000'>
                    <div style={{ backgroundImage: `url(${slide2})` }} className={clsx(styles['slide'])}></div>
                </Carousel.Item>
                <Carousel.Item interval='1000'>
                    <div style={{ backgroundImage: `url(${slide3})` }} className={clsx(styles['slide'])}></div>
                </Carousel.Item>
                <Carousel.Item interval='1000'>
                    <div style={{ backgroundImage: `url(${slide4})` }} className={clsx(styles['slide'])}></div>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default Slide;
