import Head from 'next/head'
import Navigation from '../../components/Navigation';
import PasswordResetForm from '../../components/auth/FormPasswordReset';

function PasswordReset() {
    return (
        <main>
            <Head>
                <title>DevCamper - Password Reset</title>
            </Head>

            <Navigation />

            <PasswordResetForm />

        </main>
    )
}

export default PasswordReset;