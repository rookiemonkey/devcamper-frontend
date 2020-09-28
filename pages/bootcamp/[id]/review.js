import Head from 'next/head'
import Navigation from '../../../components/Navigation';
import ReviewBootcampForm from '../../../components/bootcamp/FormReviewBootcamp';

const ReviewBootcamp = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Add Review</title>
            </Head>

            <Navigation />

            <ReviewBootcampForm />

        </main>
    )
}

export default ReviewBootcamp;