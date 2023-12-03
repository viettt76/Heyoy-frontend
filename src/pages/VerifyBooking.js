import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyAppointmentService } from '~/services';

const VerifyBooking = () => {
    let location = useLocation();
    const params = new URLSearchParams(location?.search);
    let paramObj = {};
    for (let value of params.keys()) {
        paramObj[value] = params.get(value);
    }

    const [message, setMessage] = useState('');

    useEffect(() => {
        let postVerifyAppointment = async () => {
            let res = await verifyAppointmentService({
                token: paramObj.token,
                doctorId: paramObj.doctorId,
                patientId: paramObj.patientId,
            });
            if (res?.errCode === 0) {
                setMessage(res?.message);
            } else {
                setMessage(res?.message);
            }
        };
        postVerifyAppointment();
    }, []);

    return (
        <div
            style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'red',
                textAlign: 'center',
                marginTop: '50px',
                textTransform: 'uppercase',
            }}
        >
            {message}!
        </div>
    );
};

export default VerifyBooking;
