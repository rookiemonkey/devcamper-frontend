import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const EditCourseForm = props => {
    const { course } = props;
    const { user } = useAuth();
    const { success, info, error, dismiss } = useToaster();
    const [title, setTitle] = useState(course.title);
    const [weeks, setWeeks] = useState(course.weeks);
    const [tuition, setTuition] = useState(course.tuition);
    const [description, setDescription] = useState(course.description);
    const [minimumSkill, setMinimumSkill] = useState(course.minimumSkill);
    const [minimumSkillRef, setMinimumSkillRef] = useState({
        value: course.minimumSkill,
        label: course.minimumSkill
    });
    const [scholarshipAvailable, setScholarshipAvailable] = useState({
        scholarshipAvailable: course.scholarshipAvailable,
    })

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'title': setTitle(value); break;
            case 'weeks': setWeeks(parseInt(value)); break;
            case 'tuition': setTuition(parseInt(value)); break;
            case 'description': setDescription(value); break;
            default: null;
        }
    })

    const handleReset = useCallback(() => {
        setTitle(course.title); setWeeks(course.weeks);
        setTuition(course.tuition); setDescription(course.description);
        setScholarshipAvailable({ scholarshipAvailable: course.scholarshipAvailable })
        setMinimumSkill(course.minimumSkill); setMinimumSkillRef({
            value: course.minimumSkill,
            label: course.minimumSkill
        })
    })

    const handleChangeCheckBox = useCallback(() => {
        setScholarshipAvailable({ scholarshipAvailable: !scholarshipAvailable['scholarshipAvailable'] });
    })

    const handleChangeSelect = useCallback(event => {
        setMinimumSkill(event.value)
        setMinimumSkillRef(event)
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const infoId = info('Please wait ...')

        API_OPTIONS_PUT.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({
                title, weeks, tuition, description,
                minimumSkill, ...scholarshipAvailable
            })
        }

        const raw = await fetch(`${API_URL}/api/v1/courses/${course._id}`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Course succesfully updated!')
    })

    const minimumSkillsOptions = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' },
    ]

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <Link href={`/user/${user.currentUser._id}/manage/courses`}>
                                <a className="btn btn-link text-secondary my-3">
                                    <i className="fas fa-chevron-left"></i>
                                    &nbsp; Manage Courses
                                </a>
                            </Link>
                            <h1 className="mb-2">DevWorks Bootcamp</h1>
                            <h3 className="text-primary mb-4">Edit Course</h3>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="form-group">
                                    <label>Course Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Title"
                                        value={title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input
                                        type="number"
                                        name="weeks"
                                        placeholder="Duration"
                                        className="form-control"
                                        value={weeks}
                                        onChange={handleChange}
                                    />
                                    <small
                                        className="form-text text-muted"
                                    >Enter number of weeks course lasts</small>
                                </div>
                                <div className="form-group">
                                    <label>Course Tuition</label>
                                    <input
                                        type="number"
                                        name="tuition"
                                        placeholder="Tuition"
                                        className="form-control"
                                        value={tuition}
                                        onChange={handleChange}
                                    />
                                    <small className="form-text text-muted">USD Currency</small>
                                </div>
                                <div className="form-group">
                                    <label>Minimum Skill Required</label>
                                    <Select
                                        name="minimumSkill"
                                        onChange={handleChangeSelect}
                                        options={minimumSkillsOptions}
                                        value={minimumSkillRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="description"
                                        rows="5"
                                        className="form-control"
                                        placeholder="Course description summary"
                                        maxLength="500"
                                        onChange={handleChange}
                                        value={description}
                                    ></textarea>
                                    <small
                                        className="form-text text-muted"
                                    >No more than 500 characters</small>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="scholarshipAvailable"
                                        id="scholarshipAvailable"
                                        onChange={handleChangeCheckBox}
                                        checked={scholarshipAvailable['scholarshipAvailable']}
                                    />
                                    <label className="form-check-label" htmlFor="scholarshipAvailable">
                                        Scholarship Available
									</label>
                                </div>
                                <div className="form-group mt-4">
                                    <input
                                        type="submit"
                                        value="Add Course"
                                        className="btn btn-dark btn-block"
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <input
                                        type="button"
                                        value="Reset"
                                        className="btn btn-primary btn-block"
                                        onClick={handleReset}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditCourseForm;