import styles from '../../styles/forms.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS } from '../../api/api';

const LoginForm = () => {
    const router = useRouter();
    const { info, error, dismiss, success } = useToaster();
    const { handleSetUser } = useAuth();
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')
        setDisabled(true)

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({ email, password })
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/signin`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            setDisabled(false)
            return error(parsed.msg)
        }

        success('Successfully logged in! Please wait while we are redirecting you')

        setTimeout(() => {
            setEmail(''); setPassword('');
            handleSetUser(parsed)
            router.push('/')
        }, 4000)
    })

    return (
        <section className={`form mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card bg-white p-4 mb-4">
                            <div className="card-body">

                                <ToastContainer />

                                <span className="float-right">
                                    Login <Link href="/auth/login_otp"><a>via OTP</a></Link>
                                </span>

                                <h1>
                                    <i className="fas fa-sign-in-alt"></i>
                                    &nbsp; Login
                                </h1>

                                <p>
                                    Log in to list your bootcamp or rate, review and favorite
                                    bootcamps
								</p>

                                <form method="POST" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={handleChange}
                                            required
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={handleChange}
                                            required
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Login"
                                            className="btn btn-primary btn-block"
                                            disabled={disabled}
                                        />
                                    </div>
                                </form>
                                <p><Link href="/auth/password_reset"><a>Forgot Password?</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;