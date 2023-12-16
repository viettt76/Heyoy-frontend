import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import Booking from '~/components/Booking';
import styles from './DetailClinic.module.scss';
import { getDetailClinicService, getDoctorByClinicService } from '~/services';
import { convertBufferToString } from '~/utils';
import { FormattedMessage } from 'react-intl';

const DetailSpecialty = () => {
    let { slug } = useParams();
    const lastHyphenIndex = slug.lastIndexOf('-');
    let id = -1;
    if (lastHyphenIndex > 0) {
        id = slug.slice(lastHyphenIndex + 1);
    }

    const [listDoctors, setListDoctors] = useState([]);
    const [detailClinic, setDetailClinic] = useState({});

    useEffect(() => {
        let fetchListDoctors = async () => {
            let res = await getDoctorByClinicService(id);
            if (res?.data) {
                setListDoctors(res.data);
            } else {
                setListDoctors([]);
            }
        };
        fetchListDoctors();

        let fetchDetailClinic = async () => {
            let res = await getDetailClinicService(id);
            if (res?.data) {
                setDetailClinic(res.data);
            }
        };
        fetchDetailClinic();
    }, [id]);

    return (
        <Container className="mt-3">
            <div className={clsx(styles['banner'])}>
                <img className={clsx(styles['clinic-image'])} src={convertBufferToString(detailClinic?.image)} alt="" />
                <div>
                    <span className={clsx(styles['clinic-name'])}>{detailClinic?.name}</span>
                    <span className={clsx(styles['clinic-address'])}>{detailClinic?.address}</span>
                </div>
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
            <div
                className={clsx(styles['description'])}
                dangerouslySetInnerHTML={{ __html: detailClinic?.descriptionHTML }}
            />
        </Container>
    );
};

export default DetailSpecialty;
