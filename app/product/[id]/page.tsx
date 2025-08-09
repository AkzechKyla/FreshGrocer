import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductService } from "@/services/ProductService"
import { ProductModel } from "@/models/ProductModel"

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productService = new ProductService()

  let productData = null
  let error = null

  try {
    const product = await productService.getProductById(id)
    if (!product) {
      error = "Product not found."
    } else {
      productData = new ProductModel(product)
    }
  } catch (e) {
    console.error("Error fetching product details:", e)
    error = "Failed to load product details. Please try again later."
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-700">{error}</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">Product Not Found</h1>
          <p className="text-lg text-gray-700">The product you are looking for does not exist.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={productData.mainImageUrl || "/placeholder.svg"}
                alt={productData.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              {productData.allImages.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden cursor-pointer">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${productData.name} - view ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{productData.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500">
                {Array.from({ length: productData.ratingStars }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                {Array.from({ length: 5 - productData.ratingStars }).map((_, i) => <Star key={i} className="h-5 w-5 text-gray-300" />)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({productData.reviews.length} Review{productData.reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
            <p className="text-4xl font-bold text-green-700 mb-4">{productData.priceFormatted}</p>
            <p className="text-lg text-gray-800 mb-6">{productData.shortDescription}</p>

            <div className="flex items-center mb-6">
              <span className="font-semibold text-gray-700 mr-2">Availability:</span>
              <span className="text-green-600 font-medium">{productData.stockStatus}</span>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                defaultValue={1}
                min={1}
                className="w-24 text-center"
                aria-label="Select quantity"
              />
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg">Add to Cart</Button>
            </div>

            {/* Detailed Description Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-gray-700 leading-relaxed">
                <h3 className="font-semibold mb-2">Description:</h3>
                <p>{productData.longDescription}</p>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                <h3 className="font-semibold mb-2">Nutritional Information:</h3>
                <p>{productData.nutritionInfo}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <h3 className="font-semibold mb-4">Customer Reviews:</h3>
                {productData.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {productData.reviews.map((review: any, index: number) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center mb-1">
                          <div className="flex text-yellow-500">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">{review.author_name}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
