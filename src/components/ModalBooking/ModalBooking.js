import { useEffect, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styles from './ModalBooking.module.scss';
import { LANGUAGES, convertDateToTimestamp, path } from '~/utils';
import { getAllCodeService } from '~/services';
import { postBookAppointmentService } from '~/services';
import * as actions from '~/store/actions';

const ModalBooking = ({
    doctorId,
    doctorPosition,
    doctorName,
    time = {},
    date,
    price,
    show,
    handleCloseModalBooking,
}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const language = useSelector((state) => state.app.language);
    const userId = useSelector((state) => state.user.userInfo?.id);

    const [listGendersFromApi, setListGendersFromApi] = useState([]);
    const [listBookingForFromApi, setListBookingForFromApi] = useState([]);

    const [who, setWho] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [profession, setProfession] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const fetchGendersFromApi = async () => {
            let resGender = await getAllCodeService('gender');
            if (resGender?.data) {
                setListGendersFromApi(resGender.data);
            }
            let resBookingFor = await getAllCodeService('booking for');
            if (resBookingFor?.data) {
                setListBookingForFromApi(resBookingFor.data);
            }
        };

        fetchGendersFromApi();
    }, []);

    useEffect(() => {
        setWho(listBookingForFromApi[0]?.keyMap || '');
    }, [listBookingForFromApi, show]);

    const handleSubmit = async () => {
        dispatch(actions.appStartLoading());
        let birthdayTimestamp = convertDateToTimestamp(birthday);
        let res = await postBookAppointmentService({
            who,
            fullName,
            phoneNumber,
            gender,
            birthday: birthdayTimestamp,
            email,
            address,
            profession,
            reason,
            userId,
            doctorId,
            doctorName,
            time: time.timeType,
            date: +date,
            language,
        });
        dispatch(actions.appEndLoading());
        if (res?.errCode === 0) {
            handleCloseModalBooking();
            setWho(listBookingForFromApi[0]?.keyMap || '');
            setFullName('');
            setPhoneNumber('');
            setGender('');
            setBirthday('');
            setEmail('');
            setAddress('');
            setProfession('');
            setReason('');
            toast.success(language === LANGUAGES.VI ? ' Đặt lịch thành công' : 'Booking success');
        } else {
            toast.error(res?.message ? res?.message : language === LANGUAGES.EN ? 'Đặt lịch thất bại' : 'Booking fail');
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <Modal show={show} size="lg" onHide={handleCloseModalBooking}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className={clsx(styles['title-book'])}>
                                <FormattedMessage id="modal-booking.make-an-appointment" />
                            </div>
                            {doctorPosition && doctorName && (
                                <div className={clsx(styles['title-doctor-name'])}>
                                    {doctorPosition} {doctorName}
                                </div>
                            )}
                            {time && date && (
                                <div className={clsx(styles['title-time'])}>
                                    {language === LANGUAGES.VI
                                        ? time?.timeTypeData?.valueVi
                                        : time?.timeTypeData?.valueEn}{' '}
                                    -{' '}
                                    {language === LANGUAGES.VI
                                        ? new Date(+date).toLocaleDateString('vi-VN', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : new Date(+date).toLocaleDateString('en-ES', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })}
                                </div>
                            )}
                            {price && (
                                <div className={clsx(styles['title-price'])}>
                                    <FormattedMessage id="modal-booking.price" />: {price}
                                </div>
                            )}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div value={who} className="mb-2" onChange={(e) => setWho(e.target.value)}>
                                {listBookingForFromApi?.length > 0 &&
                                    listBookingForFromApi.map((booking, index) => {
                                        return (
                                            <Form.Check
                                                defaultChecked={index === 0}
                                                key={`booking-${index}`}
                                                inline
                                                label={language === LANGUAGES.VI ? booking.valueVi : booking.valueEn}
                                                name="group1"
                                                type="radio"
                                                value={booking.keyMap}
                                            />
                                        );
                                    })}
                            </div>
                            {who !== 'BF1' && (
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>
                                            <FormattedMessage id="modal-booking.full-name" />
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                autoFocus
                                                value={fullName}
                                                type="text"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>
                                            <FormattedMessage id="modal-booking.phone-number" />
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                value={phoneNumber}
                                                type="text"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                            )}
                            <Row className="mb-3">
                                {who !== 'BF1' && (
                                    <Form.Group
                                        value={gender}
                                        as={Col}
                                        md="6"
                                        className={clsx('mb-3', styles['gender'])}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        {listGendersFromApi?.length > 0 &&
                                            listGendersFromApi.map((gender, index) => {
                                                return (
                                                    <Form.Check
                                                        key={`gender-${index}`}
                                                        inline
                                                        label={
                                                            language === LANGUAGES.VI ? gender.valueVi : gender.valueEn
                                                        }
                                                        name="group2"
                                                        type="radio"
                                                        value={gender.keyMap}
                                                    />
                                                );
                                            })}
                                    </Form.Group>
                                )}
                                <Form.Group as={Col} md="6">
                                    <Form.Label>
                                        <FormattedMessage id="modal-booking.birthday" />
                                        &nbsp;
                                    </Form.Label>
                                    <DatePicker
                                        className={clsx('form-control', styles['date-picker'])}
                                        selected={birthday}
                                        showMonthDropdown
                                        showYearDropdown
                                        scrollableYearDropdown
                                        adjustDateOnChange
                                        yearDropdownItemNumber={100}
                                        maxDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        timeZone="GMT+0700"
                                        showIcon
                                        closeOnScroll={true}
                                        onChange={(date) => setBirthday(date)}
                                    />
                                </Form.Group>
                            </Row>
                            {who !== 'BF1' && (
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>
                                            <FormattedMessage id="modal-booking.email" />
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                value={email}
                                                required
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>
                                            <FormattedMessage id="modal-booking.address" />
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                value={address}
                                                required
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                            )}
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>
                                        <FormattedMessage id="modal-booking.profession" />
                                    </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            value={profession}
                                            required
                                            type="text"
                                            onChange={(e) => setProfession(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>
                                        <FormattedMessage id="modal-booking.reason-for-examination" />
                                    </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            value={reason}
                                            required
                                            type="text"
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalBooking}>
                            <FormattedMessage id="modal-booking.close" />
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>
                            <FormattedMessage id="modal-booking.save" />
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <Modal show={show} onHide={handleCloseModalBooking}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FormattedMessage id="modal-booking.need-login-to-booking" />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <FormattedMessage id="modal-booking.please-login" />{' '}
                            <Link className={clsx(styles['link-login'])} to={path.LOGIN}>
                                <FormattedMessage id="modal-booking.login" />
                            </Link>
                        </div>
                        <div>
                            <FormattedMessage id="modal-booking.not-account" />{' '}
                            <Link className={clsx(styles['link-register'])} to={path.REGISTER}>
                                <FormattedMessage id="modal-booking.register" />
                            </Link>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

ModalBooking.propTypes = {
    doctorId: oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
    doctorPosition: PropTypes.string,
    doctorName: PropTypes.string,
    time: oneOfType([PropTypes.string, PropTypes.object]),
    date: oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.string,
    show: PropTypes.bool,
    handleShowModalBooking: PropTypes.func,
    handleCloseModalBooking: PropTypes.func,
};

export default ModalBooking;
