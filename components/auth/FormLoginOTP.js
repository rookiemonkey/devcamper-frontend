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
    const { info, error, dismiss } = useToaster();
    const { handleSetUser } = useAuth();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email': setEmail(value); break;
            case 'token': setToken(value); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({ email, token })
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/otp`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setEmail(''); setToken('');
        handleSetUser(parsed)
        router.push('/')
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
                                    Login <Link href="/auth/login"><a>via password</a></Link>
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
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Token</label>
                                        <input
                                            type="text"
                                            name="token"
                                            className="form-control"
                                            placeholder="Enter OTP Token"
                                            value={token}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Login"
                                            className="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                                <p><Link href="/auth/password_reset"><a>Lost OTP Authenticator key?</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;