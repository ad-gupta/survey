import SurveyForm from '@/components/(survey)/SurveyForm'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

// { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }


const page = () => {
  return (
    <div>
      <Card className='flex justify-center flex-col items-center'>
        <CardHeader>
          <CardTitle>Survey Questions</CardTitle>
        </CardHeader>

        <CardContent className='bg-blue-950 p-5 rounded-md'>
          <SurveyForm />
        </CardContent>

        <CardFooter>
          <p>End Here</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page