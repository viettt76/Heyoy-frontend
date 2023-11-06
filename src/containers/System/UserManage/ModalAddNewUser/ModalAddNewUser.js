import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';

function ModalAddNewUser({ isShowModalAddNewUser, toggleModalAddNewUser, handleAddNewUser }) {
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        if (isShowModalAddNewUser) {
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setAddress('');
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
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModalAddNewUser}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;
