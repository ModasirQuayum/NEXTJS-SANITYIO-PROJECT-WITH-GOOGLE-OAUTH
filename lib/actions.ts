"use server"
import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createNewsContent = async(state:any,form:FormData,content:string)=>{
    const session = await auth()
    if(!session){
        return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
        })
    }
    const {title,context,link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key!==content)
    )
    const slug = slugify(title as string, {lower:true,strict:true})
    try {
        const newsContent = {
            title,
            context,
            image: link,
            slug: {
            _type: slug,
            current: slug,
            },
            publisher:{
                _type: "reference",
                _ref: session.id
            },
            description:content
        }
        const result = await writeClient.create({_type:"content",...newsContent})
        console.log(result)
        return parseServerActionResponse({
            ...result,
            error:"",
            status:"SUCCESS"
        })
    } catch (error) {
      console.log(error)
      return parseServerActionResponse({
        error: JSON.stringify(error),
        status: "ERROR"
      })  
    }
}

export const createComment = async({id,comment}:{id:string,comment:string})=>{
    const session = await auth()
    if(!session){
        return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
        })
    }
    try {
        const result = await writeClient.create({_type:"comment",
            comment,
            publisher:{
                _type: "reference",
                _ref: session.id
            },
            content:{
                _type:"reference",
                _ref:id
            }
        })
        return {
        ...result,
        error: "",
        status: "SUCCESS",
        };
    } catch (error) {
        console.log(error)
    }
}