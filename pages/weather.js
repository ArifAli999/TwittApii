import { data } from 'autoprefixer';
import { raw } from 'next/dist/build/webpack/loaders/next-middleware-wasm-loader';
import React, {useEffect, useState} from 'react';

function WeatherWidget() {

    const [current, setCurrent] = useState('Newcastle Upon Tyne')
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${current}&appid=b67e4c051d4f655c670794c39bc0a0d3`)
        .then(response => response.json())
        .then(data => setResults(data))

         
    
 

    }, [])
    

  return (
    <div className='p-2 text-black font-bold mr-5 ml-5'>
   
            <p className='text-bold'>City: <span className='text-teal-600'>{results.name}</span></p>
            <p className='text-bold'>Temp: <span className='text-teal-600'>{results.main && results.main.temp}</span></p>

            
  

    </div>
  )
}

export default WeatherWidget