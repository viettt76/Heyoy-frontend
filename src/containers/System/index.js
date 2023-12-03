import { Routes, Route } from 'react-router-dom';
import { path } from '~/utils';
import ManageDoctor from './ManageDoctor';
import ManageSchedule from './ManageSchedule';
import ManageUser from './ManageUser';
import ManageSpecialty from './ManageSpecialty';
import ManageClinic from './ManageClinic';
import ManagePatient from './ManagePatient';

const System = () => {
    return (
        <div>
            <Routes>
                <Route path={path.SYSTEM_MANAGE_DOCTOR} element={<ManageDoctor />} />
                <Route path={path.SYSTEM_MANAGE_SCHEDULE} element={<ManageSchedule />} />
                <Route path={path.SYSTEM_MANAGE_USER} element={<ManageUser />} />
                <Route path={path.SYSTEM_MANAGE_SPECIALTY} element={<ManageSpecialty />} />
                <Route path={path.SYSTEM_MANAGE_CLINIC} element={<ManageClinic />} />
                <Route path={path.SYSTEM_MANAGE_PATIENT} element={<ManagePatient />} />
            </Routes>
        </div>
    );
};

export default System;
