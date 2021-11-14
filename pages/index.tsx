import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useSearchQuery } from '../src/generated/graphql'
import styles from '../styles/Home.module.css'
import Search from './search'
import Script from "next/script"

const Home: NextPage = () => {

  return (

    <div className="h100" >
      <Head>
        <title>Properties Collect</title>
        <meta name="description" content="Properties on map" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin="" />
        {/* <Script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                crossOrigin=""
                ></Script> */}
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""></script>
      </Head>

      <main className="h100">
        <Search />
      </main>
    </div>
  )
}

export default Home
