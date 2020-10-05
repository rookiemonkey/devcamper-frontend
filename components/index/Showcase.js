import styles from '../../styles/index.module.css';

const Showcase = () => {

    return (
        <section className={styles.showcase}>
            <div className={styles.dark_overlay}>
                <div className={`${styles.showcase_inner} container`}>
                    <h1 className="display-4">Find a Coding Bootcamp</h1>
                    <p className="lead">
                        Find, rate and read reviews on coding bootcamps. Learn how to code, how to develop web applications and how to elevate your career with the wide variety of bootcamp across the nation
				    </p>
                </div>
            </div>
        </section >
    )
}

export default Showcase