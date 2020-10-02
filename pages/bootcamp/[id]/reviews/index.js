import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import Reviews from '../../../../components/review/ShowReviews';
import API_URL from '../../../../api/api';

const BootcampReviews = props => {
    const { reviews, bootcamp } = props;

    return (
        <main>

            <Head>
                <title>DevCamper - Reviews</title>
            </Head>

            <Navigation />

            <Reviews
                bootcamp={bootcamp}
                reviews={reviews}
            />

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context

    const bootcamp = await fetch(`${API_URL}/api/v1/bootcamps/${query.id}`)
    const parsedBootcamps = await bootcamp.json();

    const reviews = await fetch(`${API_URL}/api/v1/bootcamps/${query.id}/reviews`)
    const parsedReviews = await reviews.json();

    return {
        props: {
            reviews: parsedReviews,
            bootcamp: parsedBootcamps
        }
    }
}

export default BootcampReviews;