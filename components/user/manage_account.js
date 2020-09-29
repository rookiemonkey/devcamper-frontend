import styles from '../../styles/forms.module.css';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const ManageAccount = () => {
    const { user } = useAuth();
    const { error, success, info, dismiss } = useToaster();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (user && user.success) {
            setName(user.currentUser.name);
            setEmail(user.currentUser.email);
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

        const raw = await fetch(`${API_URL}/api/v1/users/${user.currentUser._id}`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Account succesfully updated!')
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
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

                                <small className="form-text text-muted">
                                    *Only admins can change their account informations
                                </small>

                                <small className="form-text text-muted">
                                    *Changing your email will reset your role to publisher since you need to confirm your email again. Upon confirmation, Please request to be an admin again.
                                </small> <br />

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="submit"
                                                value="Save"
                                                className="btn btn-success btn-block"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <a
                                                href="update-password.html"
                                                className="btn btn-secondary btn-block"
                                            >Update Password</a>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ManageAccount;