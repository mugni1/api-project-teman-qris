import z from "zod"

export const createItemSchema = z.object({
    title: z.string("title is required").max(50, "maximum title must have 50 character"),
    price: z.coerce.number("price must be a number").min(0, "price must be at least 0"),
    stock: z.coerce.number("stock must be a number").min(0, "stock must be at least 0"),
    provider: z.enum(["xl", "axis", "telkomsel", "byu", "indosat", "smartfren"], { error: "provider must be one of: axis, xl, indosat, smartfren, telkomsel, byu" })
})
export type CreateItemPayload = z.infer<typeof createItemSchema>;