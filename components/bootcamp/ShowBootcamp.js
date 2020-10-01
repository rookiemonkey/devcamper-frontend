import styles from '../../styles/forms.module.css';
import formatPrice from '../../utilities/formatPrice';

const ShowBootcamp = props => {
    const { _id, name, jobAssistance, jobGuarantee, housing, acceptGi,
        location, careers, photo, phone, email, website, description, user,
        averageCost, courses, averageRating
    } = props.bootcamp;

    return (

        <section className={`bootcamp mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">

                    <div className="col-md-8">
                        <h1>{name}</h1>

                        <p>{description}</p>

                        <p className="lead mb-4">
                            Average Course Cost &nbsp;
                            <span className="text-primary">${formatPrice(averageCost)}</span>
                        </p>

                        {
                            courses.map((course, ind) => (
                                <div className="card mb-3" key={ind}>
                                    <h5 className="card-header bg-primary text-white">
                                        {course.title}
                                    </h5>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Duration: {course.weeks} Weeks
                                        </h5>
                                        <p className="card-text">{course.description}</p>
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item">
                                                <i className="fas fa-money-bill-wave-alt text-success"></i> &nbsp;
                                                <b>Cost:</b> ${formatPrice(course.tuition)}
                                            </li>
                                            <li className="list-group-item">
                                                <i className="far fa-hand-paper text-info"></i> &nbsp;
                                                <b>Skill Required:</b> {course.minimumSkill}
                                            </li>
                                            <li className="list-group-item">
                                                <i className="fas fa-user-graduate text-primary"></i> &nbsp;
                                                <b>Scholarship Available:</b> &nbsp;
                                                {
                                                    course.scholarshipAvailable
                                                        ? <i className="fas fa-check text-success"></i>
                                                        : <i className="fas fa-times text-danger"></i>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            ))
                        }

                    </div>


                    <div className="col-md-4">

                        <img
                            src={`http://localhost:5000/uploads/${photo}`} className="img-thumbnail"
                            alt={name}
                        />

                        <h1 className="text-center my-4">
                            <span className="badge badge-secondary badge-success rounded-circle p-3">
                                {averageRating ? averageRating : 0.0}
                            </span> Rating
                        </h1>

                        <a href="reviews.html" className="btn btn-dark btn-block my-3">
                            <i className="fas fa-comments"></i>&nbsp; Read Reviews
                        </a>

                        <a href="add-review.html" className="btn btn-light btn-block my-3">
                            <i className="fas fa-pencil-alt"></i>&nbsp; Write a Review
                        </a>

                        <a href="#" target="_blank" className="btn btn-secondary btn-block my-3">
                            <i className="fas fa-globe"></i>&nbsp; Visit Website
                        </a>

                        <div id='map' style={{ width: '100%', height: '300px' }}> </div>

                        <ul className="list-group list-group-flush mt-4">

                            <li className="list-group-item">
                                {
                                    housing
                                        ? <i className="fas fa-check text-success"></i>
                                        : <i className="fas fa-times text-danger"></i>
                                }
                                    &nbsp; Housing
                            </li>

                            <li className="list-group-item">
                                {
                                    jobAssistance
                                        ? <i className="fas fa-check text-success"></i>
                                        : <i className="fas fa-times text-danger"></i>
                                }
                                    &nbsp; Job Assistance
                            </li>

                            <li className="list-group-item">
                                {
                                    jobGuarantee
                                        ? <i className="fas fa-check text-success"></i>
                                        : <i className="fas fa-times text-danger"></i>
                                }
                                    &nbsp; Job Guarantee
                            </li>

                            <li className="list-group-item">
                                {
                                    acceptGi
                                        ? <i className="fas fa-check text-success"></i>
                                        : <i className="fas fa-times text-danger"></i>
                                }
                                    &nbsp; Accepts GI Bill
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ShowBootcamp;