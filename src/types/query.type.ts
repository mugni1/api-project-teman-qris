export interface QueryParams {
  search: string
  limit: number
  page: number
  offset: number
  order_by: string
  sort_by: string
  filter_by_provider?: string
  filter_by_credit?: string
  filter_by_status?: string
}
