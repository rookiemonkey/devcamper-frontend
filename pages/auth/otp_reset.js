import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import OTPResetForm from '../../components/auth/FormOTPReset';

function LoginOTP() {
    return (
        <main>
            <Head>
                <title>DevCamper - OTP Reset</title>
            </Head>

            <Navigation />

            <OTPResetForm />

            <Footer />

        </main>
    )
}

export default LoginOTP;    