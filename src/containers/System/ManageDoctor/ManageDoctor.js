import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import styles from './ManageDoctor.module.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { getAllCodeService, getQuantityClinicService, getQuantityDoctorService } from '~/services';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '~/utils';
import { createDetailDoctorService, getDetailDoctorService, getQuantitySpecialtyService } from '~/services';
import { languageSelector } from '~/store/selectors';

const mdParser = new MarkdownIt();

const ManageDoctor = () => {
    const language = useSelector(languageSelector);

    const [listDoctorsFromApi, setListDoctorsFromApi] = useState([]);
    const [listPriceFromApi, setListPriceFromApi] = useState([]);
    const [listPaymentFromApi, setListPaymentFromApi] = useState([]);
    const [listProvinceFromApi, setListProvinceFromApi] = useState([]);
    const [listSpecialtyFromApi, setListSpecialtyFromApi] = useState([]);
    const [listClinicFromApi, setListClinicFromApi] = useState([]);

    const [doctor, setDoctor] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState({});
    const [payment, setPayment] = useState({});
    const [province, setProvince] = useState({});
    const [clinic, setClinic] = useState({});
    const [note, setNote] = useState('');
    const [specialty, setSpecialty] = useState({});

    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [detailDoctor, setDetailDoctor] = useState({});

    const buildDataInputSelect = useMemo(() => {
        return (data, type) => {
            let result = data.map((item) => {
                if (type === 'doctor') {
                    let object = {
                        valueEn: `${item.firstName} ${item.lastName}`,
                        valueVi: `${item.lastName} ${item.firstName}`,
                    };

                    return {
                        label: `${item.id} - ${language === LANGUAGES.VI ? object.valueVi : object.valueEn}`,
                        value: item.id,
                    };
                } else if (type === 'price') {
                    let object = {
                        valueEn: `${item.valueEn} $`,
                        valueVi: `${item.valueVi} VND`,
                    };
                    return {
                        label: language === LANGUAGES.VI ? object.valueVi : object.valueEn,
                        value: item.keyMap,
                    };
                } else {
                    let object = {
                        valueEn: item.valueEn,
                        valueVi: item.valueVi,
                    };

                    return {
                        label: language === LANGUAGES.VI ? object.valueVi : object.valueEn,
                        value: item.keyMap,
                    };
                }
            });
            return result;
        };
    }, [language]);

    useEffect(() => {
        const fetchAllDoctors = async () => {
            let res = await getQuantityDoctorService('all');
            if (res?.data?.length > 0) {
                let result = buildDataInputSelect(res.data, 'doctor');
                setListDoctorsFromApi(result);
            } else {
                setListDoctorsFromApi([]);
            }
        };
        fetchAllDoctors();
    }, [language, buildDataInputSelect]);

    // Set the existing value
    useEffect(() => {
        const fetchDetailDoctor = async () => {
            let res = await getDetailDoctorService(doctor?.value);
            if (res?.data) {
                setDetailDoctor(res.data);
                if (res?.data?.Doctor_Info) {
                    let doctorInfoFromApi = res.data.Doctor_Info;

                    let findValueInList = (value, listValue) => {
                        let result = listValue.find((item) => {
                            return item?.value == value;
                        });
                        return result;
                    };

                    if (doctorInfoFromApi?.priceId) {
                        setPrice(() => {
                            return findValueInList(doctorInfoFromApi.priceId, listPriceFromApi);
                        });
                    } else {
                        setPrice('');
                    }

                    if (doctorInfoFromApi?.paymentId) {
                        setPayment(() => {
                            return findValueInList(doctorInfoFromApi.paymentId, listPaymentFromApi);
                        });
                    } else {
                        setPayment('');
                    }

                    if (doctorInfoFromApi?.provinceId) {
                        setProvince(() => {
                            return findValueInList(doctorInfoFromApi.provinceId, listProvinceFromApi);
                        });
                    } else {
                        setProvince('');
                    }

                    if (doctorInfoFromApi?.clinicId) {
                        setClinic(() => {
                            return findValueInList(doctorInfoFromApi.clinicId, listClinicFromApi);
                        });
                    } else {
                        setClinic('');
                    }

                    if (doctorInfoFromApi?.specialtyId) {
                        setSpecialty(() => {
                            return findValueInList(doctorInfoFromApi.specialtyId, listSpecialtyFromApi);
                        });
                    } else {
                        setSpecialty('');
                    }

                    if (doctorInfoFromApi?.note) {
                        setNote(doctorInfoFromApi.note);
                    } else {
                        setNote('');
                    }
                } else {
                    setPrice('');
                    setPayment('');
                    setProvince('');
                    setClinic('');
                    setNote('');
                    setSpecialty('');
                }
            }
        };
        fetchDetailDoctor();
    }, [doctor, listClinicFromApi, listPaymentFromApi, listPriceFromApi, listProvinceFromApi, listSpecialtyFromApi]);

    useEffect(() => {
        if (detailDoctor?.Markdown?.description) {
            setDescription(detailDoctor?.Markdown?.description);
        } else {
            setDescription('');
        }
        if (detailDoctor?.Markdown?.contentHTML) {
            setContentHTML(detailDoctor?.Markdown?.contentHTML);
        } else {
            setContentHTML('');
        }
        if (detailDoctor?.Markdown?.contentMarkdown) {
            setContentMarkdown(detailDoctor?.Markdown?.contentMarkdown);
        } else {
            setContentMarkdown('');
        }
    }, [detailDoctor]);

    // Get list price, payment, province from API
    useEffect(() => {
        const fetchDataFromApi = async () => {
            let resPrice = await getAllCodeService('price');
            let resPayment = await getAllCodeService('payment');
            let resProvince = await getAllCodeService('province');
            if (resPrice?.data) {
                let result = buildDataInputSelect(resPrice.data, 'price');
                setListPriceFromApi(result);
            }
            if (resPayment?.data) {
                let result = buildDataInputSelect(resPayment.data);
                setListPaymentFromApi(result);
            }
            if (resProvince?.data) {
                let result = buildDataInputSelect(resProvince.data);
                setListProvinceFromApi(result);
            }
        };
        fetchDataFromApi();
    }, [language, buildDataInputSelect]);

    // Get list specialty, clinic from API
    useEffect(() => {
        let fetchDataFromApi = async () => {
            let resSpecialty = await getQuantitySpecialtyService('all');
            if (resSpecialty?.data) {
                setListSpecialtyFromApi(
                    resSpecialty.data.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        };
                    }),
                );
            }
            let resClinic = await getQuantityClinicService('all');
            if (resClinic?.data) {
                setListClinicFromApi(
                    resClinic.data.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        };
                    }),
                );
            }
        };
        fetchDataFromApi();
    }, []);

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    };

    const handleSave = async () => {
        let doctorId = doctor?.value;

        let res = await createDetailDoctorService({
            doctorId,
            description,
            contentMarkdown,
            contentHTML,
            priceId: price?.value,
            paymentId: payment?.value,
            provinceId: province?.value,
            clinicId: clinic?.value,
            note,
            specialtyId: specialty?.value,
        });

        if (res?.errCode === 0) {
            toast.success(
                language === LANGUAGES.VI
                    ? `Tạo thông tin chi tiết về bác sĩ ${doctor?.label} thành công`
                    : `Create description of doctor ${doctor?.label} successfully`,
            );
        } else {
            toast.error(
                res?.message
                    ? res?.message
                    : language === LANGUAGES.VI
                    ? `Tạo thông tin chi tiết về bác sĩ ${doctor?.label} thất bại`
                    : `Create description of doctor ${doctor?.label} failed`,
            );
        }
    };

    return (
        <>
            <div className={clsx(styles['wrapper'])}>
                <div className={clsx(styles['heading'])}>
                    <FormattedMessage id="system.manage-doctor.add-description-of-doctor" />
                </div>
                <div className={clsx('mb-3', styles['more-info'])}>
                    <div className={clsx(styles['more-info-left'])}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-doctor" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            placeholder=""
                            onChange={setDoctor}
                            options={listDoctorsFromApi}
                        />
                    </div>
                    <div className={clsx(styles['more-info-right'])}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.introductory-information" />
                        </label>
                        <textarea
                            rows="3"
                            style={{ display: 'block', width: '100%', padding: '0 8px' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className={clsx('row', 'mb-3', styles['more-info'])}>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-price" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            placeholder=""
                            value={price}
                            onChange={setPrice}
                            options={listPriceFromApi}
                        />
                    </div>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-payment" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            placeholder=""
                            value={payment}
                            onChange={setPayment}
                            options={listPaymentFromApi}
                        />
                    </div>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-province" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            placeholder=""
                            value={province}
                            onChange={setProvince}
                            options={listProvinceFromApi}
                        />
                    </div>
                </div>
                <div className={clsx('row', 'mb-3', styles['more-info'])}>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-clinic" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            value={clinic}
                            placeholder=""
                            onChange={setClinic}
                            options={listClinicFromApi}
                        />
                    </div>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.choose-specialty" />
                        </label>
                        <Select
                            className={clsx(styles['select'])}
                            value={specialty}
                            placeholder=""
                            onChange={setSpecialty}
                            options={listSpecialtyFromApi}
                        />
                    </div>
                    <div className={clsx('form-group', 'col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-doctor.note" />
                        </label>
                        <input className="form-control" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                </div>
                <MdEditor
                    style={{ height: '500px', marginTop: '20px' }}
                    value={contentMarkdown}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />

                <button
                    className="btn btn-primary"
                    style={{ margin: '20px 40px', float: 'right' }}
                    onClick={handleSave}
                >
                    <FormattedMessage id="popular.save" />
                </button>
            </div>
        </>
    );
};

export default ManageDoctor;
