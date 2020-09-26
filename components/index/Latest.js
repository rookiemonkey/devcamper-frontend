import Link from 'next/link'
const Latest = () => {

    return (
        <section className="latest py-5 bg-light">
            <div className="container">
                <h3>Latest Bootcamps</h3>
                <div className="card-group">
                    <div className="card">
                        <img src="/images/image_1.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link href="/">
                                    <a>
                                        Devworks Bootcamp
								        <span className="float-right badge badge-success">8.8</span>
                                    </a>
                                </Link>
                            </h5>
                            <span className="badge badge-dark mb-2">Boston, MA</span>
                            <p className="card-text">
                                Devworks is a full stack JavaScript Bootcamp located in the
                                heart of Boston that focuses on the technologies you need to get
                                a high paying job as a web developer
						</p>
                            <p className="card-text">
                                <small className="text-muted">Web Development, UI/UX, Mobile Development</small>
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/images/image_2.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link href="/">
                                    <a>
                                        ModernTech Bootcamp
								        <span className="float-right badge badge-success">7.5</span>
                                    </a>
                                </Link>
                            </h5>
                            <span className="badge badge-dark mb-2">Boston, MA</span>
                            <p className="card-text">
                                ModernTech has one goal, and that is to make you a rockstar
                                developer and/or designer with a six figure salary. We teach
                                both development and UI/UX
						</p>
                            <p className="card-text">
                                <small className="text-muted">Web Development, UI/UX, Mobile Development</small>
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/images/image_3.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link href="/">
                                    <a>
                                        Codemasters
								        <span className="float-right badge badge-success">9.2</span>
                                    </a>
                                </Link>
                            </h5>
                            <span className="badge badge-dark mb-2">Burlington, VT</span>
                            <p className="card-text">
                                Is coding your passion? Codemasters will give you the skills and
                                the tools to become the best developer possible. We specialize
                                in full stack web development and data science
						</p>
                            <p className="card-text">
                                <small className="text-muted">Web Development, Data Science, Marketing</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Latest;