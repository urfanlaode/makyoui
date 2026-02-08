/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Common entity fields
 */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}
