import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import styles from './PersonalInfo.module.scss';
import { getUserService, updateUserService } from '~/services';
import { languageSelector, userInfoSelector } from '~/store/selectors';
import { LANGUAGES, convertBase64, convertBufferToString, convertDateToTimestamp } from '~/utils';
import * as actions from '~/store/actions';

const PersonalInfo = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector(userInfoSelector);
    const language = useSelector(languageSelector);
    const userInfoTemporary = useSelector((state) => state.user.temporaryDetails);

    const [userInfoFromApi, setUserInfoFromApi] = useState({});

    const adminRedux = useSelector((state) => {
        return state.admin;
    });

    const [disable, setDisable] = useState(true);

    const formRef = useRef();
    const [formValidated, setFormValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [position, setPosition] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    const [gendersFromApi, setGendersFromApi] = useState(adminRedux.genders || []);
    const [positionsFromApi, setPositionsFromApi] = useState(adminRedux.positions || []);

    useEffect(() => {
        dispatch(actions.getGenderUser());
        dispatch(actions.getRoleUser());
        dispatch(actions.getPositionUser());
    }, [dispatch]);

    useEffect(() => {
        setGendersFromApi(adminRedux.genders);
        setPositionsFromApi(adminRedux.positions);
    }, [adminRedux]);

    useEffect(() => {
        let fetchInfoUser = async () => {
            let res = await getUserService(userInfo?.id);
            if (res?.listUsers) {
                let dataUser = res.listUsers;
                dataUser = {
                    ...dataUser,
                    birthday: new Date(dataUser?.birthday),
                };
                setUserInfoFromApi(dataUser);
            }
        };
        fetchInfoUser();
    }, [userInfo]);

    useEffect(() => {
        setEmail(userInfoFromApi?.email);
        setFirstName(userInfoFromApi?.firstName);
        setLastName(userInfoFromApi?.lastName);
        setAddress(userInfoFromApi?.address);
        setGender(userInfoFromApi?.gender);
        setBirthday(userInfoFromApi?.birthday != 'Invalid Date' && userInfoFromApi.birthday);
        setPosition(userInfoFromApi?.positionId);
        setRole(userInfoFromApi?.roleId);
        setPhoneNumber(userInfoFromApi?.phoneNumber);
        setImage(userInfoFromApi?.image);
        setPreview(convertBufferToString(userInfoFromApi?.image || ''));
    }, [userInfoFromApi]);

    const handleChangeInfo = () => {
        dispatch(
            actions.getInfoTemporary({
                firstName,
                lastName,
                address,
                gender,
                birthday,
                position,
                phoneNumber,
                image,
            }),
        );
        setDisable(false);
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const handleConvertBase64 = async () => {
                let result = await convertBase64(file);
                setImage(result);
            };
            handleConvertBase64();

            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else {
            setPreview(null);
        }
    };

    const handleSave = async () => {
        try {
            if (formRef.current.checkValidity()) {
                let birthdayTimestamp = convertDateToTimestamp(birthday);
                let res = await updateUserService({
                    email,
                    firstName,
                    lastName,
                    address,
                    gender,
                    birthday: birthdayTimestamp,
                    position,
                    phoneNumber,
                    image,
                });
                if (res?.errCode === 0) {
                    toast.success(
                        language === LANGUAGES.VI
                            ? 'Cập nhật thông tin thành công'
                            : 'Update your information successfully',
                    );
                } else {
                    toast.error(
                        res?.message
                            ? res.message
                            : language === LANGUAGES.VI
                            ? 'Cập nhật thông tin thành công'
                            : 'Update your information successfully',
                    );
                }
                setDisable(true);
            } else {
                setFormValidated(true);
            }
        } catch (error) {
            console.log('Error personal info,', error);
        }
    };

    const handleCancel = () => {
        setFirstName(userInfoTemporary?.firstName);
        setLastName(userInfoTemporary?.lastName);
        setAddress(userInfoTemporary?.address);
        setGender(userInfoTemporary?.gender);
        setBirthday(userInfoTemporary?.birthday);
        setPosition(userInfoTemporary?.positionId);
        setPhoneNumber(userInfoTemporary?.phoneNumber);
        setImage(userInfoTemporary?.image);
        setPreview(convertBufferToString(userInfoTemporary?.image || ''));
        setDisable(true);
    };

    return (
        <div className="container mt-3">
            <Form ref={formRef} validated={formValidated}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.email" />
                        </Form.Label>
                        <InputGroup>
                            <Form.Control value={email || ''} type="email" placeholder="Email" disabled />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.first-name" />
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            value={firstName || ''}
                            required
                            type="text"
                            placeholder="First name"
                            disabled={disable}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="mt-md-0 mt-3">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.last-name" />
                        </Form.Label>
                        <Form.Control
                            value={lastName || ''}
                            required
                            type="text"
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={disable}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.gender" />
                        </Form.Label>

                        <Form.Select
                            onChange={(e) => setGender(e.target.value)}
                            value={gender || ''}
                            disabled={disable}
                        >
                            {gendersFromApi?.length > 0 &&
                                gendersFromApi.map((gendersFromApi, index) => {
                                    return (
                                        <option key={`gender-${index}`} value={gendersFromApi.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? gendersFromApi.valueVi
                                                : gendersFromApi.valueEn}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="mt-3 mt-md-0">
                        <Form.Label className="d-block">
                            <FormattedMessage id="modal-booking.birthday" />
                        </Form.Label>
                        {birthday && (
                            <DatePicker
                                className={clsx('form-control')}
                                selected={birthday}
                                showMonthDropdown
                                showYearDropdown
                                scrollableYearDropdown
                                adjustDateOnChange
                                yearDropdownItemNumber={100}
                                maxDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                timeZone="GMT+0700"
                                disabled={disable}
                                showIcon
                                closeOnScroll={true}
                                required
                                onChange={(date) => setBirthday(date)}
                            />
                        )}
                    </Form.Group>

                    {role === 'R2' && (
                        <Form.Group as={Col} md="5">
                            <Form.Label>
                                <FormattedMessage id="system.manage-user.position" />
                            </Form.Label>
                            <Form.Select
                                onChange={(e) => setPosition(e.target.value)}
                                disabled={disable}
                                value={position || ''}
                            >
                                {positionsFromApi?.length > 0 &&
                                    positionsFromApi.map((positionFromApi, index) => {
                                        return (
                                            <option key={`position-${index}`} value={positionFromApi.keyMap}>
                                                {language === LANGUAGES.VI
                                                    ? positionFromApi.valueVi
                                                    : positionFromApi.valueEn}
                                            </option>
                                        );
                                    })}
                            </Form.Select>
                        </Form.Group>
                    )}
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.phone-number" />
                        </Form.Label>
                        <Form.Control
                            value={phoneNumber || ''}
                            required
                            type="text"
                            disabled={disable}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="5" className="mt-md-0 mt-3">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.address" />
                        </Form.Label>
                        <Form.Control
                            value={address || ''}
                            required
                            type="text"
                            disabled={disable}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" className=" mt-3 mt-md-0">
                        <Form.Label>
                            <FormattedMessage id="system.manage-user.avatar" />
                        </Form.Label>
                        <div>
                            <Form.Control
                                hidden
                                id="upImage"
                                type="file"
                                disabled={disable}
                                onChange={(e) => handleChangeImage(e)}
                            />
                            <Form.Label
                                className={clsx('btn btn-light', {
                                    [styles['btn-disable']]: disable,
                                })}
                                htmlFor="upImage"
                            >
                                <FormattedMessage id="system.manage-user.upload-image" />{' '}
                                <i className="fa-solid fa-upload"></i>
                            </Form.Label>

                            {preview && <img width={90} height={90} src={preview} alt="" />}
                        </div>
                    </Form.Group>
                </Row>
            </Form>
            <div className={clsx('mt-3 mb-3')}>
                {disable ? (
                    <button className={clsx('btn btn-primary')} onClick={handleChangeInfo}>
                        <FormattedMessage id="change-information.change-information" />
                    </button>
                ) : (
                    <div>
                        <button className={clsx('btn btn-success')} onClick={handleSave}>
                            <FormattedMessage id="popular.save" />
                        </button>
                        <button className={clsx('btn btn-danger', styles['btn-cancel'])} onClick={handleCancel}>
                            <FormattedMessage id="popular.cancel" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;
