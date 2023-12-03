import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalLoginRequired = () => {
    const [show, setShow] = useState(false);
    const handleShowModal = () => {
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
    };

    return (
        <>
            <div onClick={handleShowModal}>Click</div>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>

                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalLoginRequired;
