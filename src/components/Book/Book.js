import clsx from 'clsx';
import styles from './Book.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Book = ({ data }) => {
    const [day, setDay] = useState(data?.days[0]);

    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx('col-6', styles['wrapper-left'])}>
                <img width={80} height={80} src={data.image} alt={data.name} />
                <div className={clsx(styles['doctor-info'])}>
                    <h5 className={clsx(styles['name-doctor'])}>{data.name}</h5>
                    <p className={clsx(styles['doctor-description'])}>{data.description}</p>
                </div>
            </div>
            <div className={clsx('col-6', styles['wrapper-right'])}>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    {data?.days?.map((day, i) => {
                        return <option key={`day-${i}`}>{day}</option>;
                    })}
                </select>
                <span className={clsx(styles['calendar'])}>
                    <i className="fa-solid fa-calendar-days"></i> Lịch khám
                </span>
                <div className={clsx(styles['list-times'])}>
                    {data.listTimes?.map((time) => {
                        return (
                            <Link
                                key={`time-${time}`}
                                className={clsx('btn', 'btn-light')}
                                to="/dat-lich-kham"
                                state={{ image: data.image, name: data.name, day, time, price: data.price }}
                            >
                                {time}
                            </Link>
                        );
                    })}
                </div>
                <div className={clsx(styles['address'])}>
                    <span>Địa chỉ khám</span>
                    <p>{data.address}</p>
                </div>
                <span>Giá khám: {data.price}</span>
            </div>
        </div>
    );
};

export default Book;
