import React, { useEffect, useState } from 'react'
import useSWR,{ useSWRConfig, mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'


const fetcher = (...args) => fetch(...args).then(res => res.json())

function Feed() {
    const { mutate } = useSWRConfig()

    const [statuses, setStatuses] = useState([]);

  

    const { data, error } = useSWRImmutable('/api/twitter/search', fetcher)

    console.log(data)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
            <div className='text-bold md:rounded-full'>
                <div className='bg-teal-500 p-3 flex justify-between align-baseline'>
                    <h2 className='text-stone-50 font-bold uppercase text-base rounded'>Tweets</h2>
                    <span className=''><button className='bg-teal-800 rounded px-2.5 text-teal-100 text-sm py-1' onClick={()=>mutate('/api/twitter/search')}>REFRESH</button></span>
                </div>


                <div className='flex flex-col'>
                {data?.data.map((st) => (
                    <div className='p-0 bg-stone-100 text-black border-b-2 border-teal-200' key={st?.id}>
                       
                       
              <div className='bg-teal-50 p-2'>
                                        <div className=''><p className='text-md text-black'>{st?.user.name}</p></div>

                    
                        <div className='' key={st?.id}>
                        <h2 className='text-stone-500'>{st?.text}</h2>
                       
                        <h1>{st?.place?.full_name} {st?.place?.country}</h1>
             
                        </div>
                      
                
              </div>

                    
                    </div>
                                ))}

                    <div className='p-3 bg-stone-200 text-black border-b-2 border-stone-300'>
                       Tweets:  {data?.data.length}
                    </div>


                </div>
            </div>
           

    )
}

export default Feed