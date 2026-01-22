export interface Meta {
  search: string
  page: number
  limit: number
  offset: number
  total: number
  order_by: string
  sort_by: string | 'asc' | 'desc'
  filter_by_provider?: string
  filter_by_credit?: string
  filter_by_status?: string
}
