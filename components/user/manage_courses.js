import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_DELETE } from '../../api/api';
import ManageCoursesNone from './manage_courses_none';

const ManageCourses = props => {
    const router = useRouter();
    const { user } = useAuth();
    const { info, error, dismiss } = useToaster();
    const [userId, setUserId] = useState('');
    const [courses, setCourses] = useState({});
    const [bootcamps, setBootcamps] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setUserId(user.currentUser._id);

        if (props.courses && props.bootcamps) {
            setCourses(props.courses)
            setBootcamps(props.bootcamps)
        }
    }, [props.courses, props.bootcamps, user])

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

        router.reload();
    }, [])

    const handleImageError = useCallback(event => {
        event.target.onerror = null;
        event.target.src = `${process.env.NEXT_PUBLIC_IMG_SRC}no-photo.png`
    }, [])

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">

                        {
                            isLoaded && courses.data.length === 0
                                ? <ManageCoursesNone bootcamps={bootcamps} />
                                : <div className="card-body">
                                    <Link href={`/user/${userId}/manage/bootcamps`}>
                                        <a className="btn btn-link text-secondary my-3">
                                            <i className="fas fa-chevron-left"></i>
                                            &nbsp; Manage Bootcamps
                                        </a>
                                    </Link>
                                    <h1 className="mb-4">Manage Courses</h1>

                                    {
                                        isLoaded
                                            ? bootcamps.data.map((bootcamp, ind) => (
                                                <article key={ind} className="mb-5">
                                                    <div className="card mb-3">
                                                        <div className="row no-gutters">
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_IMG_SRC}${bootcamp.photo}`}
                                                                    className="card-img"
                                                                    onError={handleImageError}
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
                                                                        {`${bootcamp.location.city}, ${bootcamp.location.country}`}
                                                                    </span>
                                                                    <p className="card-text">
                                                                        {bootcamp.careers.map(career => `${career}, `)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link href={`/bootcamp/${bootcamp.id}/courses/add`}>
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
                                                                                <Link href={`/bootcamp/${bootcamp._id}/courses/${course._id}/edit`}>
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
                                                </article>
                                            ))

                                            : <div className="manage_loader_container">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
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