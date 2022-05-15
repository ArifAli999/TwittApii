import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Header from '../components/Head';
import { GoogleMap, LoadScript, Marker , ScriptLoaded} from '@react-google-maps/api';
import Feed from '../components/Feed';
import Maps from './maps';



export default function Home() {
  const [statuses, setStatuses] = useState([]);
  const { data: session } = useSession()
  const [cords, setCords] = useState([]);







  const position = {
    lat: 37.772,
    lng: -122.214
  }
  




  return (
    <div className='mb-10'>
      {
        session &&
        <>

          <Header username={session?.user?.name}/>
         
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-10 md:mr-5 md:ml-5'>

         <Feed/>
         <div className='text-bold p-2 bg-red-500'> <Maps/></div>
         
         </div>
           

          </>

      }
      {!session &&
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>}
    </div>
  )



}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}