import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slide from '~/components/Slide';

const Home = () => {
    const isLoggedIn = useSelector((state) => {
        let localIsLoggedIn = localStorage.getItem('persist:user');
        console.log(typeof localIsLoggedIn);
        return localIsLoggedIn || state.user.isLoggedIn;
    });

    let linkToNavigate = isLoggedIn ? '/' : '/login';

    console.log(linkToNavigate);
    return (
        <div>
            <Navigate to={linkToNavigate} />
            <Slide />
        </div>
    );
};

export default Home;
