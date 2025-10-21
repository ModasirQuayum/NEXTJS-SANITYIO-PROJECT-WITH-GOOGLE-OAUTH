"use client"
import { useActionState, useState } from 'react'
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { formSchema } from '@/lib/validation';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { createNewsContent } from '@/lib/actions';
import { auth } from '@/auth';


const NewsContentForm = () => {
    const router = useRouter()

    const [error,setError] = useState<Record<string,string>>({})
    const [content,setContent] = useState("")
    
    const handleFormSubmit = async(prevState:any,formData:FormData)=>{
        try {
            const formValues = {
                title: formData.get('title') as string,
                context: formData.get('context') as string,
                link: formData.get('link') as string,
                description: content as string,
            }
            await formSchema.parseAsync(formValues)
            console.log(formValues)
            setContent("")
            
            const result = await createNewsContent(prevState,formData,content)
            
            if(result.status == "SUCCESS"){
                router.push(`/content/${result._id}`)
            }
            return result

        } 
        catch (error) {
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string,string>)
                return { ...prevState, error:"Validation Failed",status:"ERROR"}
            }
            return {
                ...prevState,
                error: 'An unexpected error has occured',
                status: "ERROR"
            }
        }

    }
    const [state,formAction,isPending] = useActionState(handleFormSubmit,{
        error: "",
        status: "INITIAL",
    })
  return (
    <form action={formAction}>
        <div className='my-3'>
            <label htmlFor="title" className='text-xl my-4'>Title</label>
            <Input
            id="title"
            name="title"
            className={`${error.title?"border-red-600":""}`}
            placeholder='Title of the Blog'
            />
            {error.title  && <p className='text-red-500'>{error.title}</p>}
        </div>
        <div className='my-3'>
            <label htmlFor="synopsis" className='text-xl mb-4'>Synopsis</label>
            <Textarea
            id="synopsis"
            name="context"
            className={`${error.context?"border-red-600":""} resize-none`}
            placeholder='Write short description'
            />
            {error.context  && <p className='text-red-500'>{error.context}</p>}
        </div>
        <div className='my-3'>
            <label htmlFor="link" className='text-xl my-4'>Image Url</label>
            <Input
            id="link"
            name="link"
            className={`${error.link?"border-red-600":""}`}
            placeholder='Image link'
            />
            {error.link  && <p className='text-red-500'>{error.link}</p>}
        </div>

        <div className='my-3'>
            <label htmlFor="content" className='text-xl my-4'>Content</label>
            <MDEditor
            value={content}
            onChange={(value)=>setContent(value as string)}
            className={`${error.content?"border-red-600":""}`}
            id="content"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
                placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
                disallowedElements: ["style"],
            }}
            />
            {error.content  && <p className='text-red-500'>{error.content}</p>}            
        </div>

        <Button
        type='submit' 
        variant="outline" className='my-2 px-4' disabled={isPending}>
            {isPending
            ? "Creating..."
            : "Create"
            }  
        </Button>
    </form>
  )
}

export default NewsContentForm