import { client } from '@/sanity/lib/client';
import { COMMENTS_QUERY_BY_CONTENT } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { formatDate } from '@/lib/utils';
const CommentsBox = async({id}:{id:string}) => {
  const { data } = await sanityFetch({
    query:COMMENTS_QUERY_BY_CONTENT, 
    params: { id }});
  const comments = Array.isArray(data) ? data : [];
  return (
    <div>
      
      <h3 className='my-3 font-semibold'>Total Comments:  {comments.length}</h3>
      {
      comments?.map((comment)=>(
          <div key={comment?._id} className='my-2 pl-3'>
            <div  className='bg-slate-200 py-2 px-4 rounded-md text-md mb-2'> 
              <div className='flex items-center gap-2'>
                <img className='rounded-3xl' src={comment?.publisher?.image} alt="" width={25}/>
                <h5 className='text-xs'>{comment?.publisher?.email}</h5>
              </div>
              <hr className='border-b-2 border-gray-100 mt-2' />
                <h4 className='text-xl mb-2 mt-1'>
                {comment?.comment}
                </h4>
                <span className='text-xs text-stone-400'>{formatDate(comment?._createdAt)}</span>
            </div>
          </div>
      ))
      }

      <SanityLive/>
    </div>
  )
}

export default CommentsBox