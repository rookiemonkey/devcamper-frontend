import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_DELETE, API_OPTIONS_PUT } from '../../api/api';
import ManageBootcampsNone from './manage_bootcamps_none';

const ManageBootcamps = props => {
    const router = useRouter();
    const { user } = useAuth();
    const { error, info, dismiss } = useToaster();
    const [bootcamps, setBootcamps] = useState(null);
    const [upload, setUpload] = useState(null);

    useEffect(() => {
        if (props.bootcamps) {
            setBootcamps(props.bootcamps)
        }
    }, [props.bootcamps])

    const handleDelete = useCallback(async bootcamp_id => {
        const infoId = info('Please wait ...');

        API_OPTIONS_DELETE.headers['Authorization'] = `Bearer ${user.token}`;

        const raw = await fetch(`${API_URL}/api/v1/bootcamps/${bootcamp_id}`, API_OPTIONS_DELETE);
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Successfully deleted the bootcamp!')
        setTimeout(() => router.reload(), 2000)
    }, [])

    const handeChangeUpload = useCallback(event => setUpload(event.target.files[0]))

    const handleUpload = useCallback(async bootcamp_id => {
        const infoId = info('Please wait ...');

        const formData = new FormData()
        formData.append('file', upload)

        const options = {
            ...API_OPTIONS_PUT,
            headers: { "Authorization": `Bearer ${user.token}` },
            body: formData
        }

        const raw = await fetch(`${API_URL}/api/v1/bootcamps/${bootcamp_id}/photo`, options);
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Successfully deleted the bootcamp!')
        setTimeout(() => router.reload(), 2000)
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-4">Manage Bootcamp/s</h1>

                            {
                                bootcamps && bootcamps.data.length > 0
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
                                                                {`${bootcamp.location.city}, ${bootcamp.location.country}`}
                                                            </span>
                                                            <p className="card-text">
                                                                {bootcamp.careers.map(career => `${career}, `)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <form
                                                className="mb-4"
                                                onSubmit={event => {
                                                    event.preventDefault();
                                                    handleUpload(bootcamp._id);
                                                }}
                                                encType="multipart/form-data"
                                            >
                                                <div className="form-group">
                                                    <div className="custom-file">

                                                        <input
                                                            type="file"
                                                            name="photo"
                                                            className="custom-file-input"
                                                            id="photo"
                                                            accept="image/*"
                                                            onChange={handeChangeUpload}
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

                                            <Link href={`/bootcamp/${bootcamp._id}/edit`}>
                                                <a className="btn btn-primary btn-block"
                                                >Edit Bootcamp Details</a>
                                            </Link>

                                            <Link href={`/user/${user.currentUser._id}/manage/courses`}>
                                                <a className="btn btn-secondary btn-block"
                                                >Manage Courses</a>
                                            </Link>

                                            <a
                                                onClick={() => { handleDelete(bootcamp._id) }}
                                                className="btn btn-danger btn-block"
                                            >Remove Bootcamp</a>

                                        </div>
                                    ))

                                    : <ManageBootcampsNone />
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