import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  secret: process.env.AUTH_SECRET,

})
