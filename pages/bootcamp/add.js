import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AddBootcampForm from '../../components/bootcamp/FormAddBootcamp';

const AddBootcamp = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Add Bootcamp</title>
            </Head>

            <Navigation />

            <AddBootcampForm />

            <Footer />

        </main>
    )
}

export default AddBootcamp;