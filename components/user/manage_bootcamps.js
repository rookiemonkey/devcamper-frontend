import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../../context/auth';

const ManageBootcamps = props => {
    const { user } = useAuth();
    const [bootcamps, setBootcamps] = useState(null);

    useEffect(() => {
        if (props.bootcamps) {
            setBootcamps(props.bootcamps)
        }
    }, [props.bootcamps])

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-4">Manage Bootcamp/s</h1>

                            {
                                bootcamps
                                    ? bootcamps.data.map((bootcamp, ind) => (
                                        <div key={ind} >
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`http://localhost:5000/uploads/${bootcamp.photo}`}
                                                            className="card-img"
                                                            alt={bootcamp.name}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                <Link href={`/bootcamp/${bootcamp._id}`}>
                                                                    <a>
                                                                        {bootcamp.name} &nbsp;
                                                                        <span className="float-right badge badge-success">
                                                                            {bootcamp.averageRating}
                                                                        </span>
                                                                    </a>
                                                                </Link>
                                                            </h5>
                                                            <span className="badge badge-dark mb-2">
                                                                {bootcamp.location.formattedAddress}
                                                            </span>
                                                            <p className="card-text">
                                                                {bootcamp.careers.map(career => `${career}, `)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <form className="mb-4">
                                                <div className="form-group">
                                                    <div className="custom-file">

                                                        <input
                                                            type="file"
                                                            name="photo"
                                                            className="custom-file-input"
                                                            id="photo"
                                                        />
                                                        <label
                                                            className="custom-file-label"
                                                            htmlFor="photo"
                                                        >Add Bootcamp Image</label>

                                                    </div>
                                                </div>
                                                <input
                                                    type="submit"
                                                    className="btn btn-light btn-block"
                                                    value="Upload Image"
                                                />
                                            </form>

                                            <Link href={`/user/${user.currentUser._id}/manage/bootcamp?id=${bootcamp._id}`}>
                                                <a className="btn btn-primary btn-block"
                                                >Edit Bootcamp Details</a>
                                            </Link>

                                            <Link href={`/user/${user.currentUser._id}/manage/courses`}>
                                                <a className="btn btn-secondary btn-block"
                                                >Manage Courses</a>
                                            </Link>

                                            <Link href="#">
                                                <a className="btn btn-danger btn-block"
                                                >Remove Bootcamp</a>
                                            </Link>

                                        </div>
                                    ))

                                    : null
                            }

                            <p className="text-muted mt-5">
                                * Publishers can only add one bootcamp
							</p>

                            <p className="text-muted">
                                * You must be affiliated with the bootcamp in some way in order
                                to add it to DevCamper.
							</p>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ManageBootcamps;