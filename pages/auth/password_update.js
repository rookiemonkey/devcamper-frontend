import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import PasswordUpdateForm from '../../components/auth/FormPasswordUpdate';

function PasswordUpdate() {
    return (
        <main>
            <Head>
                <title>DevCamper - Password Update</title>
            </Head>

            <Navigation />

            <PasswordUpdateForm />

            <Footer />

        </main>
    )
}

export default PasswordUpdate;