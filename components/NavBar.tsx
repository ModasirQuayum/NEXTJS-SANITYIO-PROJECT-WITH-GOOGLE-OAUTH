import { auth } from '@/auth'
import React from 'react'
import { SignOut } from './signout-button'
import { SignIn } from './signin-button'
import Link from 'next/link'

const NavBar = async() => {
    const session = await auth()
  return (
    <div className='px-5 flex items-center justify-between'>
        <Link className='text-stone-700 hover:text-stone-600 text-2xl' href="/">Home</Link>
    {session
    ?
        <div className="flex items-center justify-end my-5 px-5 gap-3">
        
        <div className='flex items-center gap-2'>
            <img className='rounded-full' src={session?.user?.image} alt={session?.user?.name} width={25} />
            <span className='text-stone-500 font-bold'>{session?.user?.name}</span>
        </div>
        <Link className='text-stone-700 hover:text-stone-600' href="/content/create">Create</Link>
        <SignOut />
        </div>
    :
        <>
        <div className="my-5 px-5">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer px-5 py-3 rounded-sm flex items-center gap-3 font-semibold">
                <img src="http://localhost:3000/google.jpg" alt="google" width={20}/>
                <SignIn />
            </div>

        </div>
        </>
    }
    </div>
  )
}

export default NavBar