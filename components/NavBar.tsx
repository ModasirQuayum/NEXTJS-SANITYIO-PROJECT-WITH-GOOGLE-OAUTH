import { auth } from '@/auth'
import React from 'react'
import { SignOut } from './signout-button'
import { SignIn } from './signin-button'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = async() => {
    const session = await auth()
  return (
    <div className='px-5 flex items-center justify-between'>
        <Link className='text-stone-700 hover:text-stone-600 text-2xl' href="/">Home</Link>
    {session
    ?
        <div className="flex items-center justify-end my-5 px-5 gap-3">
            <div className='flex items-center justify-end flex-wrap gap-3'>
                <div className='flex items-center gap-2'>
                    <Image className='rounded-full' src={session?.user?.image || "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"} alt={session?.user?.name || "username"} width={25} />
                    <span className='text-stone-500 font-bold'>{session?.user?.name}</span>
                </div>
                <div className='flex items-center'>
                    <Link className='text-stone-700 hover:text-stone-600' href="/content/create">Create</Link>
                    <SignOut />
                </div>
            </div>
        </div>
    :
        <>
        <div className="my-5 px-5">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer px-5 py-3 rounded-sm flex items-center gap-3 font-semibold">
                <img src="https://nextjs-sanityio-project-with-google.vercel.app/google.jpg" alt="google" width={20}/>
                <SignIn />
            </div>

        </div>
        </>
    }
    </div>
  )
}

export default NavBar
