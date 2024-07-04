import { auth } from '@/auth'
import GoogleLogin from '@/components/(auth)/GoogleLogin'
import SignupForm from '@/components/(auth)/SignupForm'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth();

    if(session?.user) {
        redirect("/")
    }
  return (
    <div className='flex justify-center items-center h-dvh'>
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
            </CardHeader>

            <CardContent>
                <SignupForm />
            </CardContent>

            <CardFooter className='flex flex-col gap-4' >
                <span>Or</span>

                <GoogleLogin />
                <Link href="/login">
                    Already have an account? login
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default page