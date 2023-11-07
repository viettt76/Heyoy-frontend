import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slide from '~/components/Slide';
import Section from '~/components/Section';

const Home = () => {
    const isLoggedIn = useSelector((state) => {
        let localIsLoggedIn = localStorage.getItem('persist:user');
        return localIsLoggedIn || state.user.isLoggedIn;
    });

    // let linkToNavigate = isLoggedIn ? '/' : '/login';

    return (
        <div>
            {/* <Navigate to={linkToNavigate} /> */}
            <Slide />
            <div>
                <Section label='Chuyên khoa' buttonSeeMore />
                <Section label='Cơ sở y tế' />
                <Section label='Bệnh viện' buttonSeeMore />
            </div>
        </div>
    );
};

export default Home;
