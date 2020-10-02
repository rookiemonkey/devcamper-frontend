import styles from '../../styles/confirm.module.css'
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import API_URL, { API_OPTIONS } from '../../api/api';

const Confirm = props => {
    const { response } = props;
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isError, setIsError] = useState('');

    useEffect(() => {
        if (response.success) {
            setIsConfirmed(true)
        }

        else {
            setIsError(response.msg)
        }
    }, [])

    return (
        <main>
            <Head>
                <title>DevCamper - Confirm</title>
            </Head>

            <Navigation />

            <section className={`form mt-5 ${styles.custom_mt}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card bg-white p-4 mb-4">
                                <div className="card-body">

                                    <h1 className="mb-5 text-center">Confirm Account</h1>

                                    {
                                        isConfirmed
                                            ? <h6 className="text-center">Account has been confirmed. Happy Coding! &nbsp; &#127881;</h6>
                                            : !isError
                                                ? <h6 className="text-center">Please wait</h6>
                                                : null
                                    }

                                    {
                                        !isConfirmed && isError
                                            ? <h6 className="text-center">{isError}</h6>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { token } = context.query;

    const options = { ...API_OPTIONS, body: JSON.stringify({ token }) }

    const raw = await fetch(`${API_URL}/api/v1/auth/confirm`, options)
    const parsed = await raw.json();

    return {
        props: { response: parsed }
    }
}


export default Confirm;