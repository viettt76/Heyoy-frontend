import { useEffect, useState } from 'react';
import slugify from 'slugify';
import Slide from '~/components/Slide';
import Section from '~/components/Section';
import { getQuantityDoctorService, getQuantitySpecialtyService, getQuantityClinicService } from '~/services';
import { convertBufferToString, path } from '~/utils';

const Home = () => {
    const [listDoctors, setListDoctors] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);
    const [listClinic, setListClinic] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            let resSpecialty = await getQuantitySpecialtyService('all');
            setListSpecialty(resSpecialty?.data || []);
            let resClinic = await getQuantityClinicService('all');
            setListClinic(resClinic?.data || []);
            let resDoctor = await getQuantityDoctorService('all');
            setListDoctors(resDoctor?.data || []);
        };
        fetchApi();
    }, []);

    const listSection = [
        {
            label: 'homepage.specialty',
            numberItemInSlide: 3,
            buttonSeeMore: true,
            seeMoreTo: path.LIST_SPECIALTY,
            data:
                listSpecialty.length > 0 &&
                listSpecialty.map((specialty) => {
                    let titleVn = specialty?.name;
                    let titleEn = specialty?.name;
                    let srcImage = convertBufferToString(specialty?.image);
                    return {
                        titleVn,
                        titleEn,
                        src: srcImage,
                        to: `/specialty/${slugify(specialty?.name?.toLowerCase(), '-')}-${specialty?.id}`,
                    };
                }),
        },
        {
            label: 'homepage.clinic',
            numberItemInSlide: 3,
            buttonSeeMore: true,
            seeMoreTo: path.LIST_CLINIC,
            data:
                listClinic?.length > 0 &&
                listClinic.map((clinic) => {
                    let titleVn = clinic?.name;
                    let titleEn = clinic?.name;
                    let srcImage = convertBufferToString(clinic?.image);
                    return {
                        titleVn,
                        titleEn,
                        src: srcImage,
                        to: `/clinic/${slugify(clinic?.name?.toLowerCase(), '-')}-${clinic?.id}`,
                    };
                }),
        },
        {
            label: 'homepage.outstanding-doctor',
            numberItemInSlide: 4,
            buttonSeeMore: true,
            seeMoreTo: path.LIST_DOCTOR,
            data:
                listDoctors?.length > 0 &&
                listDoctors.map((doctor) => {
                    let titleVn = `${doctor?.positionData?.valueVi} ${doctor?.lastName} ${doctor?.firstName}`;
                    let titleEn = `${doctor?.positionData?.valueEn} ${doctor?.firstName} ${doctor?.lastName}`;
                    let srcImage = convertBufferToString(doctor.image);
                    return {
                        titleVn,
                        titleEn,
                        src: srcImage,
                        imageTypeAvatar: true,
                        to: `/doctor/${slugify(
                            `${doctor?.positionData?.valueVi?.toLowerCase()} ${doctor?.lastName?.toLowerCase()} ${doctor?.firstName?.toLowerCase()}`,
                            '-',
                        )}-${doctor?.id}`,
                    };
                }),
        },
        // {
        //     label: 'Sức khỏe tinh thần',
        //     numberItemInSlide: 3,
        //     buttonSeeMore: false,
        //     data: [
        //         {
        //             subtitle:
        //                 'Mười địa chỉ niềng răng ở Hà Nội được tìm kiếm nhiều trên mạng xã hội trong     2                   tuần qua',
        //             titleVn: 'Bài test sức khoẻ',
        //             titleEn: 'Bài test sức khoẻ',
        //             src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
        //              description: 'hahahahahaha
        //         },
        //     ],
        // },
    ];

    return (
        <div>
            <Slide />
            <div>
                {listSection.map((section, index) => {
                    return (
                        section.data && (
                            <Section
                                key={`section-${index}`}
                                label={section.label}
                                buttonSeeMore={section.buttonSeeMore}
                                seeMoreTo={section.seeMoreTo}
                                listSectionItems={section.data}
                                numberItemInSlide={section.numberItemInSlide}
                            />
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
