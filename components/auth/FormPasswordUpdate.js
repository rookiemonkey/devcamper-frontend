import styles from '../../styles/forms.module.css';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';
import toasterConfiguration from '../_toaster';

const PasswordUpdateForm = () => {
    const router = useRouter();
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const success = message => toast.success(message, toasterConfiguration);
    const error = message => toast.error(message, toasterConfiguration);
    const info = message => toast.info(message, toasterConfiguration);

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
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

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({ passwordNew, passwordConfirm })
        }

        const { token } = router.query;

        const raw = await fetch(`${API_URL}/api/v1/auth/resetPassword/${token}`, options)
        const parsed = await raw.json();
        toast.dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setPasswordNew(''); setPasswordConfirm('');
        success('Password succesfully changed. Please login using the new password')
    })

    return (
        <section className={`form mt-5 ${styles.custom_mt}`}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">

                            <ToastContainer />

                            <h1 className="mb-2">Update Password</h1>
                            <form onSubmit={handleSubmit} method="POST">
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
                                        className="btn btn-dark btn-block"
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

export default PasswordUpdateForm;