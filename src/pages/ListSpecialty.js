import { useState, useEffect } from 'react';
import slugify from 'slugify';
import ListByTopic from '~/containers/ListByTopic';
import { getQuantitySpecialtyService } from '~/services';
import { convertBufferToString } from '~/utils';

const ListSpecialty = () => {
    const [listSpecialty, setListSpecialty] = useState([]);

    useEffect(() => {
        const fetchQuantitySpecialty = async () => {
            let res = await getQuantitySpecialtyService('all');
            if (res?.data?.length > 0) {
                setListSpecialty(
                    res.data.map((item) => {
                        return {
                            name: item?.name,
                            image: convertBufferToString(item?.image),
                            to: `/specialty/${slugify(item?.name.toLowerCase(), '-')}-${item?.id}`,
                        };
                    }),
                );
            } else {
                setListSpecialty([]);
            }
        };
        fetchQuantitySpecialty();
    }, []);

    return <ListByTopic topicVi="Chuyên khoa" topicEn="Specialties" data={listSpecialty} />;
};

export default ListSpecialty;
