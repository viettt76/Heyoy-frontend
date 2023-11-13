import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { LANGUAGES } from '~/utils';
import * as actions from '~/store/actions';

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

        setGender(gendersFromApi[0]?.key);
        setPosition(positionsFromApi[0]?.key);
        setRole(rolesFromApi[0]?.key);
    }, [adminRedux]);

    // const handleAddNewAdmin = async () => {
    //     const isFormValid = formRef.current.checkValidity();
    //     console.log(isFormValid);
    //     if (isFormValid) {
    //         console.log({
    //             email,
    //             password,
    //             firstName,
    //             lastName,
    //             gender,
    //             position,
    //             role,
    //             phoneNumber,
    //             address,
    //             // image,
    //         });
    //         let res = await createUserService({
    //             email,
    //             password,
    //             firstName,
    //             lastName,
    //             gender,
    //             position,
    //             role,
    //             phoneNumber,
    //             address,
    //             // image,
    //         });
    //         console.log(res);
    //     } else {
    //         setValidated(true);
    //     }
    // };

    useEffect(() => {
        if (isShowModalAddNewUser) {
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setAddress('');
            setGender('');
            setPosition('');
            setRole('');
            setPhoneNumber('');
        } else {
            setValidated(false);
        }
    }, [isShowModalAddNewUser]);

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
                };
                handleAddNewUser(dataUser);
            } else {
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
                    <Modal.Title>Add a new user</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>
                    <Form ref={formRef} validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        autoFocus
                                        value={email}
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        value={password}
                                        type="password"
                                        placeholder="Password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
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
                            <Form.Group as={Col} md="12">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    value={address}
                                    required
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body> */}
                <Modal.Body>
                    <Form ref={formRef} validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>
                                    <FormattedMessage id="system.manage-admin.email" />
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
                                    <FormattedMessage id="system.manage-admin.password" />
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
                                    <FormattedMessage id="system.manage-admin.first-name" />
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
                                    <FormattedMessage id="system.manage-admin.last-name" />
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
                                    <FormattedMessage id="system.manage-admin.gender" />
                                </Form.Label>

                                <Form.Select onChange={(e) => setGender(e.target.value)}>
                                    {gendersFromApi?.length > 0 &&
                                        gendersFromApi.map((gender, index) => {
                                            return (
                                                <option key={`gender-${index}`} value={gender.key}>
                                                    {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
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
                    <Button variant="secondary" onClick={toggleModalAddNewUser}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        <FormattedMessage id="system.manage-admin.add" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;
