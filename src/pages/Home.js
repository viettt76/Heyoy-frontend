import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slide from '~/components/Slide';
import Section from '~/components/Section';

const Home = () => {
    const isLoggedIn = useSelector((state) => {
        return state.user.isLoggedIn;
    });

    let linkToNavigate = isLoggedIn ? '/' : '/login';

    const listSection = [
        {
            label: 'Cơ xương khớp',
            numberItemInSlide: 3,
            buttonSeeMore: true,
            data: [
                {
                    title: 'Cơ xương khớp',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg',
                },
                {
                    title: 'Thần kinh',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/113208-than-kinh.jpg',
                },
                {
                    title: 'Tiêu',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg',
                },
                {
                    title: 'Hoá',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg',
                },
                {
                    title: 'Miu',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/112457-co-xuong-khop.jpg',
                },
                {
                    title: 'Mèo',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/113208-than-kinh.jpg',
                },
                {
                    title: 'Quỷ',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/06/20/113208-than-kinh.jpg',
                },
            ],
        },
        {
            label: 'Bác sĩ nổi bật',
            numberItemInSlide: 4,
            buttonSeeMore: true,
            data: [
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
                {
                    title: 'Bác sĩ chuyên khoa II Trần Minh Khuyên',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2020/03/17/114430-bshung.jpg',
                    imageTypeAvatar: true,
                    description: 'Sức khoẻ tâm thần, Tư vấn, trị liệu Tâm lý',
                },
            ],
        },
        {
            label: 'Gợi ý của BookingCare',
            numberItemInSlide: 4,
            buttonSeeMore: false,
            data: [
                {
                    title: 'Cơ sở y tế',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2023/11/01/141017-csyt.png',
                    imageTypeAvatar: true,
                },
                {
                    title: 'Bác sĩ',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2023/11/01/141017-csyt.png',
                    imageTypeAvatar: true,
                },
                {
                    title: 'Chuyên khoa',
                    src: 'https://cdn.bookingcare.vn/fo/w384/2023/11/01/141017-csyt.png',
                    imageTypeAvatar: true,
                },
            ],
        },
        {
            label: 'Sức khỏe tinh thần',
            numberItemInSlide: 3,
            buttonSeeMore: false,
            data: [
                {
                    title: 'Bài test sức khoẻ',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    title: 'Sức khỏe tâm thần',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    title: 'Tư vấn trị liệu từ xa',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    title: 'Bài test sức khoẻ',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    title: 'Sức khỏe tâm thần',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    title: 'Tư vấn trị liệu từ xa',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
            ],
        },
        {
            label: 'Cẩm nang',
            numberItemInSlide: 4,
            buttonSeeMore: true,
            data: [
                {
                    subtitle: 'Mười địa chỉ niềng răng ở Hà Nội được tìm kiếm nhiều trên mạng xã hội trong 2 tuần qua',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    subtitle: 'Mười địa chỉ niềng răng ở Hà Nội được tìm kiếm nhiều trên mạng xã hội trong 2 tuần qua',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    subtitle: 'Mười địa chỉ niềng răng ở Hà Nội được tìm kiếm nhiều trên mạng xã hội trong 2 tuần qua',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
                {
                    subtitle: 'Mười địa chỉ niềng răng ở Hà Nội được tìm kiếm nhiều trên mạng xã hội trong 2 tuần qua',
                    src: 'https://cdn.bookingcare.vn/fo/w640/2023/11/01/141458-congdongtinhthan.jpeg',
                },
            ],
        },
    ];
    
    return (
        <div>
            {/* <Navigate to={linkToNavigate} /> */}
            <Slide />
            <div>
                {listSection.map((section, index) => {
                    return (
                        <Section
                            key={`section-${index}`}
                            label={section.label}
                            buttonSeeMore={section.buttonSeeMore}
                            listSectionItems={section.data}
                            numberItemInSlide={section.numberItemInSlide}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
