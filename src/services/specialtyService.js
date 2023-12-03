import axios from '~/utils/axios';

export const createSpecialtyService = (data) => {
    return axios.post('/api/create-specialty', data);
};

export const getQuantitySpecialtyService = (quantity) => {
    return axios.get('/api/get-quantity-specialty', {
        params: { quantity },
    });
};

export const getDetailSpecialtyService = (id) => {
    return axios.get('/api/get-detail-specialty', {
        params: { id },
    });
};
