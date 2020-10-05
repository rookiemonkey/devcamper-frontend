import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import BootcampList from '../../components/bootcamps/index';

const Bootcamps = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Bootcamps</title>
            </Head>

            <Navigation />

            <BootcampList />

            <Footer />

        </main>
    )
}

export default Bootcamps;