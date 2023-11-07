import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './UserManage.module.scss';
import { getUserService, createUserService, deleteUserService, updateUserService } from '~/services/userService';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import { toast } from 'react-toastify';

function UserManage() {
    const [listUsers, setListUsers] = useState([]);
    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getUserApi();
    }, []);

    const getUserApi = async () => {
        try {
            let res = await getUserService('all');
            if (res?.errCode === 0) {
                setListUsers(res.listUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleModalAddNewUser = () => {
        setIsShowModalAddNewUser(!isShowModalAddNewUser);
    };

    const toggleModalEditUser = () => {
        setIsShowModalEditUser(!isShowModalEditUser);
        getUserApi();
    };

    const handleAddNewUser = async (dataUser) => {
        try {
            let res = await createUserService(dataUser);
            if (res?.errCode === 0) {
                toggleModalAddNewUser();
                getUserApi();
                toast.success('Add a new user successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                alert(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsShowModalEditUser(true);
    };

    const saveEditUser = async (dataUser) => {
        let res = await updateUserService(dataUser);
        if (res?.errCode === 0) {
            toggleModalEditUser();
            toast.success('Change information about user successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            alert(res?.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            let res = await deleteUserService(id);
            if (res?.errCode === 0) {
                getUserApi();
                toast.success('Delete user succeed', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={clsx('text-center')}>
            <ModalAddNewUser
                isShowModalAddNewUser={isShowModalAddNewUser}
                toggleModalAddNewUser={toggleModalAddNewUser}
                handleAddNewUser={handleAddNewUser}
            />
            <ModalEditUser
                isShowModalEditUser={isShowModalEditUser}
                currentUser={currentUser}
                toggleModalEditUser={toggleModalEditUser}
                saveEditUser={saveEditUser}
            />
            <div className={clsx('title', 'text-center', styles['container-title'])}>Manage users</div>
            <div>
                <button className={clsx('btn', 'btn-primary', styles['btn-add'])} onClick={toggleModalAddNewUser}>
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
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className={clsx(styles['btn-delete'])}
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
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

export default UserManage;
