import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useToaster from '../../context/toaster';
import useAuth from '../../context/auth';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const ManagePassword = () => {
    const { user } = useAuth();
    const { error, success, info, dismiss } = useToaster();
    const [passwordCurrent, setCurrentPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'passwordCurrent': setCurrentPassword(value); break;
            case 'passwordNew': setPasswordNew(value); break;
            case 'passwordConfirm': setPasswordConfirm(value); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        if (passwordNew.length < 8) {
            return error('Passwords should be at least 8 characters in length')
        }

        API_OPTIONS_PUT.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({
                currentPassword: passwordCurrent,
                newPassword: passwordNew
            })
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/me/update_password`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setPasswordNew(''); setPasswordConfirm(''); setCurrentPassword('');
        success('Password succesfully changed. Please relogin using the new password')
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">

                            <Link href={`/user/${user.currentUser._id}/manage/account`}>
                                <a className="btn btn-link text-secondary my-3">
                                    <i className="fas fa-chevron-left"></i>
                                    &nbsp; Manage Account
                                </a>
                            </Link>

                            <h1 className="mb-2">Update Password</h1>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name="passwordCurrent"
                                        className="form-control"
                                        placeholder="Current Password"
                                        value={passwordCurrent}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="passwordNew"
                                        className="form-control"
                                        placeholder="New Password"
                                        value={passwordNew}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        value={passwordConfirm}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Update Password"
                                        className="btn btn-primary btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ManagePassword;