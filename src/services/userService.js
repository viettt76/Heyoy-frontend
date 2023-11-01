import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {
        email,
        password,
    });
};

export const getUserApi = (id) => {
    return axios.get('/api/get-user', {
        params: { id },
    });
};

export const createUserApi = (data) => {
    return axios.post('/api/create-user', data);
};
