import Twitter from 'twitter-lite';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';
var Twit = require('twit')

export default async (req, res) =>{

   const status = req.body;
 
   
  
    const session = await getSession({ req });
    
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });
    console.log(token.twitter.accessToken)
  
    const client = new Twitter({
      subdomain: 'api',
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: token.twitter.accessToken,
      access_token_secret: token.twitter.refreshToken
    });
  
      
     
    try {
      const results = await client.post('statuses/update', {
        status
      });
      return res.status(200).json({
        status: 'Ok'
      });
    } catch(e) {
      return res.status(400).json({
        status: e.message
      });
    }
  }