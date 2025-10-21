"use client";
import { createComment } from '@/lib/actions';
import React, { useState } from 'react'

const CommentForm = ({id}:{id:string}) => {
    const [comment,setComment] = useState("")
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            console.log(comment)
            const result = await createComment({id,comment})
            if(result?.status == "SUCCESS"){
                console.log(result?.comment)
                setComment("")
            }
            return result
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='flex items-end gap-5 mb-4'>
        <textarea 
        className='resize-none border-1 border-t-0 border-r-0 border-l-0  outline-0 mt-5 pb-1  px-5 w-[350px] '
        value={comment}
        rows={1}
        onChange={(e)=>setComment(e.target.value)}
        />
        <button type="submit" className='px-6 py-2 rounded-sm bg-blue-primary text-white'>Post</button>
    </form>
  )
}

export default CommentForm