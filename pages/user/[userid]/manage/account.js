import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ManageAccount from '../../../../components/user/manage_account';

const UserAccount = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Manage Account</title>
            </Head>

            <Navigation />

            <ManageAccount />

            <Footer />

        </main>
    )
}

export default UserAccount;