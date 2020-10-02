import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS } from '../../api/api';

const OTPResetForm = () => {
    const { info, error, dismiss, success } = useToaster();
    const [email, setEmail] = useState('');

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email': setEmail(value); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({ email })
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/otp/reset`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setEmail('');
        success(parsed.msg)
    })

    return (
        <section className={`form mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card bg-white p-4 mb-4">
                            <div className="card-body">

                                <ToastContainer />

                                <Link href="/auth/login_otp">
                                    <a>
                                        <i className="fas fa-chevron-left"></i>
                                    &nbsp; Back to login via OTP
                                    </a>
                                </Link>

                                <h1 className="my-3">
                                    <i class="fas fa-unlock-alt"></i>
                                    &nbsp; Reset OTP
                                </h1>

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
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Reset"
                                            className="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OTPResetForm;