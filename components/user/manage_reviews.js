import styles from '../../styles/forms.module.css';
import styles2 from '../../styles/inline.module.css';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_DELETE } from '../../api/api';

const ManageReviews = props => {
    const { user, handleSetUser } = useAuth();
    const { success, info, error, dismiss } = useToaster();
    const { reviews } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        // api doesn't allow to filter only a specific userid, 
        // manually doing on frontend but not highly recommended 
        if (user && user.success) {
            setData(reviews.data.filter(review =>
                review.user == user.currentUser._id
            ))
        }
    }, [user])

    const handleDelete = useCallback(async review_id => {
        const isConfirmed = confirm('Are you sure you want to delete your review?')

        if (!isConfirmed) {
            return null
        }

        const options = {
            ...API_OPTIONS_DELETE,
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const raw = await fetch(`${API_URL}/api/v1/reviews/${review_id}`, options)
        const parsed = await raw.json();

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Successfully deleted your review')
    }, [])

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-4">Manage Reviews</h1>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Bootcamp</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((review, ind) => (
                                            <tr key={ind}>
                                                <td>{review.bootcamp.name}</td>
                                                <td>{review.rating}</td>
                                                <td>
                                                    <Link href="add-review.html">
                                                        <a className="btn btn-secondary ml-1 mr-1">
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </a>
                                                    </Link>

                                                    <form
                                                        onSubmit={event => {
                                                            event.preventDefault();
                                                            handleDelete(review._id)
                                                        }}
                                                        className={styles2.inline}
                                                        method="POST"
                                                    >
                                                        <button
                                                            type="submit"
                                                            className="btn btn-danger ml-1 mr-1"
                                                        ><i className="fas fa-times"></i>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ManageReviews;