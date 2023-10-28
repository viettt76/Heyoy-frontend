import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import clsx from 'clsx';

import * as actions from '../../store/actions';
import styles from './Login.module.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={clsx(styles['login-background'])}>
                <div className={clsx(styles['login-container'])}>
                    <div className={clsx(styles['login-content'], 'row')}>
                        <div className={clsx('col-12', styles['form-label'])}>Login</div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>Username:</label>
                            <input className={clsx('form-control')} placeholder="Enter your username" />
                        </div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>Password:</label>
                            <input type="password" className={clsx('form-control')} placeholder="Enter your password" />
                        </div>
                        <div className={clsx('col-12')}>
                            <button className={clsx(styles['btn-login'])}>Login</button>
                        </div>
                        <div className={clsx('col-12', styles['forgot-password'])}>
                            <span>Forgot your password?</span>
                        </div>
                        <div className={clsx('col-12', 'text-center', styles['social-login'])}>
                            <span>Or sign in with</span>
                            <div>
                                <i className="fa-brands fa-google"></i>
                                <i className="fa-brands fa-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
