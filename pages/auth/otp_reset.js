import Head from 'next/head'
import Navigation from '../../components/Navigation';
import OTPResetForm from '../../components/auth/FormOTPReset';

function LoginOTP() {
    return (
        <main>
            <Head>
                <title>DevCamper - OTP Reset</title>
            </Head>

            <Navigation />

            <OTPResetForm />

        </main>
    )
}

export default LoginOTP;    