import { useRef, useState } from 'react';
import { Container, Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MakeAnAppointment.module.scss';

const MakeAnAppointment = () => {
    const location = useLocation();
    const data = location.state;
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        const form = formRef.current;
        if (form.checkValidity() === true) {
            console.log({
                fullName,
                gender,
                phoneNumber,
                birthday,
                address,
                reason,
            });
        } else {
            setValidated(true);
        }
    };

    return (
        <Container className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['doctor-info'])}>
                <img width={100} height={100} src={data.image} alt={data.name} />
                <div>
                    <div>ĐẶT LỊCH KHÁM</div>
                    <span className={clsx(styles['doctor-name'])}>{data.name}</span>
                    <div>
                        <span>{data.time}</span>
                        <span className={clsx(styles['day'])}>{data.day}</span>
                    </div>
                </div>
            </div>
            <div className={clsx(styles['price'])}>Giá khám {data.price}</div>

            <Form ref={formRef} validated={validated}>
                <Row>
                    <Form.Group as={Col} md="12" className="mb-3 mt-3">
                        <Form.Label>Họ tên</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                value={fullName}
                                type="text"
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="mb-1" >
                        <Form.Label style={{ marginRight: '15px' }}>Giới tính</Form.Label>
                        <Form.Check
                            value="Nam"
                            onChange={(e) => setGender(e.target.value)}
                            inline
                            label="Nam"
                            name="group1"
                            type="radio"
                            required
                        />
                        <Form.Check
                            value="Nữ"
                            onChange={(e) => setGender(e.target.value)}
                            inline
                            label="Nữ"
                            name="group1"
                            type="radio"
                            required
                        />
                        <Form.Check
                            value="Khác"
                            onChange={(e) => setGender(e.target.value)}
                            inline
                            label="Khác"
                            name="group1"
                            type="radio"
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="12" className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                value={phoneNumber}
                                required
                                type="text"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="12">
                        <Form.Label>Ngày sinh</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                value={birthday}
                                required
                                type="text"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Địa chỉ</Form.Label>

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
                <Row>
                    <Form.Group as={Col} md="12">
                        <Form.Label>Lý do khám</Form.Label>

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
            <button type="submit" className={clsx(styles['btn-submit'])} onClick={handleSubmit}>
                Đặt lịch khám
            </button>
        </Container>
    );
};

export default MakeAnAppointment;
