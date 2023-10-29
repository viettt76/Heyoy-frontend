import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {
        email,
        password,
    });
};
