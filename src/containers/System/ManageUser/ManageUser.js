import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ManageUser.module.scss';
import { getUserService, createUserService, deleteUserService, updateUserService } from '~/services/userService';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import * as actions from '~/store/actions';
import { LANGUAGES, convertBufferToString } from '~/utils';
import { languageSelector } from '~/store/selectors';

function ManageUser() {
    const [listUsers, setListUsers] = useState([]);
    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const dispatch = useDispatch();
    const language = useSelector(languageSelector);

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
    }, [dispatch]);

    const [gendersFromApi, setGendersFromApi] = useState(adminRedux.genders || []);
    const [rolesFromApi, setRolesFromApi] = useState(adminRedux.roles || []);
    const [positionsFromApi, setPositionsFromApi] = useState(adminRedux.positions || []);

    useEffect(() => {
        setGendersFromApi(adminRedux.genders);
        setRolesFromApi(adminRedux.roles);
        setPositionsFromApi(adminRedux.positions);
    }, [adminRedux]);

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
                toast.success(
                    language === LANGUAGES.VI ? 'Thêm người dùng thành công!' : 'Add a new user successfully!',
                );
            } else {
                toast.error(
                    res?.message
                        ? res?.message
                        : language === LANGUAGES.VI
                        ? 'Thêm người dùng thất bại!'
                        : 'Add a new user failed!',
                );
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
            toast.success(
                language === LANGUAGES.VI
                    ? 'Thay đổi thông tin người dùng thành công'
                    : 'Change information about user successfully',
            );
        } else {
            toast.error(
                res?.message
                    ? res?.message
                    : language === LANGUAGES.VI
                    ? 'Thay đổi thông tin người dùng thất bại'
                    : 'Change information about user failed',
            );
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            let res = await deleteUserService(id);
            if (res?.errCode === 0) {
                getUserApi();
                toast.success(language === LANGUAGES.VI ? 'Xoá người dùng thành công' : 'Delete user successfully');
            } else {
                toast.error(
                    res?.message
                        ? res?.message
                        : language === LANGUAGES.VI
                        ? 'Xoá người dùng thất bại'
                        : 'Delete user failed',
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                <div className={clsx('title', 'text-center', styles['container-title'])}>
                    <FormattedMessage id="system.manage-user.manage-user" />
                </div>
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
                                    <FormattedMessage id="system.manage-user.email" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.first-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.last-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.gender" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.role" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.position" />
                                </th>

                                <th>
                                    <FormattedMessage id="system.manage-user.phone-number" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.avatar" />
                                </th>
                                <th>
                                    <FormattedMessage id="system.manage-user.actions" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers &&
                                listUsers.map((user) => {
                                    const srcImage = convertBufferToString(user?.image || '');
                                    return (
                                        <tr key={`user-${user.id}`}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>
                                                {gendersFromApi.map((genderFromApi) => {
                                                    if (genderFromApi.keyMap === user.gender) {
                                                        return language === LANGUAGES.VI
                                                            ? genderFromApi.valueVi
                                                            : genderFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>
                                            <td>
                                                {rolesFromApi.map((roleFromApi) => {
                                                    if (roleFromApi.keyMap === user.roleId) {
                                                        return language === LANGUAGES.VI
                                                            ? roleFromApi.valueVi
                                                            : roleFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>
                                            <td>
                                                {positionsFromApi.map((positionFromApi) => {
                                                    if (positionFromApi.keyMap === user.positionId) {
                                                        return language === LANGUAGES.VI
                                                            ? positionFromApi.valueVi
                                                            : positionFromApi.valueEn;
                                                    }
                                                    return '';
                                                })}
                                            </td>

                                            <td>{user.phoneNumber}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                {srcImage && (
                                                    <img
                                                        width={80}
                                                        height={80}
                                                        src={srcImage}
                                                        alt={`${user.lastName} ${user.firstName}`}
                                                    />
                                                )}
                                            </td>
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

export default ManageUser;
