import Head from 'next/head'
import Navigation from '../../components/Navigation';
import LoginFormOTP from '../../components/auth/FormLoginOTP';

function LoginOTP() {
    return (
        <main>
            <Head>
                <title>DevCamper - Login OTP</title>
            </Head>

            <Navigation />

            <LoginFormOTP />

        </main>
    )
}

export default LoginOTP;