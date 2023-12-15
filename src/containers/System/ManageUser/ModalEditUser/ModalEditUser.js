import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '~/store/actions';
import { LANGUAGES, convertBufferToString } from '~/utils';
import { convertBase64 } from '~/utils';
import { languageSelector } from '~/store/selectors';

function ModalEditUser({ isShowModalEditUser, currentUser, toggleModalEditUser, saveEditUser }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    const formRef = useRef(null);

    const adminRedux = useSelector((state) => {
        return state.admin;
    });

    useEffect(() => {
        dispatch(actions.getGenderUser());
        dispatch(actions.getRoleUser());
        dispatch(actions.getPositionUser());
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
        if (isShowModalEditUser) {
            let src = convertBufferToString(currentUser?.image);

            setEmail(currentUser.email);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setAddress(currentUser.address);
            setGender(currentUser.gender);
            setPosition(currentUser.positionId);
            setRole(currentUser.roleId);
            setPhoneNumber(currentUser.phoneNumber);
            setImage(src);
            setPreview(src);
        }
    }, [isShowModalEditUser, currentUser]);

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

    const handleSubmit = () => {
        try {
            const form = formRef.current;

            if (form.checkValidity() === true) {
                let dataUser = {
                    email,
                    firstName,
                    lastName,
                    address,
                    gender,
                    position,
                    role,
                    phoneNumber,
                    image,
                };
                saveEditUser(dataUser);
                toggleModalEditUser();
            } else {
                setValidated(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={isShowModalEditUser} onHide={toggleModalEditUser} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="system.manage-user.edit-info-user" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.email" />
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={email}
                                        type="text"
                                        placeholder="Email"
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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
                                    value={firstName}
                                    required
                                    type="text"
                                    placeholder="First name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.last-name" />
                                </Form.Label>
                                <Form.Control
                                    value={lastName}
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.gender" />
                                </Form.Label>

                                <Form.Select onChange={(e) => setGender(e.target.value)} value={gender}>
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

                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-user.role" />
                                </Form.Label>
                                <Form.Select onChange={(e) => setRole(e.target.value)} value={role}>
                                    {rolesFromApi?.length > 0 &&
                                        rolesFromApi.map((roleFromApi, index) => {
                                            return (
                                                <option key={`role-${index}`} value={roleFromApi.keyMap}>
                                                    {language === LANGUAGES.VI
                                                        ? roleFromApi.valueVi
                                                        : roleFromApi.valueEn}
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
                                    <Form.Select onChange={(e) => setPosition(e.target.value)} value={position}>
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
                                        type="file"
                                        onChange={(e) => handleChangeImage(e)}
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
                    <Button variant="secondary" onClick={toggleModalEditUser}>
                        <FormattedMessage id="popular.close" />
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        <FormattedMessage id="popular.save" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalEditUser.propTypes = {
    isShowModalEditUser: PropTypes.bool,
    currentUser: PropTypes.object.isRequired,
    toggleModalEditUser: PropTypes.func,
    saveEditUser: PropTypes.func,
};

export default ModalEditUser;
