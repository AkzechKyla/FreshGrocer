import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutGrid, List, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductCategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Dummy product data for demonstration, filtered by category
  const allProducts = [
    {
      id: "1",
      name: "Organic Apples",
      description: "Crisp and sweet, perfect for snacking.",
      price: 3.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "fruits-vegetables",
      brand: "Fresh Farms",
    },
    {
      id: "2",
      name: "Whole Milk (1 Gallon)",
      description: "Fresh, pasteurized whole milk.",
      price: 4.5,
      image: "/placeholder.svg?height=200&width=200",
      category: "dairy-eggs",
      brand: "Dairy Delights",
    },
    {
      id: "3",
      name: "Boneless Chicken Breast",
      description: "Lean and tender, great for grilling.",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "meat-fish",
      brand: "Butcher's Best",
    },
    {
      id: "4",
      name: "Artisan Sourdough Bread",
      description: "Freshly baked, crusty sourdough.",
      price: 5.25,
      image: "/placeholder.svg?height=200&width=200",
      category: "bakery",
      brand: "Local Bakehouse",
    },
    {
      id: "5",
      name: "Organic Brown Eggs (Dozen)",
      description: "Farm-fresh, large brown eggs.",
      price: 4.2,
      image: "/placeholder.svg?height=200&width=200",
      category: "dairy-eggs",
      brand: "Happy Hens",
    },
    {
      id: "6",
      name: "Wild Caught Salmon Fillet",
      description: "Rich in Omega-3s, responsibly sourced.",
      price: 18.75,
      image: "/placeholder.svg?height=200&width=200",
      category: "meat-fish",
      brand: "Ocean's Bounty",
    },
    {
      id: "7",
      name: "Fresh Broccoli",
      description: "Nutrient-rich and versatile.",
      price: 2.5,
      image: "/placeholder.svg?height=200&width=200",
      category: "fruits-vegetables",
      brand: "Green Harvest",
    },
    {
      id: "8",
      name: "Cheddar Cheese Block",
      description: "Sharp and creamy cheddar.",
      price: 7.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "dairy-eggs",
      brand: "Dairy Delights",
    },
  ]

  const products = allProducts.filter((product) => product.category === params.slug)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{categoryName}</h1>

        {/* Filtering and Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input type="text" placeholder="Filter by brand..." className="max-w-xs" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  Dietary <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Organic</DropdownMenuItem>
                <DropdownMenuItem>Gluten-Free</DropdownMenuItem>
                <DropdownMenuItem>Vegan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  Sort by <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Name: A-Z</DropdownMenuItem>
                <DropdownMenuItem>Name: Z-A</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="hidden sm:flex bg-transparent">
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex bg-transparent">
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    <Link href={`/product/${product.id}`} className="hover:text-green-600 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
            <Link href="/" className="text-green-600 hover:underline mt-4 block">
              Go back to homepage
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
