import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'

import User from "@models/user";
import { conntectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // })
  ],
  secret: process.env.NEXTAUTH_URL_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        // serverless route -> lambda function (it will open up then its called)-> dynamodb 
        await conntectToDB()
        // Check if a user already exists
        const userExists = await User.findOne({ email: profile.email })
        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }