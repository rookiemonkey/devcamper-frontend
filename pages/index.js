import Head from 'next/head'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Showcase from '../components/index/Showcase';
import Latest from '../components/index/Latest';
import API_URL from '../api/api';

const Home = props => {
  const { data } = props.response;

  return (
    <main>

      <Head>
        <title>DevCamper - Home</title>
      </Head>

      <Navigation />

      <Showcase />

      <Latest
        bootcamps={data}
      />

      <Footer />

    </main>
  )
}

export async function getServerSideProps() {
  const raw = await fetch(`${API_URL}/api/v1/bootcamps?limit=3&sort=createdAt`)
  const parsed = await raw.json();

  return {
    props: { response: parsed }
  }
}

export default Home;