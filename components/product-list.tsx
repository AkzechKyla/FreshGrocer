"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutGrid, List, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useStrapiData } from "@/hooks/use-strapi-data"
import type { Product } from "@/types/strapi"
import { getFullImageUrl } from "@/lib/utils"

export default function ProductList() {
  const { data, isLoading, isError } = useStrapiData<Product>(
    ["products"],
    "products",
    {
      populate: {
        image: {
          populate: {
            file: true,
          },
        },
        category: true,
      },
    }
  )

  if (isLoading) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p>Loading products...</p>
      </section>
    )
  }

  if (isError || !data || !Array.isArray(data.data)) {
    console.error("Failed to load products:", isError ? "Error fetching data" : "No data or invalid data format")
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </section>
    )
  }

  const products = data.data.map((item: Product) => {
    const firstImageFile = item.image?.[0]?.file

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      brand: item.brand ?? "Unbranded",
      short_description: item.short_description ?? "",
      category: item.category?.name ?? "Uncategorized",
      imageUrl: getFullImageUrl(firstImageFile?.formats?.medium?.url ?? firstImageFile?.url),
      alt: firstImageFile?.alternativeText ?? item.name ?? "Product image",
    }
  })

  if (products.length === 0) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p className="text-gray-500">No products available.</p>
      </section>
    )
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Products</h2>

        {/* Filtering and Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input type="text" placeholder="Filter by brand..." className="max-w-xs" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  Category <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuItem>Fruits & Vegetables</DropdownMenuItem>
                <DropdownMenuItem>Dairy & Eggs</DropdownMenuItem>
                <DropdownMenuItem>Meat & Fish</DropdownMenuItem>
                <DropdownMenuItem>Bakery</DropdownMenuItem>
                <DropdownMenuItem>Pantry Essentials</DropdownMenuItem>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.alt}
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
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.short_description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
