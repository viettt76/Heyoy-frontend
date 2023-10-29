import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import clsx from 'clsx';

import * as actions from '../../store/actions';
import styles from './Login.module.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        };
    }

    handleChangeInputValue = (event, input) => {
        this.setState({ [input]: event.target.value });
    };

    handleShowPassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    handleSubmitLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            const res = await handleLoginApi(this.state.username, this.state.password);
            if (res?.errCode !== 0 && res?.errMessage) {
                this.setState({
                    errMessage: res.errMessage,
                });
            }
            if(res?.errCode === 0) {
                this.props.userLoginSuccess(res.data)
            }
        } catch (error) {
            if (error?.response?.data?.errMessage) {
                this.setState({
                    errMessage: error.response.data.errMessage,
                });
            }
        }
    };

    render() {
        return (
            <div className={clsx(styles['login-background'])}>
                <div className={clsx(styles['login-container'])}>
                    <div className={clsx(styles['login-content'], 'row')}>
                        <div className={clsx('col-12', styles['form-label'])}>Login</div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>Username:</label>
                            <input
                                value={this.state.username}
                                className={clsx('form-control')}
                                placeholder="Enter your username"
                                onChange={(event) => this.handleChangeInputValue(event, 'username')}
                            />
                        </div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>Password:</label>
                            <div className={clsx(styles['input-password'])}>
                                <input
                                    value={this.state.password}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className={clsx('form-control')}
                                    placeholder="Enter your password"
                                    onChange={(event) => this.handleChangeInputValue(event, 'password')}
                                />
                                <span onClick={this.handleShowPassword}>
                                    {this.state.isShowPassword ? (
                                        <i className="fa-solid fa-eye"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                        {this.state.errMessage && (
                            <div className={clsx(styles['error-message'])}>{this.state.errMessage}</div>
                        )}
                        <div className={clsx('col-12')}>
                            <button className={clsx(styles['btn-login'])} onClick={this.handleSubmitLogin}>
                                Login
                            </button>
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
