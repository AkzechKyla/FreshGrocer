import type { Product, ProductResponse } from "@/types/strapi"
import { fetchStrapiData } from "@/lib/strapi"

export class ProductService {
  async getProductById(id: string): Promise<Product | null> {
    const response = await fetchStrapiData<ProductResponse>("products", {
      filters: { id },
      populate: {
        long_description: true,
        nutrition_info: true,
        image: { populate: { file: true } },
        category: true,
        reviews: true,
      },
    })

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0]
    }
    return null
  }
}
