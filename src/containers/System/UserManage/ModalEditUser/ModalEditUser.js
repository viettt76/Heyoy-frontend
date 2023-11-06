import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Col, Form, InputGroup, Row } from 'react-bootstrap';

function ModalEditUser({ isShowModalEditUser, currentUser, toggleModalEditUser, saveEditUser }) {
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        if (isShowModalEditUser) {
            setEmail(currentUser.email);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setAddress(currentUser.address);
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
