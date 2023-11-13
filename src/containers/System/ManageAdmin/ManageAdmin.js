import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Form, InputGroup, Row, Container } from 'react-bootstrap';
import SystemHeader from '../SystemHeader';
import { LANGUAGES } from '~/utils';
import * as actions from '~/store/actions';
import { createUserService } from '~/services';

const ManageAdmin = () => {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const formRef = useRef(null);

    const language = useSelector((state) => state.app.language);

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    // const validatedEmail = () => {
    //     if(email && email.match(isValidEmail)) {
    //         return false
    //     }
    //     return true
    // }

    const handleAddNewAdmin = async () => {
        const isFormValid = formRef.current.checkValidity();
        console.log(isFormValid);
        if (isFormValid) {
            console.log({
                email,
                password,
                firstName,
                lastName,
                gender,
                position,
                role,
                phoneNumber,
                address,
                // image,
            });
            let res = await createUserService({
                email,
                password,
                firstName,
                lastName,
                gender,
                position,
                role,
                phoneNumber,
                address,
                // image,
            });
            console.log(res);
        } else {
            setValidated(true);
        }
    };

    return (
        <>
            <SystemHeader />
            <Container className={clsx('mt-3')}>
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
                        <Form.Group as={Col} md="5">
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
                        <Form.Group as={Col} md="5">
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
                        {/* <Form.Group as={Col} md="2">
                            <Form.Label>
                                <FormattedMessage id="system.manage-admin.avatar" />
                            </Form.Label>
                            <div>
                                <Form.Control
                                    hidden
                                    id="upImage"
                                    required
                                    type="file"
                                    onChange={(e) => handleUploadImage(e)}
                                />
                                <Form.Label className={clsx('btn btn-light')} htmlFor="upImage">
                                    <FormattedMessage id="system.manage-admin.upload-image" />{' '}
                                    <i className="fa-solid fa-upload"></i>
                                </Form.Label>
                                {preview && <img width={90} height={90} src={preview} alt="" />}
                            </div>
                        </Form.Group> */}
                    </Row>
                </Form>
                <Button type="submit" onClick={handleAddNewAdmin}>
                    <FormattedMessage id="system.manage-admin.add" />
                </Button>
            </Container>
        </>
    );
};

export default ManageAdmin;
