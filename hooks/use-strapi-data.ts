import { useQuery } from "@tanstack/react-query"
import { fetchStrapiData } from "@/lib/strapi"
import type { StrapiResponse } from "@/types/strapi"

/**
 * Options for fetching data from Strapi.
 */
interface UseStrapiDataOptions {
  populate?: string | string[] // Fields to populate (e.g., 'image', 'category.image')
  filters?: Record<string, any> // Filters for the query
  sort?: string | string[] // Sorting criteria (e.g., 'createdAt:desc')
  pagination?: {
    page?: number
    pageSize?: number
  }
  enabled?: boolean // Whether the query should be enabled
}

/**
 * A custom React Query hook for fetching data from Strapi.
 * @param queryKey An array of strings and/or objects that uniquely identifies the query.
 * @param path The Strapi API endpoint path (e.g., 'sliders', 'categories').
 * @param options Optional configuration for the Strapi API call and React Query.
 * @returns The query result object from TanStack React Query.
 */
export function useStrapiData<T>(queryKey: string[], path: string, options?: UseStrapiDataOptions) {
  return useQuery<StrapiResponse<T>, Error>({
    queryKey: queryKey,
    queryFn: () => {
      const params: Record<string, any> = {}
      if (options?.populate) {
        params.populate = options.populate
      }
      if (options?.filters) {
        Object.keys(options.filters).forEach((key) => {
          params[`filters[${key}]`] = options.filters![key]
        })
      }
      if (options?.sort) {
        params.sort = options.sort
      }
      if (options?.pagination) {
        if (options.pagination.page) params["pagination[page]"] = options.pagination.page
        if (options.pagination.pageSize) params["pagination[pageSize]"] = options.pagination.pageSize
      }
      return fetchStrapiData<StrapiResponse<T>>(path, params)
    },
    enabled: options?.enabled !== false, // Default to enabled
  })
}
