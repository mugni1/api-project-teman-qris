export interface CreatePaymentQrisPWRespose {
  success: boolean
  transaction_id: string
  order_id: string
  amount: number
  qris_url: string
  qris_string: string
  expires_at: string
  created_at: string
}

export interface CreateOrderPayload {
  transaction_id: string
  phone_number: string
  amount: number
  qris_url: string
  qris_string: string
  expires_at: string
  created_at: string
  item_id: string
  user_id: string
}

export interface GetPaymentQrisPWResponse {
  success: boolean
  transaction_id: string
  order_id: null | string
  amount: string
  status: 'pending' | 'paid' | 'expired' | 'failed' | 'cancelled'
  paid_at: null | string
  expires_at: string
  created_at: string
}
