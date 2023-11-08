import clsx from 'clsx';
import styles from './SectionItem.module.scss';

const SectionItem = ({ data = {}, numberItemInSlide }) => {
    return (
        <div
            className={clsx(styles['wrapper'], {
                [styles['wrapper-image']]: data.imageTypeAvatar,
                [styles['wrapper-subtitle']]: data.subtitle,
            })}
        >
            <div
                style={{ backgroundImage: `url(${data.src})` }}
                className={clsx(styles['image'], {
                    [styles['avatar']]: data.imageTypeAvatar,
                })}
            ></div>
            {data.title && <span className={clsx(styles['title'])}>{data.title}</span>}
            {data.subtitle && <span className={clsx(styles['subtitle'])}>{data.subtitle}</span>}
            {data.description && <span className={clsx(styles['description'])}>{data.description}</span>}
        </div>
    );
};

export default SectionItem;
