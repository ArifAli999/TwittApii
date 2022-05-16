import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    

    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account = {}, profile, isNewUser }) {
      if (account.provider && !token [account.provider]) {
        token[account.provider] = {};
      }
      if(account.oauth_token) {
        token[account.provider].accessToken = account.oauth_token;
      }
      if (account.oauth_token_secret) {
        token [account.provider].refreshToken = account.oauth_token_secret;
      }

        return token
       
    
      },

      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      }
  },
  secret: process.env.NEXTAUTH_SECRET
})