import z from "zod"

export const createOrderSchema = z.object({
    transaction_id: z.string("transaction_id is required"),
    amount: z.coerce.number("amount must be a number").min(0, "amount must be at least 0"),
    qris_url: z.string("qris_url is required"),
    qris_string: z.string("qris_string is required"),
    expires_at: z.string("expires_at is required"),
    item_id: z.cuid("item_id is required and please input valid item_id")
})
export type CreateOrderPayload = z.infer<typeof createOrderSchema>;