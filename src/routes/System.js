import { Navigate, Route, Routes } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

const System = () => {
    // const systemMenuPath = (state) => state.app.systemMenuPath;
    // const SystemMenuPathElement = () => {
    //     return <Navigate to={systemMenuPath} />;
    // }

    return (
        <div className="system-container">
            <div className="system-list">
                <Routes>
                    <Route path="/system/user-manage" element={<UserManage />} />
                    <Route path="/system/product-manage" element={<ProductManage />} />
                    {/* <Route path="/system/register-package-group-or-account" element={<RegisterPackageGroupOrAcc />} />
                    <Route
                        element={<SystemMenuPathElement />}
                    /> */}
                </Routes>
            </div>
        </div>
    );
};

export default System;
