import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import Select from 'react-select'
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS_PUT } from '../../api/api';

const EditBootcampForm = props => {

    const careerOptions = [
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Mobile Development', label: 'Mobile Development' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Business', label: 'Business' },
        { value: 'Others', label: 'Others' }
    ]

    const { bootcamp } = props;
    const { user } = useAuth();
    const { error, success, info, dismiss } = useToaster();
    const [name, setName] = useState(bootcamp.name);
    const [address, setAddress] = useState(bootcamp.location.formattedAddress);
    const [phone, setPhone] = useState(bootcamp.phone);
    const [email, setEmail] = useState(bootcamp.email);
    const [website, setWebsite] = useState(bootcamp.website);
    const [description, setDescription] = useState(bootcamp.description);
    const [careers, setCareers] = useState(bootcamp.careers);

    const [careersRef, setCareersRef] = useState(bootcamp.careers.map(career => {
        return careerOptions.filter(option => option.value == career)[0];
    }));

    const [offers, setOffer] = useState({
        housing: bootcamp.housing,
        jobAssistance: bootcamp.jobAssistance,
        jobGuarantee: bootcamp.jobGuarantee,
        acceptGi: bootcamp.acceptGi
    })

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'name': setName(value); break;
            case 'address': setAddress(value); break;
            case 'phone': setPhone(value); break;
            case 'email': setEmail(value); break;
            case 'website': setWebsite(value); break;
            case 'description': setDescription(value); break;
            default: null;
        }
    })

    const handleChangeCheckBox = useCallback(({ target }) => {
        setOffer({ ...offers, [target.name]: !offers[target.name] });
    })

    const handleChangeSelect = useCallback(event => {
        setCareers([...event.map(input => input.value)])
        setCareersRef([...event])
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        API_OPTIONS_PUT.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS_PUT,
            body: JSON.stringify({
                name, address, phone,
                email, website, description,
                careers, ...offers
            })
        }

        const raw = await fetch(`${API_URL}/api/v1/bootcamps/${bootcamp._id}`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        success('Bootcamp succesfully updated!')
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <h1 className="mb-2">Edit Bootcamp</h1>

            <form method="POST" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Location & Contact</h3>
                                <p className="text-muted">
                                    If multiple locations, use the main or largest
								</p>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Bootcamp Name"
                                        onChange={handleChange}
                                        value={name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Full Address"
                                        onChange={handleChange}
                                        value={address}
                                        required
                                    />
                                    <small className="form-text text-muted"
                                    >Street, city, state, etc</small
                                    >
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        value={phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Contact Email"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className="form-control"
                                        placeholder="Website URL"
                                        onChange={handleChange}
                                        value={website}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Other Info</h3>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        rows="5"
                                        className="form-control"
                                        placeholder="Description (What you offer, etc)"
                                        maxLength="500"
                                        onChange={handleChange}
                                        value={description}
                                    ></textarea>
                                    <small className="form-text text-muted"
                                    >No more than 500 characters</small
                                    >
                                </div>
                                <div className="form-group">
                                    <label>Careers</label>
                                    <Select
                                        name="careers"
                                        onChange={handleChangeSelect}
                                        isMulti={true}
                                        options={careerOptions}
                                        value={careersRef}
                                    />
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="housing"
                                        id="housing"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['housing']}
                                    />
                                    <label className="form-check-label" htmlFor="housing">
                                        Housing
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jobAssistance"
                                        id="jobAssistance"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['jobAssistance']}
                                    />
                                    <label className="form-check-label" htmlFor="jobAssistance">
                                        Job Assistance
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jobGuarantee"
                                        id="jobGuarantee"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['jobGuarantee']}
                                    />
                                    <label className="form-check-label" htmlFor="jobGuarantee">
                                        Job Guarantee
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="acceptGi"
                                        id="acceptGi"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['acceptGi']}
                                    />
                                    <label className="form-check-label" htmlFor="acceptGi">
                                        Accepts GI Bill
									</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Bootcamp"
                        className="btn btn-primary btn-block my-4"
                    />
                    <Link href={`/user/${user.currentUser._id}/manage/bootcamps`}>
                        <a className="btn btn-danger btn-block mb-4"
                        >Cancel</a>
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default EditBootcampForm;