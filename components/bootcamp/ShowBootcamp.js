import styles from '../../styles/forms.module.css';
import bootcamp from '../../styles/bootcamp.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import formatPrice from '../../utilities/formatPrice';

const ShowBootcamp = props => {
    const mapContainer = useRef(null)
    const { _id, name, jobAssistance, jobGuarantee, housing, acceptGi,
        location, careers, photo, phone, email, website, description,
        averageCost, courses, averageRating
    } = props.bootcamp;
    const [lat, setLat] = useState(location.coordinates[1]);
    const [lng, setLng] = useState(location.coordinates[0]);
    const [zoom, setZoom] = useState(11);

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9va2llbW9ua2V5IiwiYSI6ImNrZnJ1MWExZjByeDcycW9mNTd1YmN6NG8ifQ.BdBqYIaXR6PnyVjKPvmZyQ';

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: zoom,
            center: [lng, lat],
            interactive: true
        });

        new mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setHTML(`<h6>${name}</h6>`)
            .addTo(map)

        map.on('move', () => {
            setLng(map.getCenter().lat.toFixed(4));
            setLat(map.getCenter().lng.toFixed(4));
            setZoom(map.getZoom().toString(2))
        });

    }, [mapContainer]);

    return (
        <React.Fragment>
            <Head>
                <link href='/vendors/mapbox-gl.css' rel='stylesheet' />
            </Head>
            <section className={`bootcamp mt-5 ${styles.custom_mt}`}>
                <div className="container">
                    <div className="row">

                        <div className="col-md-8">
                            <h1>{name}</h1>

                            <p className={`lead my-2 ${bootcamp.bootcamp_meta}`}>
                                <i className="fas fa-money-bill-wave-alt text-success"></i> &nbsp;
                            <span className="text-primary">
                                    {
                                        averageCost
                                            ? `$${formatPrice(averageCost)} (Average)`
                                            : <i>'No existing course'</i>
                                    }
                                </span>
                            </p>

                            <p className={`lead my-2 ${bootcamp.bootcamp_meta}`}>
                                <i className="fas fa-envelope text-warning"></i> &nbsp;
                            <span className="text-primary">
                                    {email}
                                </span>
                            </p>

                            <p className={`lead my-2 ${bootcamp.bootcamp_meta}`}>
                                <i className="fas fa-phone text-secondary"></i> &nbsp;
                            <span className="text-primary">
                                    {phone}
                                </span>
                            </p>

                            <p className={`lead my-2 ${bootcamp.bootcamp_meta}`}>
                                <i className="fas fa-map-marker-alt text-danger"></i> &nbsp;
                            <span className="text-primary">
                                    {location.formattedAddress}
                                </span>
                            </p>

                            <p className={`lead my-2 ${bootcamp.bootcamp_meta}`}>
                                <i className="far fa-hand-paper text-info"></i> &nbsp;
                            <span className="text-primary">
                                    {careers.join(', ')}
                                </span>
                            </p>

                            <p className="my-3">{description}</p>

                            {
                                courses.length > 0
                                    ? courses.map((course, ind) => (
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
                                    : null
                            }

                        </div>


                        <div className="col-md-4">

                            <img
                                src={`${process.env.NEXT_PUBLIC_IMG_SRC}${photo}`} className="img-thumbnail"
                                alt={name}
                            />

                            <h1 className="text-center my-4">
                                <span className="badge badge-secondary badge-success rounded-circle p-3">
                                    {averageRating ? parseFloat(averageRating) : '0.0'}
                                </span> &nbsp; Rating
                        </h1>

                            <Link href={`/bootcamp/${_id}/reviews/`}>
                                <a className="btn btn-dark btn-block my-3">
                                    <i className="fas fa-comments"></i> &nbsp; Read Reviews
                            </a>
                            </Link>

                            <Link href={`/bootcamp/${_id}/reviews/add`}>
                                <a className="btn btn-light btn-block my-3">
                                    <i className="fas fa-pencil-alt"></i> &nbsp; Write a Review
                            </a>
                            </Link>

                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary btn-block my-3"
                            >
                                <i className="fas fa-globe"></i> &nbsp; Visit Website
                        </a>

                            <div
                                id='map'
                                ref={mapContainer}
                                style={{ width: '100%', height: '300px' }}
                            ></div>

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
        </React.Fragment>
    )
}

export default ShowBootcamp;