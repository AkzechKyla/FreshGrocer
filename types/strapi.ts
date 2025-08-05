export type Product = {
  id: number
  documentId: string
  name: string
  price: number
  slug: string
  brand: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  description: Description
  image: ProductImage
  category: Category
}

export type Description = {
  id: number
  body: string
}

export type ProductImage = {
  id: number
  file: ImageFile
}

export type ImageFile = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    large?: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  sizeInBytes?: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type ImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes?: number
  url: string
}

export type Category = {
  id: number
  documentId: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image?: {
    id: number
    file: ImageFile
  }
}

export interface Slider {
  id: number
  documentId: string
  title: string
  ctaText: string
  ctaLink: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  description: {
    id: number
    body: string
  }
  image: {
    id: number
    file: ImageFile
  }
}

export type StrapiResponse<T> = {
  data: T[]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type ProductResponse = StrapiResponse<Product>
export type SliderResponse = StrapiResponse<Slider>
export type CategoryResponse = StrapiResponse<Category>
