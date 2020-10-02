import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import LoginFormOTP from '../../components/auth/FormLoginOTP';

function LoginOTP() {
    return (
        <main>
            <Head>
                <title>DevCamper - Login OTP</title>
            </Head>

            <Navigation />

            <LoginFormOTP />

            <Footer />

        </main>
    )
}

export default LoginOTP;