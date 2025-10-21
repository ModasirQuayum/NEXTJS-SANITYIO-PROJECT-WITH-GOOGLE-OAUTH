import { defineQuery } from "next-sanity";

export const PUBLISHER_BY_GOOGLE_ID_QUERY = defineQuery(`
    *[_type=="publisher" && _id == $id][0]{
    _id,
    username,
    email,
    image,
    }
`)

export const CONTENT_QUERY = defineQuery(`*[_type =="content"] | order(_createdAt desc)
    {
    _id,
    title,
    slug,
    context,
    image,
    description,
    publisher ->{
        _id,username,image,email
    },
    _createdAt,
    comment ->{
        _id,
    }
    }
`)

export const CONTENT_QUERY_ID = defineQuery(`*[_type == "content" && _id == $id][0]{
    _id,
    title,
    slug,
    context,
    image,
    publisher -> {
        _id,username,image,email
    },
    description,
    _createdAt,
    }

`)
export const COMMENTS_QUERY_BY_CONTENT = defineQuery(`*[_type == "comment" && content->_id == $id] | order(_createdAt desc){
    _id,
    comment,
    _createdAt,
    publisher -> {
        _id,
        name,
        email,
        image
    },
    content -> {
        _id, title,slug
    }
    }
`)