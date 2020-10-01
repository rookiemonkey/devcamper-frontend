import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_DELETE } from '../../api/api';
import ManageCoursesNone from './manage_courses_none';

const ManageCourses = props => {
    const { user } = useAuth();
    const { success, info, error, dismiss } = useToaster();
    const [courses, setCourses] = useState({});
    const [bootcamps, setBootcamps] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (props.courses && props.bootcamps) {
            setCourses(props.courses)
            setBootcamps(props.bootcamps)
        }
    }, [props.courses, props.bootcamps])

    useEffect(() => {
        if (Object.keys(bootcamps).length && Object.keys(courses).length) {
            setIsLoaded(true)
        }
    }, [bootcamps, courses])

    const handleDelete = useCallback(async course_id => {
        const infoId = info('Please wait ...')

        API_OPTIONS_DELETE.headers['Authorization'] = `Bearer ${user.token}`;

        const raw = await fetch(`${API_URL}/api/v1/courses/${course_id}`, API_OPTIONS_DELETE);
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Course succesfully deleted!')
    }, [])

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">

                        {
                            isLoaded && courses.data.length === 0
                                ? <ManageCoursesNone bootcamps={bootcamps}/>
                                : <div className="card-body">
                                    <Link href={`/user/${user.currentUser._id}/manage/bootcamps`}>
                                        <a className="btn btn-link text-secondary my-3">
                                            <i className="fas fa-chevron-left"></i>
                                            &nbsp; Manage Bootcamps
                                        </a>
                                    </Link>
                                    <h1 className="mb-4">Manage Courses</h1>

                                    {
                                        isLoaded
                                            ? bootcamps.data.map((bootcamp, ind) => (
                                                <React.Fragment key={ind}>
                                                    <div className="card mb-3">
                                                        <div className="row no-gutters">
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`${API_URL}/uploads/${bootcamp.photo}`} className="card-img"
                                                                    alt={bootcamp.name}
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">
                                                                        <Link href={`/bootcamp/${bootcamp._id}`} >
                                                                            <a>{bootcamp.name}
                                                                                <span
                                                                                    className="float-right badge badge-success"
                                                                                >{bootcamp.averageRating}</span>
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

                                                    <Link href={`/bootcamp/${bootcamp.id}/course`}>
                                                        <a className="btn btn-primary btn-block mb-4">
                                                            Add Bootcamp Course
                                                </a>
                                                    </Link>

                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Title</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                isLoaded && courses.data.length > 0
                                                                    ? courses.data.map((course, ind) => (
                                                                        <tr key={ind}>
                                                                            <td>{course.title}</td>
                                                                            <td>
                                                                                <Link href={`/bootcamp/${bootcamp._id}/${course._id}/edit`}>
                                                                                    <a className="btn btn-secondary float-right mx-1" >
                                                                                        <i className="fas fa-pencil-alt"></i>
                                                                                    </a>
                                                                                </Link>
                                                                                <button
                                                                                    onClick={() => handleDelete(course._id)}
                                                                                    className="btn btn-danger float-right mx-1"
                                                                                ><i className="fas fa-times"></i></button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    : null
                                                            }
                                                        </tbody>
                                                    </table>
                                                </React.Fragment>
                                            ))

                                            : null
                                    }
                                </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ManageCourses;