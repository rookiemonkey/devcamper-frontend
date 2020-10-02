import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import BootcampList from '../../components/bootcamps/index';
import API_URL from '../../api/api';

const Bootcamps = props => {
    const { data } = props.response;

    return (
        <main>

            <Head>
                <title>DevCamper - Bootcamps</title>
            </Head>

            <Navigation />

            <BootcampList
                bootcamps={data}
            />

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context

    const raw = await fetch(`${API_URL}/api/v1/bootcamps`)
    const parsed = await raw.json();

    return {
        props: { response: parsed }
    }
}

export default Bootcamps;