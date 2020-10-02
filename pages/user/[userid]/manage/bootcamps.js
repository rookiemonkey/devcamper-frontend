import Head from 'next/head'
import { useEffect, useState } from 'react';
import useAuth from '../../../../context/auth';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ManageBootcamps from '../../../../components/user/manage_bootcamps';
import API_URL from '../../../../api/api';

const UserBootcamps = () => {
    const { user } = useAuth();
    const [bootcamps, setBootcamps] = useState(null);

    useEffect(() => {
        if (user && user.success) {
            (async function getUserBootcamps() {
                const raw = await fetch(`${API_URL}/api/v1/bootcamps?user=${user.currentUser._id}`);
                const parsed = await raw.json();
                setBootcamps(parsed);
            })()
        }
    }, [user])

    return (
        <main>

            <Head>
                <title>DevCamper - Manage Bootcamps</title>
            </Head>

            <Navigation />

            <ManageBootcamps
                bootcamps={bootcamps}
            />

            <Footer />

        </main>
    )
}

export default UserBootcamps;