import React from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import MyModal from '../pages/modal';
import { AiOutlineLogout, AiOutlineLogin} from 'react-icons/ai'

function Header({username}) {
    const { data: session } = useSession()

  return (
    <>
    {session &&
    <div className='bg-black text-white '>
      <ul className='inline-flex w-full items-center'>
        <li className='md:ml-5 font-bold text-left list-none flex-1'>Welcome Back, {username}</li>
        <li className='font-bold list-none text-right mr-2'><button className=' text-white  p-2  font-light cursor-pointer hover:opacity-70 hover:duration-300 transition-all ease-in hover:text-teal-400' onClick={() => signOut()}><AiOutlineLogout size={20}/></button></li>
        <li className='list-none'><MyModal/></li>
        </ul>
    </div>
    }

{!session && 
    <div className='bg-black text-white '>
    <ul className='inline-flex w-full items-center p-4'>
      <li className='md:ml-5 font-bold text-left list-none flex-1'>Welcome back {username}, Please sign in</li>
      <li className='list-none'><button onClick={() => signIn()}><AiOutlineLogin size={20} className="hover:opacity-80 hover:text-teal-500 hover:duration-500 transition-all ease-in "/></button></li>
      </ul>
  </div>
}
</>
    
  )
}

export default Header