import axios from '~/utils/axios';

export const postBookAppointmentService = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

export const verifyAppointmentService = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};

export const getPatientByDoctorAndDateService = (doctorId, date) => {
    return axios.get('/api/get-patient-by-doctor-and-date', {
        params: {
            doctorId,
            date,
        },
    });
};

export const getAppointmentByPatientService = (patientId) => {
    return axios.get('/api/get-appointment-by-patient', {
        params: {
            patientId,
        },
    });
};
