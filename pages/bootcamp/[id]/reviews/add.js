import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ReviewBootcampForm from '../../../../components/review/FormAddReviewBootcamp';
import API_URL from '../../../../api/api';

const ReviewBootcamp = props => {
    const { data } = props.bootcamp;

    return (
        <main>

            <Head>
                <title>DevCamper - Add Review</title>
            </Head>

            <Navigation />

            <ReviewBootcampForm
                bootcamp={data}
            />

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context

    const raw = await fetch(`${API_URL}/api/v1/bootcamps/${query.id}`)
    const parsed = await raw.json();

    return {
        props: { bootcamp: parsed }
    }
}

export default ReviewBootcamp;