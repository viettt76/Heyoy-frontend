import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';

function ModalEditUser({ isShowModalEditUser, currentUser, toggleModalEditUser, saveEditUser }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const language = useSelector((state) => state.app.language);


    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
            setEmail(currentUser.email);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setAddress(currentUser.address);
            setGender(currentUser.gender);
            setPosition(currentUser.position);
            setRole(currentUser.role);
            setPhoneNumber(currentUser.phoneNumber);
        }
    }, [isShowModalEditUser, currentUser]);

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
                };
                saveEditUser(dataUser);
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
                    <Modal.Title>Edit user's email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={email}
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>First name</Form.Label>
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
                                <Form.Label>Last name</Form.Label>
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
                                    <FormattedMessage id="system.manage-admin.gender" />
                                </Form.Label>

                                <Form.Select onChange={(e) => setGender(e.target.value)}>
                                    {gendersFromApi?.length > 0 &&
                                        gendersFromApi.map((gendersFromApi, index) => {
                                            return (
                                                <option key={`gender-${index}`} value={gendersFromApi.key}>
                                                    {language === LANGUAGES.VI ? gendersFromApi.valueVi : gendersFromApi.valueEn}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-admin.position" />
                                </Form.Label>
                                <Form.Select onChange={(e) => setPosition(e.target.value)}>
                                    {positionsFromApi?.length > 0 &&
                                        positionsFromApi.map((position, index) => {
                                            return (
                                                <option key={`position-${index}`} value={position.key}>
                                                    {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-admin.role" />
                                </Form.Label>
                                <Form.Select onChange={(e) => setRole(e.target.value)}>
                                    {rolesFromApi?.length > 0 &&
                                        rolesFromApi.map((role, index) => {
                                            return (
                                                <option key={`role-${index}`} value={role.key}>
                                                    {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-admin.phone-number" />
                                </Form.Label>
                                <Form.Control
                                    value={phoneNumber}
                                    required
                                    type="text"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-admin.address" />
                                </Form.Label>
                                <Form.Control
                                    value={address}
                                    required
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModalEditUser}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
