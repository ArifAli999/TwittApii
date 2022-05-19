import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Header from '../components/Head';
import Feed from '../components/Feed';
import Maps from './maps';
import WeatherWidget from './weather';



export default function Home() {
  const [statuses, setStatuses] = useState([]);
  const { data: session } = useSession()


  return (
    <><Head>
      <title>Sustainable North East</title>
    </Head>
      <div className='mb-10'>

{/**Here we check if user is logged in, If they are then we display the feed and map else ask them to sign in. */}

        {session &&
          <>

            <Header username={session?.user?.name} />
            <WeatherWidget />

            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-10 md:mr-5 md:ml-5'>

              <Feed />
              <div className='text-bold p-2 '> <Maps /></div>

            </div>


          </>}
        {!session &&
          <>
            <Header username="Guest" />
            <WeatherWidget />
            <div className='container mx-auto mt-20'>
              <h1 className='text-2xl p-2'>Please sign in to view all the features</h1>
            </div>


          </>}
      </div></>
  )



}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}