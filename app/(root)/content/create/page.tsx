import { auth } from '@/auth'
import NewsContentForm from '@/components/NewsContentForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()
    if (!session) redirect('/')
  return (
    <div className='w-[350px] sm:w-[650px] mx-auto my-5'>
        <NewsContentForm/>
    </div>
  )
}

export default page