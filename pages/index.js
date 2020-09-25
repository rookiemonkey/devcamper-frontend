import Head from 'next/head'
import Navigation from '../components/Navigation';
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

    </main>
  )
}

export default Home;