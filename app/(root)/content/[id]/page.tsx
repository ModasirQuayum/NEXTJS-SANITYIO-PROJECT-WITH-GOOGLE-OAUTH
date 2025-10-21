import React, { Suspense } from 'react'
import MarkdownIt from "markdown-it";
import { client } from '@/sanity/lib/client';
import { CONTENT_QUERY_ID } from '@/sanity/lib/queries';
import CommentForm from '@/components/CommentForm';
import CommentsBox from '@/components/CommentsBox';
import { auth } from '@/auth';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';



const md = MarkdownIt();
const page = async({params}: { params: Promise<{ id: string }> }) => {


    const id = (await params).id
    const [content] = await Promise.all([
        client.fetch(CONTENT_QUERY_ID,{id}),
    ])

    const parsedContent = md.render(content?.description || "");


    const session = await auth()
    
  return (
    <div className='w-[350px] sm:w-[750px] xl:w-[1120px] mx-auto my-5 px-5'>
        <h2 className='text-xl sm:text-3xl pb-1 font-semibold text-blue-primary'>{content?.title}</h2>

        <div className='my-3 flex items-center gap-7'>
            <div className='flex gap-2 items-center'>
                <img className='rounded-full' src={content?.publisher?.image} alt={content?.publisher?.username}  width={25}/>

                <div>
                    <h5 className='text-sm font-extrabold text-stone-700'>{content?.publisher?.username}</h5>
                    <span className='text-xs text-stone-500 underline'>{content?.publisher?.email}</span>
                </div>
            </div>
            <div className='flex items-start sm:items-center gap-2 text-xs'>
                <Calendar className='text-stone-600 w-[12px]'/> 
                <h5 className='text-stone-700 '>{formatDate(content?._createdAt)}</h5> 
            </div>
        </div>

        <div className='w-full h-[250px] sm:h-[600px]'> 
            <img className='rounded-md h-full w-full object-cover' src={content?.image} alt="" />
        </div>
        
        {parsedContent ? (
        <article
            className="prose  font-work-sans break-all text-md sm:text-xl my-4 w-full"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
        ) : (
        <p className="no-result">No details provided</p>
        )}



        <div className='bg-gray-50 px-5 py-3'>
            {session
            ?
            <>
            <h3 className='text-xl sm:text-3xl font-semibold'>Comments</h3>
            <div>
            <CommentForm id={id}/> 
            </div>
            </>
            :
            <h3 className='text-xl sm:text-3xl font-semibold pl-0 mb-3'>Signin to post comments</h3>
            }
            <div>
                <Suspense fallback={<p>Loading Comments...</p>}>
                    <CommentsBox id={id}/>
                </Suspense>
            </div>
        </div>
    </div>
  )
}

export default page
