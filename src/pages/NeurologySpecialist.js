import { Container } from 'react-bootstrap';
import Book from '~/components/Book';

const listDoctors = [
    {
        name: 'Bác sĩ Nguyễn Văn Doanh',
        image: 'https://cdn.bookingcare.vn/fr/w200/2017/12/23/170155nguyen-van-doanh.jpg',
        description:
            'Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc Nguyên chủ nhiệm khoa thần kinh, Bệnh  viện Hữu Nghị Việt Xô Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh Bác sĩ khám cho người bệnh từ 16 tuổi trở lên',
        days: ['Thứ 2 - 16/11', 'Thứ 3 - 17/11', 'Thứ 4 - 18/11'],
        listTimes: ['8:00 - 8:30', '8:30 - 9:00', '12:00 - 12:30'],
        address: 'Hệ thống Y tế Thu Cúc cơ sở Thụy Khuê 286 Thụy Khuê, quận Tây Hồ, Hà Nội',
        price: '150.000đ'
    },
    {
        name: 'Bác sĩ Nguyễn Văn Doanh',
        image: 'https://cdn.bookingcare.vn/fr/w200/2017/12/23/170155nguyen-van-doanh.jpg',
        description:
            'Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc Nguyên chủ nhiệm khoa thần kinh, Bệnh  viện Hữu Nghị Việt Xô Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh Bác sĩ khám cho người bệnh từ 16 tuổi trở lên',
        days: ['Thứ 2 - 16/11', 'Thứ 3 - 17/11', 'Thứ 4 - 18/11'],
        listTimes: ['8:00 - 8:30', '8:30 - 9:00', '12:00 - 12:30'],
        address: 'Hệ thống Y tế Thu Cúc cơ sở Thụy Khuê 286 Thụy Khuê, quận Tây Hồ, Hà Nội',
        price: '150.000đ'
    },
];

const NeurologySpecialist = () => {
    return (
        <Container className="mt-3">
            {listDoctors.map((doctors, index) => {
                return  <Book key={`doctor-${index}`} data={doctors} />
            })}
           
        </Container>
    );
};

export default NeurologySpecialist;
