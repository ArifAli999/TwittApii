import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { useRef } from 'react';
import { getToken } from 'next-auth/jwt';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineSend } from 'react-icons/ai'

export default function MyModal() {
  const { data: session } = useSession()

  let [isOpen, setIsOpen] = useState(false);
  const [tweet, setTweet] = useState('');
  const nameForm = useRef(null)


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    
 
   
  }
  
  const myPromise  = () => {
    
    const form = nameForm.current
  fetch("api/twitter/post", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form['firstname'].value)
  })
    .then((response) => response.json())
    .then((response) => {
      toast('Success')

      
    })
    setIsOpen(false)
    
  
    // setTimeout just for the example , cause it will load quickly without it .
  }
  

  const handleClickEvent = (e) => {
    e.preventDefault();
    const form = nameForm.current
    console.log(form['firstname'].value)

    if (form['firstname'].value) {
      fetch('api/twitter/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form['firstname'].value)
      })
   toast('he')
      setIsOpen(false)
     

    }
    else {
      

    }
    
  }

  return (
    <>
    
        <button
          type="button"
          onClick={openModal}
          className=" p-2 mr-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:opacity-60 hover:text-teal-400 duration-500 transition all ease-in"
        >
         <AiOutlineSend size={20}/>
        </button>
      
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
           
          />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
         
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center bg-opacity-10">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-teal-500"
                  >
                    POST A TWEET
                  </Dialog.Title>
                  <form ref={nameForm}>
                    <div className="mt-2">
                      <textarea className="text-sm text-teal-100 w-full h-full border-2 border-teal-500 p-2 rounded mt-5 mb-4 bg-black focus:border-teal-500 focus:ring-teal-500 focus:ring-3 "
                        name={'firstname'} placeholder="Type your tweet!">
                        
                      </textarea>
                    </div>

                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        className="inline-flex justify-center  border-2 border-teal-500 bg-transparent px-4 py-2 text-sm font-medium text-teal-300 hover:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={myPromise}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}