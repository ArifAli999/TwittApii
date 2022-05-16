import Twitter from 'twitter-lite';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';
export default async (req, res) =>{
  
    var Twit = require('twit')
 
   
  
    const session = await getSession({ req });
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });
    console.log(token.twitter.accessToken)
  
    var T = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: token.twitter.accessToken,
        access_token_secret: token.twitter.refreshToken
      });
      
     
      const body = req.body;
      T.post('statuses/update', { status: req.body }, function(err, data, response) {
        console.log(data)
      })

   

    return res.status(200).json({ status: 'ok', body: body});
  }