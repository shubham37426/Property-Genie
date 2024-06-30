import connectDb from "@/config/db";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ],
    callbacks: {
        async signIn({ account, profile }) {
          await connectDb()
          const userExists = await User.findOne({email: profile.email})
          if(! userExists){
            //Truncate long username
            const username = profile.name.slice(0,20)
            await User.create({
              email:profile.email,
              username,
              image:profile.picture
            })
          }
          if (account.provider === "google") {
            return profile.email_verified && profile.email.endsWith("@gmail.com")
          }
          return true // Do different verification for other providers that don't have `email_verified`
        },
        async session({session}){
          const user = await User.findOne({email: session.user.email});
          session.user.id = user._id.toString()
          return session;
        }
  }
}