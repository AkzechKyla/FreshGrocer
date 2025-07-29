import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Dummy product data for demonstration
  const product = {
    id: params.id,
    name: "Organic Avocados (Pack of 3)",
    price: 5.99,
    availability: "In Stock",
    description:
      "Creamy and delicious organic avocados, perfect for guacamole, salads, or toast. Sourced from sustainable farms.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    details: {
      ingredients: "100% Organic Avocados",
      nutritionalInfo: `Per 100g serving:
        Calories: 160
        Total Fat: 14g
        Saturated Fat: 2g
        Cholesterol: 0mg
        Sodium: 7mg
        Total Carbohydrates: 9g
        Dietary Fiber: 7g
        Total Sugars: 0.7g
        Protein: 2g
        Vitamin K: 26% DV
        Vitamin C: 17% DV
        Potassium: 14% DV`,
      origin: "Mexico",
    },
    reviews: [
      { rating: 5, comment: "Absolutely fresh and delicious!", author: "Jane Doe" },
      { rating: 4, comment: "Good quality, ripened perfectly.", author: "John Smith" },
    ],
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
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              {product.images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden cursor-pointer">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} - view ${index + 1}`}
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.reviews.length} Reviews)</span>
            </div>
            <p className="text-4xl font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-800 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <span className="font-semibold text-gray-700 mr-2">Availability:</span>
              <span className="text-green-600 font-medium">{product.availability}</span>
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
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <p>{product.details.ingredients}</p>
                <h3 className="font-semibold mt-4 mb-2">Origin:</h3>
                <p>{product.details.origin}</p>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                <h3 className="font-semibold mb-2">Nutritional Information:</h3>
                <p>{product.details.nutritionalInfo}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <h3 className="font-semibold mb-4">Customer Reviews:</h3>
                {product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
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
                          <span className="ml-2 text-sm font-medium">{review.author}</span>
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
