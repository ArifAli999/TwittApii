import React from 'react'
import Header from '../components/Head'
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'




function About() {
    const { data: session } = useSession()
  return (
    <div>
        <Header username={session?.user?.name}/>

        <div className='container mx-auto mt-10 bg-black p-4 mb-10'>
        <h3 className='text-bold text-white text-lg text-center'>About</h3>

        <p className='text-stone-50 text-base mt-5 p-2'>
            This is a web application built using modern web technologies and frameworks such as NextJS & React.
            This application is also using the Google Maps Javascript API & Twitter API.
            This application provides full 3 legged OAuth for users to login with their twitter account.
            This functionality was implemented and developed by using a special nextJS authentication library known as Next-Auth (<a href="https://next-auth.js.org/" className='text-pink-500 hover:opacity-70'>See more</a>)
            <br/>
            There was no particular need to use jQuery as taught in the coursework due to using a more modern JavaScript framework which is capable of doing all that, This made things a lot more easier and organized. 
            <br/> <br/>
            The authentication setup can be found in <span className='font-serif text-stone-200'>pages/api/auth/[...nextauth].js</span>
            <br/>
            Similary, A server side library was used to interact with the Twitter API and also the restricted Twitter endpoints, From the callbacks of our OAuth we are able to fetch each logged in users
            access tokens which can be found in the `callbacks` of the file mentioned earlier, These tokens were then used by the Twitter library to let users interact with the restricted endpoints.
            <br/><br/>
            <b>Twitter-lite</b> (<a href="https://www.npmjs.com/package/twitter-lite" className='text-pink-500 hover:opacity-70'>See more</a>) was used to implement the twitter feed, An interesting approach was adapted for this feature,
            Instead of making two requests to the API, 3 were made - <br/></p>
           <li className='list-dot p-4 text-stone-100'> <b className='text-teal-400'>Fetch tweets with a geolocated details for the map</b> - This endpoint was used mainly to setup the markers based on the tweets retrived from this particular endpoint, This endpoint can be accessed at `url.com/api/twitter` </li>
           <li className='list-dot p-4 text-stone-100 '> <b className='text-teal-400'>Fetch tweets for the tweet list</b> - This is a straightforward endpoint that only retrives for all tweets containing the search query specified, This endpoint can be accessed at `url.com/api/twitter/search` </li>
           <li className='list-dot p-4 text-stone-100'> <b className='text-teal-400'>Post tweet</b> - This is the endpoint configured in this project, We make a POST request to the API which then communicates with the Twitter API to perform a restricted user action such as posting a new tweet. This endpoint can be accessed at `url.com/api/twitter/post` </li>
           <p className='text-base p-4 text-stone-50 italic'>NOTE: All the files for these endpoints can also be accessed from a similar route, Project Folder/Pages/API/</p>

           <p className='text-base p-4 text-stone-200'>
               This application was deployed on <b>Google Cloud Compute Engine VM.</b><br/>
               <br/> It was also tested and succesfully deployed on AWS EC2 but Google Cloud was preffered due to the fact that I had a lot of free Google Cloud Credits which were used for this project.
             Since this is a modern web applciation, Something like AWS amplify would've been the better choice in terms of practicality but a VM was selected only for the purpose of this project as it was taught in the coursework,
             Another very interesting and industrially used technique for deploying a NodeJS application is by 'Dockerizing', Using dockers web apps can be easily and very quickly deployed in matter of minutes. Morever not only that but it has also been 
             suggested and proven that Docker apps are extremely lightweight which means there is no performance or startup penalty
             </p>

             <p className='text-base p-4 text-stone-50'>
                 However for this application, A traditional approach was followed in which a VM was configured with all the necessary details and requirements.
                 <br/> This VM was then further configured and provided a NodeJS envrionment to run our application. This was done by refering to the documentation provided by AWS on how to install NodeJS on VMs<br/><br/>
                 After installing NodeJS, A web server had to be configured, For this purpose <b className='text-pink-500'>NGINX</b> was used to configure and setup our webserver.<br/><br/>
                 Next step was to keep this server running, For this purpose another advanced product and process manager for Node.js was used known as <b className='text-pink-500'>PM2.</b>
                 Then we simply had to install the content of our application by running <span className='text-xs italic'>npm i</span> & <span className='text-xs italic'>npm run build</span><br/>
                 In the final step we just had to run our application using PM2 and this was done by simply using the command <span className='italic'>pm2 start npm --name "next" -- start</span>


             </p>

             <p className='text-base p-4 text-stone-100'>
                 All the necessary security precautions were put in place while configuring this VM as well and more details regarding that can be found in the project video.
             </p>



           
    


   

        </div>
    </div>
  )
}
export default About