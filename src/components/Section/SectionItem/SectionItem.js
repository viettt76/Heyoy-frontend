import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LANGUAGES } from '~/utils';
import styles from './SectionItem.module.scss';
import { languageSelector } from '~/store/selectors';

const SectionItem = ({ data }) => {
    let language = useSelector(languageSelector);

    const wrapperTitleRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        if (wrapperTitleRef?.current) {
            let wrapperTitleHeight = wrapperTitleRef.current.clientHeight;
            if (wrapperTitleHeight > 60) {
                if (titleRef?.current) {
                    Object.assign(titleRef.current.style, {
                        paddingTop: '0',
                        marginTop: '3px',
                        marginBottom: '0',
                    });
                }
            }
        }
    }, []);

    return (
        <Link
            to={data.to}
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
            <div ref={wrapperTitleRef} className={clsx(styles['wrapper-title'])}>
                <span ref={titleRef} className={clsx(styles['title'])}>
                    {language === LANGUAGES.VI ? data?.titleVn && data.titleVn : data?.titleEn && data.titleEn}
                </span>
                {data.subtitle && <span className={clsx(styles['subtitle'])}>{data.subtitle}</span>}
                {data.description && <span className={clsx(styles['description'])}>{data.description}</span>}
            </div>
        </Link>
    );
};

SectionItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SectionItem;
