import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import slugify from 'slugify';
import ListByTopic from '~/containers/ListByTopic';
import { getQuantityDoctorService } from '~/services';
import { languageSelector } from '~/store/selectors';
import { LANGUAGES, convertBufferToString } from '~/utils';

const ListDoctor = () => {
    const language = useSelector(languageSelector);

    const [listDoctor, setListDoctor] = useState([]);

    useEffect(() => {
        const fetchQuantityDoctor = async () => {
            let res = await getQuantityDoctorService('all');
            if (res?.data?.length > 0) {
                setListDoctor(
                    res.data.map((item) => {
                        return {
                            name:
                                language === LANGUAGES.VI
                                    ? `${item?.positionData?.valueVi} ${item?.lastName} ${item?.firstName}`
                                    : `${item?.positionData?.valueEn} ${item?.firstName} ${item?.lastName}`,
                            image: convertBufferToString(item?.image),
                            to: `/doctor/${slugify(
                                `${item?.positionData?.valueVi?.toLowerCase()} ${item?.lastName?.toLowerCase()} ${item?.firstName?.toLowerCase()}`,
                                '-',
                            )}-${item?.id}`,
                        };
                    }),
                );
            } else {
                setListDoctor([]);
            }
        };
        fetchQuantityDoctor();
    }, []);

    return <ListByTopic topicVi="Bác sĩ" topicEn="Doctors" data={listDoctor} />;
};

export default ListDoctor;
