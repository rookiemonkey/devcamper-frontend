import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ManageReviews from '../../../../components/user/manage_reviews';
import API_URL from '../../../../api/api';

const UserReviews = props => {
    const { response } = props;

    return (
        <main>

            <Head>
                <title>DevCamper - Manage Reviews</title>
            </Head>

            <Navigation />

            <ManageReviews
                reviews={response}
            />

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const raw = await fetch(`${API_URL}/api/v1/reviews`)
    const parsed = await raw.json();

    return {
        props: { response: parsed }
    }
}

export default UserReviews;