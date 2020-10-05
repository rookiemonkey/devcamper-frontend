import styles from '../styles/footer.module.css';

const Footer = () => {

    return (
        <footer className="page-footer font-small teal pt-4">
            <div className={`container-fluid text-center text-md-left ${styles.upper_row}`}>
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3 p-5">

                        <h5 className="text-uppercase font-weight-bold">Our Vision</h5>

                        <p>
                            Find, rate and read reviews on coding bootcamps. Learn how to code, how to develop web applications and how to elevate your career with the wide variety of bootcamp across the nation
                        </p>

                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-6 mb-md-0 mb-3 p-5">

                        <h5 className="text-uppercase font-weight-bold">Our Mission</h5>

                        <p>
                            Find, rate and read reviews on coding bootcamps. Learn how to code, how to develop web applications and how to elevate your career with the wide variety of bootcamp across the nation
                        </p>

                    </div>
                </div>
            </div>

            <div className={`footer-copyright text-center py-3 ${styles.lower_row}`}>
                © {new Date().getFullYear()} Copyright &nbsp; | &nbsp; <i className="fas fa-laptop-code"></i> &nbsp; DevCamper
            </div>

        </footer>
    )
}

export default Footer;