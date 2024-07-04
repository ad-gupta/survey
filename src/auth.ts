import NextAuth, { CredentialsSignin } from "next-auth"
import googleProvider from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials"
import { User } from "@/models/user";
import {compare} from "bcryptjs"
import { connectDB } from "./lib/db";

// connect with db
// custom page signin and signup
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentialProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        
        const email = credentials.email as string;
        const password = credentials.password as string;
        
        await connectDB();

        const user = await User.findOne({email}).select("+password");

        if(!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isMatch = await compare(password, user.password)

        if(!isMatch) {
          throw new CredentialsSignin("Invalid email or password")
        }
        const userData = {
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return userData;
      },
    })
    
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({ email, name, image, googleId: id });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
})