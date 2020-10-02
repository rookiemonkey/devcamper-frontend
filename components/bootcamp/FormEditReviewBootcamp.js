import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const EditReviewBootcampForm = props => {
    const { title: curTitle, text: curReview, rating: curRating, _id } = props.review;
    const { bootcamp } = props.review;
    const { user } = useAuth();
    const { error, info, success, dismiss } = useToaster();
    const [title, setTitle] = useState(curTitle);
    const [review, setReview] = useState(curReview);
    const [rating, setRating] = useState(curRating);

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'title': setTitle(value); break;
            case 'review': setReview(value); break;
            case 'rating': setRating(parseInt(value)); break;
            default: null;
        }
    })

    const handleReset = useCallback(() => {
        setTitle(curTitle); setReview(curReview);
        setRating(curRating);
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const infoId = info('Please wait ...')

        API_OPTIONS_PUT.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({ title, text: review, rating })
        }

        const raw = await fetch(`${API_URL}/api/v1/reviews/${_id}`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Review succesfully updated!')
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">

                            <Link href={`/bootcamp/${bootcamp._id}`}>
                                <a className="btn btn-link text-secondary my-3">
                                    <i className="fas fa-chevron-left"></i>
                                    &nbsp; Bootcamp Info
                                </a>
                            </Link>

                            <h1 className="mb-2">{bootcamp.name}</h1>

                            <h3 className="text-primary mb-4">Write a Review</h3>

                            <p>
                                You must have attended and graduated this bootcamp to review
							</p>

                            <form onSubmit={handleSubmit} method="POST">

                                <div className="form-group">
                                    <label htmlFor="rating">
                                        Rating: &nbsp;
                                        <span className="text-primary">
                                            {rating}
                                        </span>
                                    </label>

                                    <input
                                        type="range"
                                        className="custom-range"
                                        name='rating'
                                        min="1"
                                        max="10"
                                        step="1"
                                        id="rating"
                                        value={rating}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Review title"
                                        onChange={handleChange}
                                        value={title}
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="review"
                                        rows="10"
                                        className="form-control"
                                        placeholder="Your review"
                                        onChange={handleChange}
                                        value={review}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Update Review"
                                        className="btn btn-primary btn-block"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="button"
                                        value="Reset"
                                        className="btn btn-dark btn-block"
                                        onClick={handleReset}
                                    />
                                </div>

                                <p className="text-muted my-4">
                                    * Only users can leave a review for a bootcamp
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditReviewBootcampForm;