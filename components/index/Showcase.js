import styles from '../../styles/index.module.css';

const Showcase = () => {

    return (
        <section className={styles.showcase}>
            <div className={styles.dark_overlay}>
                <div className={`${styles.showcase_inner} container`}>
                    <h1 className="display-4">Find a Code Bootcamp</h1>
                    <p className="lead">
                        Find, rate and read reviews on coding bootcamps
				    </p>

                    <form action="bootcamps.html">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="miles" placeholder="Miles From" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="zipcode" placeholder="Enter Zipcode" />
                                </div>
                            </div>
                        </div>
                        <input type="submit" value="Find Bootcamps" className="btn btn-primary btn-block" />
                    </form>

                </div>
            </div>
        </section >
    )
}

export default Showcase