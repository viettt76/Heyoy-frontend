import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { createExaminationScheduleService, getExaminationScheduleService, getQuantityDoctorService } from '~/services';
import { LANGUAGES, convertDateToTimestamp } from '~/utils';
import styles from './ManageSchedule.module.scss';
import { getAllCodeService } from '~/services';

const ManageSchedule = () => {
    const [listDoctors, setListDoctors] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [listTimelineFromApi, setListTimelineFromApi] = useState([]);
    const [listTimelineChose, setListTimelineChose] = useState([]);

    const language = useSelector((state) => state.app.language);
    const userInfo = useSelector((state) => state.user.userInfo);

    const [isDoctor, setIsDoctor] = useState(false);
    console.log(userInfo?.id);

    useEffect(() => {
        if (userInfo?.roleId === 'R2') {
            setIsDoctor(true);
            setDoctor({
                label: '',
                value: userInfo?.id,
            });
        }
    }, [userInfo]);

    useEffect(() => {
        const fetchAllDoctors = async () => {
            let res = await getQuantityDoctorService('all');
            if (res?.data?.length > 0) {
                let result = res?.data.map((doctor) => {
                    let object = {
                        valueEn: `${doctor.id} - ${doctor.firstName} ${doctor.lastName}`,
                        valueVi: `${doctor.id} - ${doctor.lastName} ${doctor.firstName}`,
                    };

                    return {
                        label: language === LANGUAGES.VI ? object.valueVi : object.valueEn,
                        value: doctor.id,
                    };
                });
                setListDoctors(result);
            }
        };
        fetchAllDoctors();
    }, [language]);

    useEffect(() => {
        const fetchAllCode = async () => {
            let res = await getAllCodeService('time');
            if (res?.data?.length > 0) {
                setListTimelineFromApi(res?.data);
            }
        };
        fetchAllCode();
    }, [language]);

    useEffect(() => {
        let date = convertDateToTimestamp(currentDate);
        const fetchSchedule = async () => {
            let res = await getExaminationScheduleService(doctor?.value, date);

            if (res?.data) {
                setListTimelineChose(res.data?.length > 0 && res.data.map((item) => item.timeType));
            } else {
                setListTimelineChose([]);
            }
        };
        fetchSchedule();
    }, [doctor, currentDate]);

    const handleChooseTimeline = (key) => {
        setListTimelineChose((prev) => {
            if (prev.includes(key)) {
                let index = prev.indexOf(key);
                let cloneListTimelineChose = _.cloneDeep(prev);

                cloneListTimelineChose.splice(index, 1);
                return cloneListTimelineChose;
            } else {
                return [...prev, key];
            }
        });
    };

    const handleSave = async () => {
        if (!doctor) {
            toast.error('Please choose doctor!');
        } else if (!currentDate) {
            toast.error('Please choose date!');
        } else if (_.isEmpty(listTimelineChose)) {
            toast.error('Please choose timeline!');
        } else {
            let doctorId = doctor?.value;
            let date = convertDateToTimestamp(currentDate);

            let result = listTimelineChose.map((timeline) => {
                let object = {
                    doctorId,
                    date,
                    timeType: timeline,
                };
                return object;
            });
            let res = await createExaminationScheduleService(result);
            if (res?.errCode === 0) {
                toast.success(
                    language === LANGUAGES.VI
                        ? 'Tạo lịch khám thành công!'
                        : 'Created examination schedule successfully!',
                );
            } else {
                toast.error(
                    res?.message
                        ? res?.message
                        : language === LANGUAGES.VI
                        ? 'Tạo lịch khám thất bại!'
                        : 'Created examination schedule fail!',
                );
            }
        }
    };
    
    return (
        <Container>
            <h5 className={clsx(styles['title'])}>
                <FormattedMessage id="system.manage-schedule.manage-doctor's-medical-examination-plans" />
            </h5>
            <div className={clsx('row', 'mt-3')}>
                {!isDoctor && (
                    <div className={clsx('col-4')}>
                        <label>
                            <FormattedMessage id="system.manage-schedule.choose-doctor" />
                        </label>
                        <Select defaultValue={doctor} onChange={setDoctor} options={listDoctors} />
                    </div>
                )}
                <div className={clsx('col-4')}>
                    <label style={{ display: 'block' }}>
                        <FormattedMessage id="system.manage-schedule.choose-day" />
                    </label>
                    <DatePicker
                        className={clsx('form-control', styles['date-picker'])}
                        value={currentDate}
                        showIcon
                        closeOnScroll={true}
                        selected={currentDate}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        onChange={(date) => setCurrentDate(date)}
                    />
                </div>
            </div>
            <div className={clsx(styles['wrapper-timeline'])}>
                {listTimelineFromApi?.length > 0 &&
                    listTimelineFromApi.map((timeline, index) => {
                        return (
                            <button
                                key={`timeline-${index}`}
                                className={clsx(styles['timeline'], {
                                    [styles['active']]: listTimelineChose.includes(timeline.keyMap),
                                })}
                                onClick={() => handleChooseTimeline(timeline.keyMap)}
                            >
                                {language === LANGUAGES.VI ? timeline.valueVi : timeline.valueEn}
                            </button>
                        );
                    })}
            </div>
            <button className={clsx('btn btn-primary mt-3')} onClick={handleSave}>
                <FormattedMessage id="system.manage-schedule.save" />
            </button>
        </Container>
    );
};

export default ManageSchedule;
