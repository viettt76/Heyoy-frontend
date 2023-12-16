import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { history } from './redux';
import { publicRoutes } from './routes';
import LayoutDefault from './layouts/LayoutDefault';
import ScrollToTop from './containers/ScrollTop';

const App = () => {
    let loading = useSelector((state) => state.app.loading);

    return (
        <LoadingOverlay active={loading} spinner>
            <BrowserRouter navigator={history}>
                <ScrollToTop />
                <div className="main-container">
                    <span className="content-container">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = LayoutDefault;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={`route-${index}`}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </span>

                    <ToastContainer />
                </div>
            </BrowserRouter>
        </LoadingOverlay>
    );
};

LoadingOverlay.propTypes = undefined;

export default App;
