import Head from 'next/head'
import Navigation from '../../../../../components/Navigation';
import EditReviewBootcampForm from '../../../../../components/bootcamp/FormEditReviewBootcamp';
import API_URL from '../../../../../api/api';

const ReviewBootcamp = props => {
    const { data } = props.review;

    return (
        <main>

            <Head>
                <title>DevCamper - Edit Review</title>
            </Head>

            <Navigation />

            <EditReviewBootcampForm
                review={data}
            />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context

    const raw = await fetch(`${API_URL}/api/v1/reviews/${query.reviewid}`)
    const parsed = await raw.json();

    return {
        props: { review: parsed }
    }
}

export default ReviewBootcamp;