import styles from '../../styles/forms.module.css';
import { useState, useCallback } from 'react';
import Select from 'react-select'
import useAuth from '../../context/auth'

const AddCourseForm = () => {
    const AuthContext = useAuth();
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const [tuition, setTuition] = useState(0);
    const [description, setDescription] = useState('');
    const [minimumSkills, setMinimumSkills] = useState('');
    const [minimumSkillsRef, setMinimumSkillsRef] = useState({});
    const [scholarshipAvailable, setScholarshipAvailable] = useState({
        scholarshipAvailable: false,
    })

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'title': setTitle(value); break;
            case 'duration': setDuration(parseInt(value)); break;
            case 'tuition': setTuition(parseInt(value)); break;
            case 'description': setDescription(value); break;
            default: null;
        }
    })

    const handleChangeCheckBox = useCallback(({ target }) => {
        setScholarshipAvailable({ scholarshipAvailable: !scholarshipAvailable['scholarshipAvailable'] });
    })

    const handleChangeSelect = useCallback(event => {
        setMinimumSkills(event.value)
        setMinimumSkillsRef(event)
    })

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        alert('Subitted')
    })

    const minimumSkillsOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ]

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <a
                                href="manage-courses.html"
                                className="btn btn-link text-secondary my-3"
                            ><i className="fas fa-chevron-left"></i> Manage Courses</a
                            >
                            <h1 className="mb-2">DevWorks Bootcamp</h1>
                            <h3 className="text-primary mb-4">Add Course</h3>
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
                                        name="duration"
                                        placeholder="Duration"
                                        className="form-control"
                                        value={duration}
                                        onChange={handleChange}
                                    />
                                    <small className="form-text text-muted"
                                    >Enter number of weeks course lasts</small
                                    >
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
                                        value={minimumSkillsRef}
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
                                    <small className="form-text text-muted"
                                    >No more than 500 characters</small
                                    >
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddCourseForm;