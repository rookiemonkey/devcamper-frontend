import Head from 'next/head'
import Navigation from '../components/Navigation';
import Showcase from '../components/index/Showcase';
import Latest from '../components/index/Latest';

function Home() {
  return (
    <div>
      <Head>
        <title>DevCamper - Home</title>
      </Head>

      <Navigation />

      <Showcase />

      <Latest />

    </div>
  )
}

export default Home;