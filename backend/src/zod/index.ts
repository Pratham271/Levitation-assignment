import z from "zod"

export const signupSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().min(1).email(),
    password: z.string().min(6)
})