import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ManagePassword from '../../../../components/user/manage_password';

const UserPassword = () => {
    return (
        <main>
            <Head>
                <title>DevCamper - Password Update</title>
            </Head>

            <Navigation />

            <ManagePassword />

            <Footer />

        </main>
    )
}

export default UserPassword;