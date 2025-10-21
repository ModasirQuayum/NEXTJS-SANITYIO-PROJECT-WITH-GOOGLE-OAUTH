import { defineField, defineType } from "sanity";

export const content = defineType({
    name: "content",
    title: "Content",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: "title",
            },
        }),
        defineField({
            name: "context",
            type: "text",
        }),
        defineField({
            name: "publisher",
            type: "reference",
            to: {type: "publisher"},
        }),
        defineField({
            name: "description",
            type: "markdown",
        }),
        defineField({
        name: "image",
        type: "url",
        validation: (Rule) => Rule.required(),
        }),
    ],
})