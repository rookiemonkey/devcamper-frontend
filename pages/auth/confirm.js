import styles from '../../styles/confirm.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navigation from '../../components/Navigation';
import toasterConfiguration from '../../components/_toaster';
import API_URL, { API_OPTIONS } from '../../api/api';

function Confirm() {
    const router = useRouter()
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isError, setIsError] = useState('');

    const info = message => toast.info(message, toasterConfiguration);
    const success = message => toast.success(message, toasterConfiguration);
    const error = message => toast.error(message, toasterConfiguration);

    useEffect(() => {
        async function confirm() {
            const { token } = router.query
            console.log(token)
            if (!token) {
                setIsError('Something went wrong. You token is invalid')
                return error('Invalid Token')
            }

            const infoId = info('Please wait ...')
            const options = { ...API_OPTIONS, body: JSON.stringify({ token }) }

            const raw = await fetch(`${API_URL}/api/v1/auth/confirm`, options)
            const parsed = await raw.json();
            toast.dismiss(infoId)

            if (!parsed.success) {
                setIsError('Something went wrong. You token is invalid')
                return error('Invalid Token')
            }

            setIsConfirmed(true)
            success('Account has been confirmed. Happy Coding!')
        }

        confirm()
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

                                    <ToastContainer />

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

        </main>
    )
}

export default Confirm;