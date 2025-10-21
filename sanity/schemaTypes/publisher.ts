import { defineField,defineType } from "sanity";
import {UserIcon} from 'lucide-react'
export const publisher = defineType({
    name: "publisher",
    title: "Publisher",
    type: "document",
    icon: UserIcon,
    fields : [
        defineField({
            name: "username", 
            type: "string",
        }),
        defineField({
            name: "email", 
            type: "string",
        }),
        defineField({
            name: "image", 
            type: "url",
        }),
    ],
    preview: {
        select: {
            title: "username",
        },
    },
})