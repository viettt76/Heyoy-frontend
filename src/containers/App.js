import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';

import { path } from '../utils';

import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
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
                    {isLoggedIn && <Header />}

                    <span className="content-container">
                        <Routes>
                            <Route path={path.HOME} element={<Home />} />
                            <Route path={path.LOGIN} element={<Login />} />
                            <Route path={path.SYSTEM} element={<System />} />
                        </Routes>
                    </span>

                    <ToastContainer />
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;
