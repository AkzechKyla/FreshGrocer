const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL

if (!STRAPI_API_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined. Please set it in your .env.local file.")
}

/**
 * Fetches data from the Strapi API.
 * @param path The API endpoint path (e.g., 'sliders', 'categories').
 * @param params Optional query parameters for filtering, populating, etc.
 * @returns A Promise that resolves to the fetched data.
 */
export async function fetchStrapiData<T>(path: string, params: Record<string, any> = {}): Promise<T> {
  const queryString = new URLSearchParams(params).toString()
  const requestUrl = `${STRAPI_API_URL}/api/${path}${queryString ? `?${queryString}` : ""}`

  try {
    const response = await fetch(requestUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error(`Strapi API Error for ${path}:`, errorData)
      throw new Error(`Failed to fetch data from Strapi: ${response.statusText} - ${JSON.stringify(errorData)}`)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error(`Error fetching from Strapi at ${requestUrl}:`, error)
    throw error
  }
}
