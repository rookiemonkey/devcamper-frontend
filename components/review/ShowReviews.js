import Link from 'next/link';
import { useCallback } from 'react';
import styles from '../../styles/forms.module.css'

const Reviews = props => {
    const { bootcamp, reviews } = props;
    const { data: bootcampData } = bootcamp;
    const { data: reviewsData } = reviews;

    const handleImageError = useCallback(event => {
        event.target.onerror = null;
        event.target.src = `${process.env.NEXT_PUBLIC_IMG_SRC}no-photo.png`
    }, [])

    return (
        <section className={`bootcamp mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <Link href={`/bootcamp/${bootcampData._id}`}>
                            <a className="btn btn-secondary my-3" >
                                <i className="fas fa-chevron-left"></i>
                                &nbsp; Bootcamp Info
                            </a>
                        </Link>

                        <h1 className="mb-4">
                            {bootcampData.name} Reviews
                        </h1>

                        {
                            reviewsData.length > 0
                                ? reviewsData.map((review, ind) => (
                                    <div key={ind} className="card mb-3">
                                        <h5 className={`card-header bg-dark text-white ${styles.custom_header}`}>
                                            {review.title}
                                        </h5>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Rating: &nbsp; {review.rating}
                                                <span className="text-success">

                                                </span>
                                            </h5>
                                            <p className="card-text">
                                                {review.text}
                                            </p>
                                            <p className="text-muted">
                                                Writtern By {review.user.name}
                                            </p>
                                        </div>
                                    </div>
                                ))
                                : <div>
                                    <h6>No Reviews for this bootcamp yet</h6>
                                </div>
                        }

                    </div>

                    <div className="col-md-4">

                        <img
                            src={`${process.env.NEXT_PUBLIC_IMG_SRC}${bootcampData.photo}`} className="img-thumbnail"
                            alt={bootcampData.name}
                            onError={handleImageError}
                        />

                        <h1 className="text-center my-4">
                            <span
                                className="badge badge-secondary badge-success rounded-circle p-3"
                            >
                                {bootcampData.averageRating ? bootcampData.averageRating : '0.0'}
                            </span>
    						&nbsp; Rating
    					</h1>

                        <Link href={`/bootcamp/${bootcampData._id}/reviews/add`}>
                            <a className="btn btn-primary btn-block my-3">
                                <i className="fas fa-pencil-alt"></i>
                            &nbsp; Review This Bootcamp
                            </a>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Reviews;
