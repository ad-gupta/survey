import { auth } from '@/auth'
import GoogleLogin from '@/components/(auth)/GoogleLogin'
import LoginForm from '@/components/(auth)/LoginForm'
import { Button } from '@/components/ui/button'
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
                <CardTitle>Login</CardTitle>
            </CardHeader>

            <CardContent>
                <LoginForm/>
            </CardContent>

            <CardFooter className='flex flex-col gap-4' >
                <span>Or</span>

                <GoogleLogin />
                <Link href="/signup">
                    Don't have an account? signup
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default page