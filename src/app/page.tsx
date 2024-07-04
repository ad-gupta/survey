// "use client"
import { getUser } from '@/actions/auths';
import { auth } from '@/auth'
import { connectDB } from '@/lib/db';
import { User } from '@/models/user';
import React from 'react'

const page = async() => {
  // const session = await auth();

  // await connectDB()
  // const user = await User.findOne({ email: session?.user?.email});
  // console.log(user)
  return (
    <div className='text-2xl' >page</div>
  )
}

export default page