import Head from 'next/head'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Showcase from '../components/index/Showcase';
import Latest from '../components/index/Latest';

function Home() {
  return (
    <main>

      <Head>
        <title>DevCamper - Home</title>
      </Head>

      <Navigation />

      <Showcase />

      <Latest />

      <Footer />

    </main>
  )
}

export default Home;