import Link from 'next/link'

const Latest = props => {
    const { bootcamps } = props;

    return (
        <section className="latest py-5 bg-light">
            <div className="container">
                <h3>Our Latest Bootcamps</h3>
                <div className="card-group">
                    {
                        bootcamps.length > 0
                            ? bootcamps.map((bootcamp, ind) => (
                                <div className="card" key={ind}>

                                    <img src={`${process.env.NEXT_PUBLIC_IMG_SRC}${bootcamp.photo}`} className="card-img-top" alt={bootcamp.name} />

                                    <div className="card-body">

                                        <h5 className="card-title">
                                            <Link href={`/bootcamp/${bootcamp._id}`}>
                                                <a>
                                                    {bootcamp.name}
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
                                            {bootcamp.description}
                                        </p>

                                        <p className="card-text">
                                            <small className="text-muted">
                                                {bootcamp.careers.join(', ')}
                                            </small>
                                        </p>

                                    </div>
                                </div>
                            ))

                            : null
                    }
                </div>
            </div>
        </section>
    )
}

export default Latest;