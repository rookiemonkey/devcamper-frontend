import Head from 'next/head'
import Navigation from '../../components/Navigation';
import PasswordUpdateForm from '../../components/auth/FormPasswordUpdate';

function PasswordUpdate() {
    return (
        <main>
            <Head>
                <title>DevCamper - Password Update</title>
            </Head>

            <Navigation />

            <PasswordUpdateForm />

        </main>
    )
}

export default PasswordUpdate;