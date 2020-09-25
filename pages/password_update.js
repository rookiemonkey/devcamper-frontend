import Head from 'next/head'
import Navigation from '../components/Navigation';
import PasswordUpdateForm from '../components/password_update/form';

function PasswordUpdate() {
    return (
        <main>
            <Head>
                <title>DevCamper - Login</title>
            </Head>

            <Navigation />

            <PasswordUpdateForm />

        </main>
    )
}

export default PasswordUpdate;