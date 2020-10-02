import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import RegisterForm from '../../components/auth/FormRegister';

function Register() {
    return (
        <main>
            <Head>
                <title>DevCamper - Register</title>
            </Head>

            <Navigation />

            <RegisterForm />

            <Footer />

        </main>
    )
}

export default Register;