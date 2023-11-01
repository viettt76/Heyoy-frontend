import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal as ModalBootstrap, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { createUserApi } from '../../services/userService';

function Modal({ isShowModal, toggleModal }) {
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        if (!isShowModal) {
            setValidated(false);
        }
    }, [isShowModal]);

    const handleSubmit = async () => {
        const form = formRef.current;
        if (form.checkValidity() === true) {
            let dataUser = {
                email,
                password,
                firstName,
                lastName,
                address,
            };
            let res = await createUserApi(dataUser);
            if (res?.errCode === 0) {
                toggleModal();
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setAddress('');
            } else {
                alert(res?.message);
            }
        } else {
            setValidated(true);
        }
    };
    console.log(validated);
    return (
        <>
            <ModalBootstrap show={isShowModal} onHide={toggleModal} size="lg">
                <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>Add a new user</ModalBootstrap.Title>
                </ModalBootstrap.Header>
                <ModalBootstrap.Body>
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
                                        type="text"
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
                </ModalBootstrap.Body>
                <ModalBootstrap.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Add
                    </Button>
                </ModalBootstrap.Footer>
            </ModalBootstrap>
        </>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
