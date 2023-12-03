import axios from '~/utils/axios';

export const createClinicService = (data) => {
    return axios.post('/api/create-clinic', data);
};

export const getQuantityClinicService = (quantity) => {
    return axios.get('/api/get-quantity-clinic', {
        params: {
            quantity,
        },
    });
};

export const getDetailClinicService = (id) => {
    return axios.get('/api/get-detail-clinic', {
        params: { id },
    });
};

