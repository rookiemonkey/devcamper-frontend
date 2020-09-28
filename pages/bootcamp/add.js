import Head from 'next/head'
import Navigation from '../../components/Navigation';
import AddBootcampForm from '../../components/bootcamp/FormAdd';

const AddBootcamp = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Add Bootcamp</title>
            </Head>

            <Navigation />

            <AddBootcampForm />

        </main>
    )
}

export default AddBootcamp;