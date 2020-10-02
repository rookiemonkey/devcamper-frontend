import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import ManagePassword from '../../../../components/user/manage_password';

const UserPassword = () => {
    return (
        <main>
            <Head>
                <title>DevCamper - Password Update</title>
            </Head>

            <Navigation />

            <ManagePassword />

        </main>
    )
}

export default UserPassword;