import Head from 'next/head'
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer'
import AddCourseForm from '../../../../components/course/FormAddCourse';
import API_URL from '../../../../api/api';

const AddCourse = props => {
    const { data } = props.bootcamp;

    return (
        <main>

            <Head>
                <title>DevCamper - Add Course</title>
            </Head>

            <Navigation />

            <AddCourseForm
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

export default AddCourse;