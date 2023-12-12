import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import styles from './ManagePatient.module.scss';
import { getPatientByDoctorAndDateService, sendInvoiceRemedyService } from '~/services';
import { LANGUAGES, convertDateToTimestamp } from '~/utils';
import ModalInvoiceRemedy from './ModalInvoiceRemedy';
import * as actions from '~/store/actions';
import { languageSelector, userInfoSelector } from '~/store/selectors';

const ManageSchedule = () => {
    const dispatch = useDispatch();

    const language = useSelector(languageSelector);
    const userInfo = useSelector(userInfoSelector);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [listPatients, setListPatients] = useState([]);

    const [patientEmail, setPatientEmail] = useState('');
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [timeType, setTimeType] = useState('');

    const [showModalInvoiceRemedy, setShowModalInvoiceRemedy] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleCloseModalInvoiceRemedy = () => setShowModalInvoiceRemedy(false);
    const handleShowModalInvoiceRemedy = () => setShowModalInvoiceRemedy(true);

    let fetchPatientByDoctorAndDate = async () => {
        let timestamp = convertDateToTimestamp(currentDate);
        let res = await getPatientByDoctorAndDateService(userInfo?.id, timestamp);
        if (res?.data) {
            setListPatients(res.data);
        } else {
            setListPatients([]);
        }
    };

    useEffect(() => {
        fetchPatientByDoctorAndDate();
    }, [currentDate, userInfo]);

    const handleConfirm = (patient) => {
        let timestamp = convertDateToTimestamp(currentDate);
        setPatientEmail(patient?.Patient_Info?.User?.email);
        setPatientFirstName(patient?.Patient_Info?.User?.firstName);
        setPatientLastName(patient?.Patient_Info?.User?.lastName);
        setDate(timestamp);
        setDoctorId(userInfo?.id);
        setPatientId(patient?.patientId);
        setTimeType(patient?.timeType);

        handleShowModalInvoiceRemedy();
    };

    const sendInvoiceRemedy = async () => {
        dispatch(actions.appStartLoading());
        let res = await sendInvoiceRemedyService({
            date,
            doctorId,
            patientId,
            patientEmail,
            patientFirstName,
            patientLastName,
            timeType,
            language,
            image,
        });

        dispatch(actions.appEndLoading());
        if (res?.errCode === 0) {
            setImage('');
            setPreviewImage('');
            handleCloseModalInvoiceRemedy();
            fetchPatientByDoctorAndDate();
            toast.success(
                language === LANGUAGES.VI
                    ? 'Gửi hoá đơn/đơn thuốc thành công!'
                    : 'Invoice/prescription sent successfully!',
            );
        } else {
            handleCloseModalInvoiceRemedy();
            toast.error(
                res?.message
                    ? res.message
                    : language === LANGUAGES.VI
                    ? 'Gửi hoá đơn/đơn thuốc thất bại!'
                    : 'Invoice/prescription sending failed!',
            );
        }
    };

    return (
        <Container>
            <h5 className={clsx(styles['title'])}>
                <FormattedMessage id="system.manage-patient.doctor's-patient-management" />
            </h5>
            <div className={clsx('row', 'mt-3')}>
                <div className={clsx('col-4')}>
                    <label style={{ display: 'block' }}>
                        <FormattedMessage id="system.manage-schedule.choose-day" />
                    </label>
                    <DatePicker
                        className={clsx('form-control', styles['date-picker'])}
                        value={currentDate}
                        showIcon
                        closeOnScroll={true}
                        selected={currentDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setCurrentDate(date)}
                    />
                </div>
            </div>
            <div>
                <table className={clsx(styles['table'], 'mt-3')}>
                    <thead>
                        <tr>
                            <th>
                                <FormattedMessage id="system.manage-patient.ordinals" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.time" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.full-name" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.gender" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.birthday" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.address" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.reason" />
                            </th>
                            <th>
                                <FormattedMessage id="system.manage-patient.actions" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPatients?.length > 0 &&
                            listPatients.map((patient, index) => {
                                let date = patient?.Patient_Info?.birthday;
                                let day = new Date(date).getDate();
                                let month = new Date(date).getMonth() + 1;
                                let year = new Date(date).getFullYear();
                                let birthday = `${day}/${month}/${year}`;
                                return (
                                    <tr key={`patient-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {language === LANGUAGES.VI
                                                ? patient?.timeTypeBookingData?.valueVi
                                                : patient?.timeTypeBookingData?.valueEn}
                                        </td>
                                        <td>
                                            {language === LANGUAGES.VI
                                                ? `${patient?.Patient_Info?.User?.lastName} ${patient?.Patient_Info?.User?.firstName}`
                                                : `${patient?.Patient_Info?.User?.firstName} ${patient?.Patient_Info?.User?.lastName}`}
                                        </td>
                                        <td>
                                            {language === LANGUAGES.VI
                                                ? patient?.Patient_Info?.User?.genderData?.valueVi
                                                : patient?.Patient_Info?.User?.genderData?.valueEn}
                                        </td>
                                        <td>{birthday}</td>
                                        <td>{patient?.Patient_Info?.User?.address}</td>
                                        <td>{patient?.reason}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleConfirm(patient)}>
                                                <FormattedMessage id="system.manage-patient.confirm" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <ModalInvoiceRemedy
                show={showModalInvoiceRemedy}
                previewImage={previewImage}
                patientEmail={patientEmail}
                setPatientEmail={setPatientEmail}
                setImage={setImage}
                setPreviewImage={setPreviewImage}
                sendInvoiceRemedy={sendInvoiceRemedy}
                handleClose={handleCloseModalInvoiceRemedy}
            />
        </Container>
    );
};

export default ManageSchedule;
