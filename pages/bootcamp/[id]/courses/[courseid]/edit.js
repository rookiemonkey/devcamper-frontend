import Head from 'next/head'
import Navigation from '../../../../../components/Navigation';
import Footer from '../../../../../components/Footer';
import EditCourseForm from '../../../../../components/course/FormEditCourse';
import API_URL from '../../../../../api/api';

const EditCourse = props => {
    const { data } = props.course;

    return (
        <main>

            <Head>
                <title>DevCamper - Edit Course</title>
            </Head>

            <Navigation />

            <EditCourseForm
                course={data}
            />

            <Footer />

        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context

    const raw = await fetch(`${API_URL}/api/v1/courses/${query.courseid}`)
    const parsed = await raw.json();

    return {
        props: { course: parsed }
    }
}

export default EditCourse;