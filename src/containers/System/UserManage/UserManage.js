import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import clsx from 'clsx';
import styles from './UserManage.module.scss';
import { getUserApi } from '../../../services/userService';
import Modal from '../../../components/Modal';

function UserManage() {
    const [listUsers, setListUsers] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        const fetchApi = async () => {
            let res = await getUserApi('all');
            if (res?.errCode === 0) {
                setListUsers(res.listUsers);
            }
        };
        fetchApi();
    }, []);

    const handleAddNewUser = () => {
        setIsShowModal(true)
    };

    const toggleModal = () => {
        setIsShowModal(!isShowModal)
    }

    const handleEditUser = () => {
        setIsShowModal(true)
    };

    return (
        <div className={clsx('text-center')}>
            <Modal isShowModal={isShowModal} toggleModal={toggleModal} />
            <div className={clsx('title', 'text-center', styles['container-title'])}>Manage users</div>
            <div>
                <button
                    className={clsx('btn', 'btn-primary', styles['btn-add'])}
                    onClick={handleAddNewUser}
                >
                    <i className="fa-solid fa-plus"></i> &nbsp;Add new user
                </button>
            </div>
            <div>
                <table className={clsx(styles['table'], 'mt-3')}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.map((user) => {
                                return (
                                    <tr key={`user-${user.id}`}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <button
                                                className={clsx(styles['btn-edit'])}
                                                onClick={handleEditUser}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button className={clsx(styles['btn-delete'])}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
