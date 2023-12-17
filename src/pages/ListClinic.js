import { useState, useEffect } from 'react';
import slugify from 'slugify';
import ListByTopic from '~/containers/ListByTopic';
import { getQuantityClinicService } from '~/services';
import { convertBufferToString } from '~/utils';

const ListClinic = () => {
    const [listClinic, setListClinic] = useState([]);

    useEffect(() => {
        const fetchQuantityClinic = async () => {
            let res = await getQuantityClinicService('all');
            if (res?.data?.length > 0) {
                setListClinic(
                    res.data.map((item) => {
                        return {
                            name: item?.name,
                            image: convertBufferToString(item?.image),
                            to: `/clinic/${slugify(item?.name.toLowerCase(), '-')}-${item?.id}`,
                        };
                    }),
                );
            } else {
                setListClinic([]);
            }
        };
        fetchQuantityClinic();
    }, []);

    return <ListByTopic topicVi="Phòng khám" topicEn="Clinics" data={listClinic} />;
};

export default ListClinic;
