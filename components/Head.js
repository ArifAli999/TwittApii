import React from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

function Header({username}) {
    const { data: session } = useSession()

  return (
    <div className='bg-black text-white flex self-center justify-between p-3'>
        <li className='font-bold text-right list-none'>Welcome Back, {username}</li>
        <li className='font-bold list-none'><button className=' text-white bg-purple-500 px-2 rounded font-light cursor-pointer hover:opacity-70 hover:duration-300 transition-all ease-in' onClick={() => signOut()}>Logout</button></li>
    
    </div>

    
  )
}

export default Header