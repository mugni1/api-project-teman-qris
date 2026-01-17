import z from "zod"

export const registerSchema = z.object({
    email: z.email("invalid email"),
    password: z.string("password is required").min(8, "minimum password must have 8 character").max(12, "maximum password must have 12 character"),
    firstname: z.string("fistname is required").max(20, "maximum fistname must have 20 character"),
    lastname: z.string("lastname is required").max(20, "maximum lastname must have 20 character").optional(),
    fullname: z.string("fullname is required").max(40, "maximum fullname must have 40 character").optional(),
})
export type RegisterPayload = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("invalid email"),
    password: z.string("password is required").min(8, "minimum password must have 8 character").max(12, "maximum password must have 12 character"),
})
export type LoginPayload = z.infer<typeof loginSchema>;