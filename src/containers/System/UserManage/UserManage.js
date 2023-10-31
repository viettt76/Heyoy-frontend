import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import clsx from 'clsx';
import styles from './UserManage.module.scss';
import { getUserApi } from '../../../services/userService';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUsers: [],
        };
    }

    async componentDidMount() {
        let res = await getUserApi('all');
        if (res?.errCode === 0) {
            this.setState({
                listUsers: res.listUsers,
            });
        }
    }

    render() {
        return (
            <div className={clsx('text-center')}>
                <div className={clsx('title', 'text-center')}>Manage users</div>
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
                            {this.state.listUsers &&
                                this.state.listUsers.map((user) => {
                                    return (
                                        <tr key={`user-${user.id}`}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <button className={clsx('btn', 'btn-warning', styles['btn-edit'])}>
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                <button className={clsx('btn', 'btn-danger', styles['btn-delete'])}>
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
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
