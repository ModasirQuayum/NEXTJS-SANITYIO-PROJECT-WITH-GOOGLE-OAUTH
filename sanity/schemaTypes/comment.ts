import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "publisher",
      type: "reference",
      to: [{ type: "publisher" }],
    }),
    defineField({
      name: "comment",
      type: "text",
    }),
    defineField({
      name: "content",
      type: "reference",
      to: [{ type: "content" }],
    }),
  ],
});
