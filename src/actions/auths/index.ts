"use server";

import { auth, signIn } from "@/auth";
import { User } from "@/models/user";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { connectDB } from "@/lib/db";

export const credentialSignIn = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: "/",
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return JSON.parse(JSON.stringify(err.cause)).provider;
  }
  redirect("/");
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    let user = await User.findOne({ email: email});
    // console.log(user)

    if(user) {
      return JSON.stringify(user);
    }
    const hashedPassword = await hash(password, 10);
    await connectDB();

    user = await User.create({ name, email, password: hashedPassword });
    // console.log(user)
  } catch (error) {
    return "Error creating account"
  }
  redirect("/login");
};


export const getUser = async() => {
  const session = await auth();

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email});
  console.log(user)
  return user;
}