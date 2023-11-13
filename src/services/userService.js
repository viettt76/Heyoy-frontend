import axios from '~/utils/axios';

export const handleLoginService = (email, password) => {
    return axios.post('/api/login', {
        email,
        password,
    });
};

export const getUserService = (id) => {
    return axios.get('/api/get-user', {
        params: { id },
    });
};

export const createUserService = (data) => {
    return axios.post('/api/create-user', data);
};

export const updateUserService = (data) => {
    return axios.put('/api/update-user', data);
};

export const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        params: {
            id,
        },
    });
};

export const getAllCodeService = (type) => {
    return axios.get('/api/get-all-code', {
        params: { type },
    });
};
