import Twitter from 'twitter-lite';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';


// This is the api route created to fetch tweets that have a geoloocation attatched to them.
// The fetching for the tweet list component is done in the /api/twitter/search.js file.
// Seperate fetch for this makes it easier to make a map of markers.


export default async (req, res) => {


  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });


  const client = new Twitter({
  
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: token.twitter.accessToken,
    access_token_secret: token.twitter.refreshToken
  });

  try {
    // fetch tweets by query!
    const results = await client.get('search/tweets.json?q= %23climatechange OR %23netzero&count=100');


    return res.status(200).json({
      status: 'Ok',
      data: results.statuses.filter(x=> x.place !==null)

    

    }
    );
    
  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
}