import styles from '../../styles/forms.module.css'
import Link from 'next/link';

const Reviews = props => {
    const { bootcamp, reviews } = props;
    const { data: bootcampData } = bootcamp;
    const { data: reviewsData } = reviews;

    return (
        <section className={`bootcamp mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <Link href={`/bootcamp/${bootcampData._id}`}>
                            <a
                                target="_blank"
                                className="btn btn-secondary my-3"
                            >
                                <i className="fas fa-chevron-left"></i>
                                &nbsp; Bootcamp Info
                            </a>
                        </Link>

                        <h1 className="mb-4">
                            {bootcampData.name} Reviews
                        </h1>

                        {
                            reviewsData.map((review, ind) => (
                                <div key={ind} className="card mb-3">
                                    <h5 className="card-header bg-dark text-white">
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
                        }

                    </div>

                    <div className="col-md-4">
                        <h1 className="text-center my-4">
                            <span
                                className="badge badge-secondary badge-success rounded-circle p-3"
                            >
                                {bootcampData.averageRating}
                            </span>
    						&nbsp; Rating
    					</h1>
                        <a
                            href={`/bootcamp/${bootcampData._id}/review`}
                            className="btn btn-primary btn-block my-3"
                        >
                            <i className="fas fa-pencil-alt"></i>
                            &nbsp; Review This Bootcamp
                        </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Reviews;
