import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const ManageAccount = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { error, success, info, dismiss } = useToaster();
    const [userId, setUserId] = useState('');
    const [isOtp, setIsOtp] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (user && user.success) {
            setName(user.currentUser.name);
            setEmail(user.currentUser.email);
            setIsOtp(user.currentUser.otp);
            setUserId(user.currentUser._id);
        }
    }, [user])

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            default: return null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const infoId = info('Please wait ...')

        API_OPTIONS_PUT.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({ email, name })
        }

        const raw = await fetch(`${API_URL}/api/v1/users/${userId}`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Account succesfully updated!')
    })

    const handleToggleOTP = useCallback(async () => {
        const infoId = info('Please wait ...')

        const options = {
            ...API_OPTIONS_PUT,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/otp`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.data)
        }

        setIsOtp(!isOtp)
        success(parsed.data)
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            {
                                user && isOtp
                                    ? <span className="float-right badge badge-pill badge-success">
                                        OTP Enabled
                                    </span>
                                    : <span className="float-right badge badge-pill badge-warning">
                                        OTP Disabled
                                    </span>
                            }
                            <h1 className="mb-2">Manage Account</h1>
                            <form onSubmit={handleSubmit} method="POST">

                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="button"
                                                value="Toggle OTP"
                                                className="btn btn-dark btn-block"
                                                onClick={handleToggleOTP}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Link href={`/user/${router.query.userid}/manage/password`}>
                                                <a className="btn btn-secondary btn-block"
                                                >Update Password</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input
                                                type="submit"
                                                value="Save"
                                                className="btn btn-primary btn-block"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <small className="form-text text-muted">
                                    * Only admins can change their account informations
                                </small>

                                <small className="form-text text-muted">
                                    * Changing your email will reset your role to publisher since you need to confirm your email again. Upon confirmation, Please request to be an admin again.
                                </small>

                                <small className="form-text text-muted">
                                    * OTP will take precedence upon enabling it. Therefore, upon disabling, you'll be needing to login using the password that you are using before enabling it.
                                </small>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ManageAccount;