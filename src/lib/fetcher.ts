import { env } from './env'

interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

interface ApiError extends Error {
  status?: number
  info?: unknown
}

const API_BASE_URL = env.VITE_API_BASE_URL

/**
 * Create query string from params
 */
export function createQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value))
  })
  return searchParams.toString()
}

/**
 * Fetcher with error handling
 */
export async function fetcher<T>(endpoint: string, options: FetcherOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options

  // Build URL with query params
  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  if (params) {
    const queryString = createQueryString(params)
    url += `?${queryString}`
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    // Handle non-2xx responses
    if (!response.ok) {
      const error: ApiError = new Error('An error occurred while fetching the data.')
      error.status = response.status

      try {
        error.info = await response.json()
      } catch {
        error.info = await response.text()
      }

      throw error
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

/**
 * API helper methods
 */
export const api = {
  get: <T>(endpoint: string, options?: FetcherOptions) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: FetcherOptions) =>
    fetcher<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),

  put: <T>(endpoint: string, data?: unknown, options?: FetcherOptions) =>
    fetcher<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),

  patch: <T>(endpoint: string, data?: unknown, options?: FetcherOptions) =>
    fetcher<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),

  delete: <T>(endpoint: string, options?: FetcherOptions) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
}
