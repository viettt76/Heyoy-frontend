import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import clsx from 'clsx';
import Booking from '~/components/Booking';
import styles from './DetailSpecialty.module.scss';
import { getAllCodeService, getDetailSpecialtyService, getDoctorBySpecialtyAndProvinceService } from '~/services';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '~/utils';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { languageSelector } from '~/store/seletors';

const DetailSpecialty = () => {
    let { id } = useParams();

    let language = useSelector(languageSelector);

    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [listDoctors, setListDoctors] = useState([]);
    const [hideLessDescription, setHideLessDescription] = useState(true);
    const [listProvinceFromApi, setListProvinceFromApi] = useState([]);
    const [province, setProvince] = useState({});

    useEffect(() => {
        let fetchListDoctors = async () => {
            let res = await getDoctorBySpecialtyAndProvinceService(id, 'all');
            if (res?.data) {
                setListDoctors(res.data);
            }
        };
        fetchListDoctors();

        let fetchDetailSpecialty = async () => {
            let res = await getDetailSpecialtyService(id);
            if (res?.data) {
                setDescriptionHTML(res.data?.descriptionHTML || '');
            }
        };
        fetchDetailSpecialty();
    }, [id]);

    useEffect(() => {
        let fetchAllProvince = async () => {
            let res = await getAllCodeService('province');
            if (res?.data) {
                let arr = [
                    {
                        label: language === LANGUAGES.VI ? 'Toàn quốc' : 'Nationwide',
                        value: 'all',
                    },
                ];
                res.data?.forEach((province) => {
                    arr.push({
                        label: language === LANGUAGES.VI ? province?.valueVi : province?.valueEn,
                        value: province?.keyMap,
                    });
                });
                setListProvinceFromApi(arr);
            }
        };
        fetchAllProvince();
    }, [language]);

    useEffect(() => {
        listProvinceFromApi?.length > 0 && setProvince(listProvinceFromApi[0]);
    }, [listProvinceFromApi]);

    useEffect(() => {
        let fetchListDoctors = async () => {
            let res = await getDoctorBySpecialtyAndProvinceService(id, province.value || 'all');
            if (res?.data) {
                setListDoctors(res.data);
            } else {
                setListDoctors([]);
            }
        };
        fetchListDoctors();
    }, [province, id]);

    return (
        <Container className="mt-3">
            <div
                className={clsx(styles['description'], {
                    [styles['description-hide-less']]: hideLessDescription,
                })}
                dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
            {hideLessDescription ? (
                <span className={clsx(styles['toggle-see-more'])} onClick={() => setHideLessDescription(false)}>
                    <FormattedMessage id="detail-specialty.read-more" />
                </span>
            ) : (
                <span className={clsx(styles['toggle-see-more'])} onClick={() => setHideLessDescription(true)}>
                    <FormattedMessage id="detail-specialty.hide-less" />
                </span>
            )}
            <div className="col-2 mt-2 mb-2">
                <Select placeholder="" value={province} onChange={setProvince} options={listProvinceFromApi} />
            </div>
            {listDoctors?.length > 0 ? (
                listDoctors.map((doctors, index) => {
                    return <Booking key={`doctor-${index}`} data={doctors} />;
                })
            ) : (
                <div style={{ fontStyle: 'italic', marginBottom: '10px', textAlign: 'center' }}>
                    <FormattedMessage id="detail-specialty.no-doctor" />
                </div>
            )}
        </Container>
    );
};

export default DetailSpecialty;
