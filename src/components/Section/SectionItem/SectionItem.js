import clsx from 'clsx';
import styles from './SectionItem.module.scss';

const SectionItem = ({ title, src = '', alt = '' }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div style={{ backgroundImage: `url(${src})` }} className={clsx(styles['image'])}></div>
            <span className={clsx(styles['title'])}>{title}</span>
        </div>
    );
};

export default SectionItem;
