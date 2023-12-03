import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LANGUAGES } from '~/utils';
import * as actions from '~/store/actions';
import { convertBase64 } from '~/utils';
import { toast } from 'react-toastify';

function ModalAddNewUser({ isShowModalAddNewUser, toggleModalAddNewUser, handleAddNewUser }) {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const formRef = useRef(null);

    const language = useSelector((state) => state.app.language);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [fileImage, setFileImage] = useState('');

    const adminRedux = useSelector((state) => {
        return state.admin;
    });

    useEffect(() => {
        dispatch(actions.getGenderUser());
        dispatch(actions.getRoleUser());
        dispatch(actions.getPositionUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [gendersFromApi, setGendersFromApi] = useState(adminRedux.genders || []);
    const [rolesFromApi, setRolesFromApi] = useState(adminRedux.roles || []);
    const [positionsFromApi, setPositionsFromApi] = useState(adminRedux.positions || []);

    useEffect(() => {
        setGendersFromApi(adminRedux.genders);
        setRolesFromApi(adminRedux.roles);
        setPositionsFromApi(adminRedux.positions);
    }, [adminRedux]);

    useEffect(() => {
        setGender(gendersFromApi[0]?.keyMap);
        setRole(rolesFromApi[0]?.keyMap);
    }, [gendersFromApi, rolesFromApi]);

    useEffect(() => {
        if (isShowModalAddNewUser) {
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setAddress('');
            setGender(gendersFromApi[0]?.keyMap);
            setRole(rolesFromApi[0]?.keyMap);
            setPhoneNumber('');
            setPreview('');
        } else {
            setValidated(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowModalAddNewUser]);

    useEffect(() => {
        if (role === 'R2') {
            setPosition(positionsFromApi[0]?.keyMap);
        } else {
            setPosition('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const handleUploadImage = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (!image) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        const handleConvertBase64 = async () => {
            let result = await convertBase64(image);
            setFileImage(result);
        };
        handleConvertBase64();

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const handleSubmit = async () => {
        try {
            const form = formRef.current;
            
            if (form.checkValidity() === true) {
                let dataUser = {
                    email,
                    password,
                    firstName,
                    lastName,
                    address,
                    gender,
                    position,
                    role,
                    phoneNumber,
                    image: fileImage,
                };
                handleAddNewUser(dataUser);
            } else {
                if(!image) {
                    toast.error('Ảnh không hợp lệ')
                }
                setValidated(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={isShowModalAddNewUser} onHide={toggleModalAddNewUser} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="system.manage-user.add-user" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.email" />
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        autoFocus
                                        value={email}
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.password" />
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={password}
                                        type="password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.first-name" />
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={firstName}
                                        required
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.last-name" />
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={lastName}
                                        required
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.gender" />
                                </Form.Label>

                                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    {gendersFromApi?.length > 0 &&
                                        gendersFromApi.map((gender, index) => {
                                            return (
                                                <option key={`gender-${index}`} value={gender.keyMap}>
                                                    {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.role" />
                                </Form.Label>
                                <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                    {rolesFromApi?.length > 0 &&
                                        rolesFromApi.map((role, index) => {
                                            return (
                                                <option key={`role-${index}`} value={role.keyMap}>
                                                    {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>

                            {role === 'R2' && (
                                <Form.Group as={Col} md="4">
                                    <Form.Label>
                                        <FormattedMessage id="system.manage-user.position" />
                                    </Form.Label>
                                    <Form.Select value={position} onChange={(e) => setPosition(e.target.value)}>
                                        {positionsFromApi?.length > 0 &&
                                            positionsFromApi.map((position, index) => {
                                                return (
                                                    <option key={`position-${index}`} value={position.keyMap}>
                                                        {language === LANGUAGES.VI
                                                            ? position.valueVi
                                                            : position.valueEn}
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
                                    value={phoneNumber}
                                    required
                                    type="text"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.address" />
                                </Form.Label>
                                <Form.Control
                                    value={address}
                                    required
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.avatar" />
                                </Form.Label>
                                <div>
                                    <Form.Control
                                        hidden
                                        id="upImage"
                                        required
                                        type="file"
                                        onChange={(e) => handleUploadImage(e)}
                                    />
                                    <Form.Label className="btn btn-light" htmlFor="upImage">
                                        <FormattedMessage id="system.manage-user.upload-image" />{' '}
                                        <i className="fa-solid fa-upload"></i>
                                    </Form.Label>
                                    {preview && <img width={90} height={90} src={preview} alt="" />}
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModalAddNewUser}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        <FormattedMessage id="system.manage-user.add" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalAddNewUser.propTypes = {
    isShowModalAddNewUser: PropTypes.bool,
    toggleModalAddNewUser: PropTypes.func,
    handleAddNewUser: PropTypes.func,
};

export default ModalAddNewUser;
