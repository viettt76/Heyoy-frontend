import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './UserManage.module.scss';
import { getUserService, createUserService, deleteUserService, updateUserService } from '~/services/userService';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import SystemHeader from '../SystemHeader';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';

function UserManage() {
    const [listUsers, setListUsers] = useState([]);
    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const dispatch = useDispatch();
    const language = useSelector((state) => state.app.language);

    useEffect(() => {
        getUserApi();
    }, []);

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
    }, [adminRedux]);

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
        <>
            <SystemHeader />
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
                        <i className="fa-solid fa-plus"></i> &nbsp;
                        <FormattedMessage id="system.manage-user.add-user" />
                    </button>
                </div>
                <div>
                    <table className={clsx(styles['table'], 'mt-3')}>
                        <thead>
                            <tr>
                                <th>
                                    <FormattedMessage id="system.manage-admin.email" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.first-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.last-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.gender" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.position" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.role" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.phone-number" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-admin.actions" />
                                </th>
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
                                            <td>
                                                {gendersFromApi.map((genderFromApi) => {
                                                    if (genderFromApi.key === user.gender) {
                                                        return language === LANGUAGES.VI
                                                            ? genderFromApi.valueVi
                                                            : genderFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>
                                            <td>
                                                {positionsFromApi.map((positionFromApi) => {
                                                    if (positionFromApi.key === user.positionId) {
                                                        return language === LANGUAGES.VI
                                                            ? positionFromApi.valueVi
                                                            : positionFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>
                                            <td>
                                                {rolesFromApi.map((roleFromApi) => {
                                                    if (roleFromApi.key === user.roleId) {
                                                        return language === LANGUAGES.VI
                                                            ? roleFromApi.valueVi
                                                            : roleFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.address}</td>
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
        </>
    );
}

export default UserManage;
