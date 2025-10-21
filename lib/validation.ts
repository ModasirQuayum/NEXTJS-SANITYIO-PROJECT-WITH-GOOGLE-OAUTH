import z from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    context: z.string().min(3).max(500),
    description: z.string().min(3),
    link: z.url(),

})