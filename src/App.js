import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { history } from './redux';
import { ToastContainer } from 'react-toastify';
import Header from './containers/Header/Header';
import { publicRoutes } from './routes';

const App = ({ persist, onBeforeLift }) => {
    const isLoggedIn = useSelector((state) => {
        let localIsLoggedIn = localStorage.getItem('isLoggedIn');
        return localIsLoggedIn || state.user.isLoggedIn;
    });

    const [bootstrapped, setBootstrapped] = useState(persist.getState());

    useEffect(() => {
        handlePersistState();
    });

    const handlePersistState = () => {
        if (bootstrapped) {
            if (onBeforeLift) {
                Promise.resolve(onBeforeLift())
                    .then(() => setBootstrapped(true))
                    .catch(() => setBootstrapped(true));
            } else {
                setBootstrapped(true);
            }
        }
    };

    return (
        <>
            <BrowserRouter navigator={history}>
                <div className="main-container">
                    {/* {isLoggedIn && <Header />} */}
                    <Header />

                    <span className="content-container">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={`route-${index}`} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </span>

                    <ToastContainer />
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;
