import qs from "qs"

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
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true, // avoids encoding brackets
  })

  const requestUrl = `${STRAPI_API_URL}/api/${path}${queryString ? `?${queryString}` : ""}`

  try {
    console.log("Fetching from: ", requestUrl)
    console.log("🧾 Params passed to fetchStrapiData:", params)
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
