import Head from 'next/head'
import { useEffect, useState } from 'react';
import useAuth from '../../../../context/auth';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import ManageCourses from '../../../../components/user/manage_courses';
import API_URL from '../../../../api/api';

const UserCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState({});
    const [bootcamps, setBootcamps] = useState({});

    useEffect(() => {
        if (user && user.success) {
            (async function getUserCourses() {
                const raw = await fetch(`${API_URL}/api/v1/courses?user=${user.currentUser._id}`);
                const parsed = await raw.json();
                setCourses(parsed);
            })();

            (async function getUserBootcamps() {
                const raw = await fetch(`${API_URL}/api/v1/bootcamps?user=${user.currentUser._id}`);
                const parsed = await raw.json();
                setBootcamps(parsed);
            })();
        }
    }, [user])

    return (
        <main>

            <Head>
                <title>DevCamper - Manage Courses</title>
            </Head>

            <Navigation />

            <ManageCourses
                courses={courses}
                bootcamps={bootcamps}
            />

            <Footer />

        </main>
    )
}

export default UserCourses;