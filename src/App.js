import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import Header from './containers/Header/Header';
import { history } from './redux';
import { publicRoutes } from './routes';
import Footer from './containers/Footer';
import ScrollToTop from './containers/ScrollTop';
import SystemHeader from './containers/System/SystemHeader';

const App = () => {
    let loading = useSelector((state) => state.app.loading);

    return (
        <LoadingOverlay active={loading} spinner>
            <BrowserRouter navigator={history}>
                <ScrollToTop />
                <div className="main-container">
                    <Header />
                    <SystemHeader />

                    <span className="content-container">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={`route-${index}`} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </span>

                    <Footer />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </LoadingOverlay>
    );
};

LoadingOverlay.propTypes = undefined;

export default App;
