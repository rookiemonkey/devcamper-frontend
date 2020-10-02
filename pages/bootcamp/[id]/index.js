import Head from 'next/head'
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import ShowBootcamp from '../../../components/bootcamp/ShowBootcamp';
import API_URL from '../../../api/api';

const Bootcamp = props => {
    const { data } = props.bootcamp;
    return (
        <main>

            <Head>
                <title>DevCamper - {data.name}</title>
            </Head>

            <Navigation />

            <ShowBootcamp
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

export default Bootcamp