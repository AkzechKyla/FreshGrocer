import type { Product } from "@/types/strapi"
import { getFullImageUrl } from "@/lib/utils"

export class ProductModel {
  constructor(private product: Product) {}

  get name() {
    return this.product.name
  }

  get priceFormatted() {
    return `$${this.product.price.toFixed(2)}`
  }

  get mainImageUrl() {
    return getFullImageUrl(this.product.image?.[0]?.file?.url) || "/placeholder.svg?height=400&width=400"
  }

  get galleryImages() {
    return this.product.image?.slice(1).map(img => getFullImageUrl(img.file?.url) || "/placeholder.svg") || []
  }

  get allImages() {
    return [this.mainImageUrl, ...this.galleryImages]
  }

  get ratingStars() {
    return Math.round(this.product.average_rating ?? 0)
  }

  get reviews() {
    return this.product.reviews ?? []
  }

  get shortDescription() {
    return this.product.short_description ?? ""
  }

  get longDescription() {
    return this.product.long_description?.body ?? ""
  }

  get nutritionInfo() {
    return this.product.nutrition_info?.body ?? ""
  }

  get stockStatus() {
    return this.product.stock_status
  }
}
