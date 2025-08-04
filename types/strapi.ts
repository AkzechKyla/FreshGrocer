/**
 * Defines the structure for a single image format (e.g., thumbnail, small, medium, large).
 */
export type StrapiImageFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
}

/**
 * Defines the structure for an image asset returned by Strapi.
 */
export type StrapiImage = {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats: {
        thumbnail?: StrapiImageFormat
        small?: StrapiImageFormat
        medium?: StrapiImageFormat
        large?: StrapiImageFormat
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl: string | null
      provider: string
      provider_metadata: any | null
      createdAt: string
      updatedAt: string
    }
  } | null
}

/**
 * Defines common attributes for any Strapi content type.
 */
export type StrapiAttribute<T> = T & {
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale?: string
}

/**
 * Defines the structure for a single data entry from Strapi.
 */
export type StrapiData<T> = {
  id: number
  attributes: StrapiAttribute<T>
}

/**
 * Defines the overall response structure from Strapi API calls.
 */
export type StrapiResponse<T> = {
  data: StrapiData<T> | StrapiData<T>[]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/**
 * Specific types for the attributes homepage content types.
 */
export type SliderAttributes = {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  image: StrapiImage
}

export type CategoryAttributes = {
  name: string
  slug: string
  image: StrapiImage
}

export type ProductAttributes = {
  name: string
  description: string
  price: number
  slug: string
  image: StrapiImage
  category?: {
    data: StrapiData<CategoryAttributes>
  }
  brand: string
}
