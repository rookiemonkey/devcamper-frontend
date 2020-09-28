import Head from 'next/head'
import Navigation from '../../../components/Navigation';
import AddCourseForm from '../../../components/course/FormAddCourse';

const AddCourse = () => {

    return (
        <main>

            <Head>
                <title>DevCamper - Add Course</title>
            </Head>

            <Navigation />

            <AddCourseForm />

        </main>
    )
}

export default AddCourse;