import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PUBLISHER_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
export const { handlers,signIn,signOut, auth } = NextAuth({ 
    providers: [ 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                scope: "openid email profile"
              }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
    async signIn({account,
      profile,
      user:{name,email,image} 
    }) {
      if (account?.provider === "google" && profile?.email_verified) {
        const google_id = profile?.sub
        const existingUser = await client.withConfig({useCdn: false}).fetch(PUBLISHER_BY_GOOGLE_ID_QUERY,{id:google_id})

        if(!existingUser){
          await writeClient.create({
            _type: "publisher",
            _id: google_id,
            username: name,
            email: email,
            image: image
          })
        }
      }
    return true
    },
    async jwt({token,account,profile}){
      if (profile?.sub){
        const user = await client.withConfig({useCdn: false}).fetch(PUBLISHER_BY_GOOGLE_ID_QUERY,{id:profile?.sub})
  
        if(user?._id){
          token.id = user._id
        }
      }
      return token
    },
    async session({session,token}) {
      Object.assign(session, {id: token.id})
      return session
    }
  } 
})         