import { Routes, Route } from 'react-router-dom'
import ManageAdmin from '~/containers/System/ManageAdmin'

const System = () => {
    return <div>
        <Routes>
            <Route path='/system/manage-admin' element={<ManageAdmin />} />
        </Routes>
    </div>
}

export default System