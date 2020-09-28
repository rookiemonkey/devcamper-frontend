import Head from 'next/head'
import Navigation from '../../components/Navigation';
import LoginForm from '../../components/auth/FormLogin';

function Login() {
    return (
        <main>
            <Head>
                <title>DevCamper - Login</title>
            </Head>

            <Navigation />

            <LoginForm />

        </main>
    )
}

export default Login;