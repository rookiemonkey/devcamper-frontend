import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useToaster from '../../context/toaster';
import API_URL from '../../api/api';
import BootcampCard from './card';

const BootcampList = () => {
    const { error } = useToaster();
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [bootcamps, setBootcamps] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');
    const [filterOn, setFilterOn] = useState(false);
    const [filteredBootcamps, setFilteredBootcamps] = useState([]);
    const [filterCareer, setFilterCareer] = useState('');
    const [filterRating, setFilterRating] = useState('');
    const [filterBudget, setFilterBudgett] = useState('');
    const [distanceOn, setDistanceOn] = useState(false);
    const [distancedBootcamps, setDistancedBootcamps] = useState([]);
    const [filterMiles, setFilterMiles] = useState('');
    const [filterZipcode, setFilterZipcode] = useState('');

    useEffect(() => {
        (async function () {
            const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10`)
            const parsed = await raw.json();
            setBootcamps(parsed.data);
            setPagination(parsed.pagination);
            setIsLoading(false);
        })()
    }, [])

    const handleChange = useCallback(event => {
        const { value, name } = event.target;

        switch (name) {
            case 'career': setFilterCareer(value); break;
            case 'rating': setFilterRating(value); break;
            case 'budget': setFilterBudgett(value); break;
            case 'miles': setFilterMiles(value); break;
            case 'zipcode': setFilterZipcode(value); break;
            default: return null;
        }

    }, [])

    const handleReset = useCallback(() => {
        setFilterOn(false); setFilterCareer(''); setFilterBudgett('');
        setFilteredBootcamps([]); setFilterRating(''); setFilterQuery('');
        setFilterMiles(''); setFilterZipcode(''); setDistanceOn(false)
    }, [])

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        if (!filterBudget || !filterCareer || !filterRating)
            return error('Please provide at least 1 filter')

        setFilterOn(true); setIsLoading(true);
        setDistanceOn(false); setFilterZipcode('');
        setFilterMiles(''); setDistancedBootcamps([]);

        let query = '?';

        if (filterCareer) query = query + `&careers=${filterCareer}`;
        if (filterRating) query = query + `&averageRating[gte]=${filterRating}`;
        if (filterBudget) query = query + `&averageCost[lte]=${filterBudget}`;

        const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10${query}`)
        const parsed = await raw.json();
        setFilteredBootcamps(parsed.data);
        setPagination(parsed.pagination);
        setFilterQuery(query)
        setIsLoading(false);

    }, [filterCareer, filterRating, filterBudget])

    const handleSubmitDistance = useCallback(async event => {
        event.preventDefault();

        if (!filterMiles || !filterZipcode)
            return error('Please provide all the necessary distance filters')

        setFilterOn(false); setFilteredBootcamps([]);
        setIsLoading(true); setFilterQuery('');
        setFilterCareer(''); setFilterRating('');
        setFilterBudgett(''); setDistanceOn(true)

        const url = `${API_URL}/api/v1/bootcamps/radius/${filterZipcode}/${filterMiles}`;
        const raw = await fetch(url);
        const parsed = await raw.json();

        setDistancedBootcamps(parsed.data);
        setIsLoading(false);
    }, [filterMiles, filterZipcode])

    const handlePagination = useCallback(event => {
        const action = event.target.dataset.action;
        const nextPage = pagination.next ? pagination.next.page : null;
        const prevPage = pagination.prev ? pagination.prev.page : null;
        setIsLoading(true);

        switch (action) {
            case 'previous':
                (async function () {
                    if (filterOn) {
                        const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10&page=${prevPage}${filterQuery}`)
                        const parsed = await raw.json();
                        setFilteredBootcamps(parsed.data);
                        setPagination(parsed.pagination);
                        setIsLoading(false);
                        return null;
                    }

                    const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10&page=${prevPage}`)
                    const parsed = await raw.json();
                    setBootcamps(parsed.data);
                    setPagination(parsed.pagination);
                    setIsLoading(false);
                })()
                break;


            case 'next':
                (async function () {
                    if (filterOn) {
                        const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10&page=${nextPage}${filterQuery}`)
                        const parsed = await raw.json();
                        setFilteredBootcamps(parsed.data);
                        setPagination(parsed.pagination);
                        setIsLoading(false);
                        return null;
                    }

                    const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=10&page=${nextPage}`)
                    const parsed = await raw.json();
                    setBootcamps(parsed.data);
                    setPagination(parsed.pagination);
                    setIsLoading(false);
                })()
                break;


            default: return null;
        }

    }, [pagination])

    return (
        <section className={`browse mt - 5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            onClick={handleReset}
                            type="button"
                            value="Reset"
                            className="btn btn-primary btn-block mb-5"
                        />

                        <h4 className="mb-3">By Location</h4>
                        <form onSubmit={handleSubmitDistance} className="mb-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="miles"
                                            value={filterMiles}
                                            onChange={handleChange}
                                            placeholder="Miles From"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zipcode"
                                            value={filterZipcode}
                                            onChange={handleChange}
                                            placeholder="Enter Zipcode"
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Find by Location"
                                className="btn btn-primary btn-block"
                            />
                        </form>

                        <h4>Filter</h4>
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="form-group">
                                <label> Career</label>
                                <select
                                    value={filterCareer}
                                    onChange={handleChange}
                                    name="career"
                                    className="custom-select mb-2"
                                >
                                    <option value="">Any</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Business">Business</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label> Rating</label>
                                <select
                                    value={filterRating}
                                    onChange={handleChange}
                                    name="rating"
                                    className="custom-select mb-2"
                                >
                                    <option value="">Any</option>
                                    <option value="9">9+</option>
                                    <option value="8">8+</option>
                                    <option value="7">7+</option>
                                    <option value="6">6+</option>
                                    <option value="5">5+</option>
                                    <option value="4">4+</option>
                                    <option value="3">3+</option>
                                    <option value="2">2+</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label> Budget</label>
                                <select
                                    value={filterBudget}
                                    onChange={handleChange}
                                    name='budget'
                                    className="custom-select mb-2"
                                >
                                    <option value="">Any</option>
                                    <option value="20000">$20,000</option>
                                    <option value="15000">$15,000</option>
                                    <option value="10000">$10,000</option>
                                    <option value="8000">$8,000</option>
                                    <option value="6000">$6,000</option>
                                    <option value="4000">$4,000</option>
                                    <option value="2000">$2,000</option>
                                </select>
                            </div>
                            <input
                                type="submit"
                                value="Find by Filter"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>

                    <div className="col-md-8">

                        {
                            !isLoading
                                ? filterOn && !distanceOn
                                    ? filteredBootcamps.map((bootcamp, ind) =>
                                        <BootcampCard key={ind} bootcamp={bootcamp} />
                                    )

                                    : distanceOn
                                        ? distancedBootcamps.map((bootcamp, ind) =>
                                            <BootcampCard key={ind} bootcamp={bootcamp} />
                                        )
                                        : bootcamps.map((bootcamp, ind) =>
                                            <BootcampCard key={ind} bootcamp={bootcamp} />
                                        )

                                : <h1>Loading... Please wait</h1>
                        }


                        <nav aria-label="Page navigation example">
                            <ul className="pagination">

                                {
                                    pagination.prev && !distanceOn
                                        ? <li className="page-item" onClick={handlePagination}>
                                            <span className="page-link" data-action='previous' >Previous</span>
                                        </li>
                                        : null
                                }

                                {
                                    pagination.msg && !pagination.prev && !pagination.next && !distanceOn
                                        ? <li className="page-item" onClick={handlePagination}>
                                            <span className="page-link" data-action='previous' >Go to Page 1</span>
                                        </li>
                                        : null
                                }

                                {
                                    pagination.next && !distanceOn
                                        ? <li className="page-item" onClick={handlePagination}>
                                            <span className="page-link" data-action='next' >Next</span>
                                        </li>
                                        : null
                                }

                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default BootcampList;