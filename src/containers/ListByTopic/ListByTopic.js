import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';
import styles from './ListByTopic.module.scss';
import { useSelector } from 'react-redux';
import { languageSelector } from '~/store/selectors';
import { LANGUAGES } from '~/utils';
import { useEffect, useState } from 'react';

const ListByTopic = ({ topicVi, topicEn, data }) => {
    const language = useSelector(languageSelector);
    const [searchInput, setSearchInput] = useState('');
    const [listByTopic, setListByTopic] = useState([]);

    useEffect(() => {
        setListByTopic(data);
    }, [data]);

    useEffect(() => {
        setListByTopic(
            data.filter((item) => {
                return _.includes(item?.name?.toLowerCase(), searchInput?.toLowerCase());
            }),
        );
    }, [searchInput, data]);

    return (
        <Container>
            {data?.length > 0 && (
                <div className={clsx('pt-3', styles['header'])}>
                    <h4 className={clsx(styles['title'])}>
                        <FormattedMessage id="list-by-topic.list" />{' '}
                        {language === LANGUAGES.VI ? topicVi?.toLowerCase() : topicEn?.toLowerCase()}
                    </h4>
                    <div className={clsx(styles['input-search'])}>
                        <input
                            value={searchInput}
                            placeholder={`Tìm kiếm ${topicVi?.toLowerCase()}`}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <Row>
                {listByTopic?.length > 0 ? (
                    listByTopic.map((item, index) => {
                        return (
                            <Link to={item?.to} className="col-lg-3 col-md-4 col-sm-6" key={`item-${index}`}>
                                <div className={clsx(styles['wrapper-image'])}>
                                    <img className={clsx(styles['image'])} src={item?.image} alt={item?.name} />
                                </div>
                                <p className="text-center">{item?.name}</p>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-12 text-center mt-4 mb-3">
                        <FormattedMessage id="list-by-topic.no-have" />{' '}
                        {language === LANGUAGES.VI ? `${topicVi?.toLowerCase()} nào` : topicEn?.toLowerCase()}
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default ListByTopic;
