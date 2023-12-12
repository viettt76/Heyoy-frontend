import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { getDetailDoctorService, getExaminationScheduleService } from '~/services';
import styles from './Booking.module.scss';
import { LANGUAGES, convertBufferToString } from '~/utils';
import ModalBooking from '~/components/ModalBooking';
import { languageSelector } from '~/store/seletors';

const Booking = ({ data }) => {
    let language = useSelector(languageSelector);

    const [detailDoctor, setDetailDoctor] = useState({});
    const [allDay, setAllday] = useState([]);
    const [dateChose, setDateChose] = useState(new Date().setHours(0, 0, 0, 0));
    const [listTimelineFromApi, setListTimelineFromApi] = useState([]);

    const [seeDetailPrice, setSetDetailPrice] = useState(false);
    const [seeDetailInsurance, setSetDetailInsurance] = useState(false);

    const [timeline, setTimeline] = useState('');
    const [showModalBooking, setShowModalBooking] = useState(false);

    const handleCloseModalBooking = () => setShowModalBooking(false);
    const handleShowModalBooking = () => setShowModalBooking(true);

    useEffect(() => {
        let fetchDetailDoctor = async () => {
            let res = await getDetailDoctorService(data.id);
            if (res?.data) {
                setDetailDoctor(res.data);
            }
        };
        fetchDetailDoctor();
    }, [data]);

    useEffect(() => {
        const fetchExaminationSchedule = async () => {
            let res = await getExaminationScheduleService(data.id, dateChose);
            if (res?.data) {
                setListTimelineFromApi(res.data);
            } else {
                setListTimelineFromApi([]);
            }
        };
        fetchExaminationSchedule();
    }, [data.id, dateChose]);

    useEffect(() => {
        let currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        let arrDay = [];

        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let today = moment(new Date()).locale('vi').format('DD/MM');
                    object.label = `Hôm nay - ${today}`;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('vi', vi).format('dddd - DD/MM');
                }
            } else if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let today = moment(new Date()).locale('en').format('DD/MM');
                    object.label = `Today - ${today}`;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            let timestamp = currentDay.getTime();
            object.value = timestamp;
            arrDay.push(object);
            currentDay.setDate(currentDay.getDate() + 1);
        }
        setAllday(arrDay);
    }, [language]);

    const handleChooseTimeline = (key) => {
        setTimeline(key);
        handleShowModalBooking();
    };
    
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx('col-6', styles['wrapper-left'])}>
                <img width={80} height={80} src={convertBufferToString(data.image)} alt={data.name} />
                <div className={clsx(styles['doctor-info'])}>
                    <h5 className={clsx(styles['name-doctor'])}>
                        {language === LANGUAGES.VI
                            ? `${data?.positionData?.valueVi} ${data.lastName} ${data.firstName}`
                            : `${data?.positionData?.valueEn} ${data.firstName} ${data.lastName}`}
                    </h5>
                    <p className={clsx(styles['doctor-description'])}>{detailDoctor?.Markdown?.description}</p>
                    {detailDoctor?.Doctor_Info?.provinceData && (
                        <div>
                            <i className="fa-solid fa-location-dot"></i>{' '}
                            {language === LANGUAGES.VI
                                ? detailDoctor?.Doctor_Info?.provinceData?.valueVi
                                : detailDoctor?.Doctor_Info?.provinceData?.valueEn}
                        </div>
                    )}
                </div>
            </div>
            <div className={clsx('col-6', styles['wrapper-right'])}>
                <select className={clsx(styles['select-day'])} onChange={(e) => setDateChose(e.target.value)}>
                    {allDay?.length > 0 &&
                        allDay.map((day, index) => {
                            return (
                                <option key={`day-${index}`} value={day.value}>
                                    {day.label}
                                </option>
                            );
                        })}
                </select>
                <div className={clsx(styles['examination-schedule-title'])}>
                    <i className="fa-solid fa-calendar-days"></i>{' '}
                    <span style={{ textTransform: 'uppercase' }}>
                        <FormattedMessage id="detail-doctor.examination-schedule" />
                    </span>
                </div>
                <div>
                    <div className={clsx(styles['list-times'])}>
                        {listTimelineFromApi?.length > 0 ? (
                            <span>
                                {listTimelineFromApi.map((timeline, index) => {
                                    return (
                                        <button
                                            key={`timeline-${index}`}
                                            className={clsx(styles['timeline'])}
                                            onClick={() => handleChooseTimeline(timeline)}
                                        >
                                            {language === LANGUAGES.VI
                                                ? timeline.timeTypeData.valueVi
                                                : timeline.timeTypeData.valueEn}
                                        </button>
                                    );
                                })}
                                <div>
                                    <FormattedMessage id="detail-doctor.choose" />{' '}
                                    <i className="fa-regular fa-hand-point-up"></i>{' '}
                                    <FormattedMessage id="detail-doctor.book-free" />
                                </div>
                            </span>
                        ) : (
                            <div style={{ fontStyle: 'italic' }}>
                                <FormattedMessage id="detail-doctor.no-schedule" />
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles['address-price'])}>
                        {detailDoctor?.Doctor_Info?.clinicData && (
                            <div className={clsx(styles['address-wrapper'])}>
                                <span className={clsx(styles['address-label'])}>
                                    <FormattedMessage id="detail-doctor.address-clinic" />
                                </span>
                                <span className={clsx(styles['name-clinic'])}>
                                    {detailDoctor?.Doctor_Info?.clinicData?.name}
                                </span>
                                <span className={clsx(styles['address-clinic'])}>
                                    {detailDoctor?.Doctor_Info?.clinicData?.address}
                                </span>
                            </div>
                        )}
                        {detailDoctor?.Doctor_Info?.priceData && (
                            <div className={clsx(styles['price-wrapper'])}>
                                <span className={clsx(styles['price-label'])}>
                                    <FormattedMessage id="detail-doctor.price" />:
                                </span>{' '}
                                {!seeDetailPrice ? (
                                    <>
                                        <span>
                                            {language === LANGUAGES.EN ? (
                                                <NumericFormat
                                                    value={detailDoctor?.Doctor_Info?.priceData?.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            ) : (
                                                <NumericFormat
                                                    value={detailDoctor?.Doctor_Info?.priceData?.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            )}
                                        </span>
                                        .
                                        <span
                                            className={clsx(styles['see-detail'])}
                                            onClick={() => setSetDetailPrice(true)}
                                        >
                                            <FormattedMessage id="detail-doctor.see-detail" />
                                        </span>
                                    </>
                                ) : (
                                    <div>
                                        <div className={clsx(styles['see-detail-info'])}>
                                            <div className={clsx(styles['border'])}>
                                                <div>
                                                    <FormattedMessage id="detail-doctor.price" />
                                                </div>

                                                <span className={clsx(styles['price'])}>
                                                    {language === LANGUAGES.VI ? (
                                                        <NumericFormat
                                                            value={detailDoctor?.Doctor_Info?.priceData?.valueVi}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        />
                                                    ) : (
                                                        <NumericFormat
                                                            value={detailDoctor?.Doctor_Info?.priceData?.valueEn}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'USD'}
                                                        />
                                                    )}
                                                </span>
                                                <span className={clsx(styles['text'], styles['text-mr-80'])}>
                                                    {detailDoctor?.Doctor_Info?.note}
                                                </span>
                                            </div>
                                            <div className={clsx(styles['border'])} style={{ backgroundColor: '#eee' }}>
                                                <FormattedMessage id="detail-doctor.patients-can-pay-costs" />
                                                {language === LANGUAGES.VI
                                                    ? detailDoctor?.Doctor_Info?.paymentData?.valueVi
                                                    : detailDoctor?.Doctor_Info?.paymentData?.valueEn}
                                            </div>
                                        </div>
                                        <span
                                            className={clsx(styles['hide-detail'])}
                                            onClick={() => setSetDetailPrice(false)}
                                        >
                                            <FormattedMessage id="detail-doctor.hide-price-list" />
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={clsx(styles['insurance'])}>
                            <span className={clsx(styles['insurance-title'])}>
                                <FormattedMessage id="detail-doctor.insurance-applicable" />.
                            </span>
                            {!seeDetailInsurance ? (
                                <span
                                    className={clsx(styles['see-detail'])}
                                    onClick={() => setSetDetailInsurance(true)}
                                >
                                    <FormattedMessage id="detail-doctor.see-detail" />
                                </span>
                            ) : (
                                <div>
                                    <div className={clsx(styles['see-detail-info'])}>
                                        <div className={clsx(styles['border'])}>
                                            <div>
                                                <FormattedMessage id="detail-doctor.state-health-insurance" />
                                            </div>
                                            <span className={clsx(styles['text'])}>
                                                <FormattedMessage id="detail-doctor.do-not-apply" />
                                            </span>
                                        </div>
                                        <div className={clsx(styles['border'])}>
                                            <div>
                                                <FormattedMessage id="detail-doctor.direct-guarantee-insurance" />
                                            </div>
                                            <span className={clsx(styles['text'])}>
                                                <FormattedMessage id="detail-doctor.direct-cold-insurance-does-not-apply" />
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={clsx(styles['hide-detail'])}
                                        onClick={() => setSetDetailInsurance(false)}
                                    >
                                        <FormattedMessage id="detail-doctor.collapse" />
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalBooking
                show={showModalBooking}
                handleShowModalBooking={handleShowModalBooking}
                handleCloseModalBooking={handleCloseModalBooking}
                doctorId={data.id}
                doctorPosition={
                    language === LANGUAGES.VI
                        ? detailDoctor?.positionData?.valueVi
                        : detailDoctor?.positionData?.valueEn
                }
                doctorName={
                    language === LANGUAGES.VI
                        ? `${detailDoctor?.lastName} ${detailDoctor?.firstName}`
                        : `${detailDoctor?.firstName} ${detailDoctor?.lastName}`
                }
                time={timeline}
                date={dateChose}
                price={
                    detailDoctor?.Doctor_Info?.priceData
                        ? language === LANGUAGES.VI
                            ? `${new Intl.NumberFormat('vi-VN').format(
                                  +detailDoctor?.Doctor_Info?.priceData?.valueVi,
                              )} VND`
                            : `${new Intl.NumberFormat('en-ES').format(
                                  +detailDoctor?.Doctor_Info?.priceData?.valueEn,
                              )} USD`
                        : ''
                }
            />
        </div>
    );
};

Booking.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Booking;
