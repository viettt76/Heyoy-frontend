import axios from '~/utils/axios';

export const getQuantityDoctorService = (limit) => {
    return axios.get('/api/get-quantity-doctor', {
        params: {
            limit,
        },
    });
};

export const getDoctorBySpecialtyAndProvinceService = (specialty, province) => {
    return axios.get('/api/get-doctor-by-specialty-and-province', {
        params: {
            specialty,
            province,
        },
    });
};

export const getDoctorByClinicService = (id) => {
    return axios.get('/api/get-doctor-by-clinic', {
        params: {
            id,
        },
    });
};

export const createDetailDoctorService = (data) => {
    return axios.post('/api/create-detail-doctor', data);
};

export const getDetailDoctorService = (id) => {
    return axios.get('/api/get-detail-doctor', {
        params: { id },
    });
};

export const createExaminationScheduleService = (data) => {
    return axios.post('/api/create-examination-schedule', data);
};

export const getExaminationScheduleService = (doctorId, date) => {
    return axios.get('/api/get-examination-schedule', {
        params: {
            doctorId,
            date,
        },
    });
};


export const sendInvoiceRemedyService = (data) => {
    return axios.post('/api/send-invoice-remedy', data);
};