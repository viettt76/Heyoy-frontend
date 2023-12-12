import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import * as actions from '~/store/actions';
import styles from './Login.module.scss';
import { handleLoginService } from '~/services/userService';
import { path } from '~/utils';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleSubmitLogin();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password]);

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleSubmitLogin = async () => {
        setMessage('');
        try {
            const res = await handleLoginService(username, password);
            if (res?.errCode !== 0 && res?.message) {
                setMessage(res.message);
            }
            if (res?.errCode === 0) {
                dispatch(actions.userLoginSuccess(res.data));
                navigate(path.HOME);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <>
            <div className={clsx(styles['login-background'])}>
                <div className={clsx(styles['login-container'])}>
                    <div className={clsx(styles['login-content'], 'row')}>
                        <div className={clsx('col-12', styles['form-label'])}>
                            <FormattedMessage id="login.login" />
                        </div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>
                                <FormattedMessage id="login.username" />:
                            </label>
                            <input
                                autoFocus
                                value={username}
                                className={clsx('form-control')}
                                placeholder="Enter your username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className={clsx('col-12 form-group', styles['login-input'])}>
                            <label>
                                <FormattedMessage id="login.password" />:
                            </label>
                            <div className={clsx(styles['input-password'])}>
                                <input
                                    value={password}
                                    type={isShowPassword ? 'text' : 'password'}
                                    className={clsx('form-control')}
                                    placeholder="Enter your password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <span onClick={handleShowPassword}>
                                    {isShowPassword ? (
                                        <i className="fa-solid fa-eye"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                        {message && <div className={clsx(styles['error-message'])}>{message}</div>}
                        <div className={clsx('col-12')}>
                            <button className={clsx(styles['btn-login'])} onClick={handleSubmitLogin}>
                                <FormattedMessage id="login.login" />
                            </button>
                        </div>
                        <div className={clsx('col-12', styles['user-features'])}>
                            <span className={clsx(styles['forgot-password'])}>
                                <FormattedMessage id="login.forgot-password" />
                            </span>
                            <div>
                                <FormattedMessage id="login.do-not-have-account" />?{' '}
                                <Link className={clsx(styles['register'])} to="/register">
                                    <FormattedMessage id="login.register" />
                                </Link>
                            </div>
                        </div>
                        {/* <div className={clsx('col-12', 'text-center', styles['social-login'])}>
                            <span>Or sign in with</span>
                            <div>
                                <i className="fa-brands fa-google"></i>
                                <i className="fa-brands fa-facebook"></i>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
