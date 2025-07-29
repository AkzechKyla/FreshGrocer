import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoryList() {
  const categories = [
    {
      name: "Fruits & Vegetables",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/fruits-vegetables",
    },
    {
      name: "Dairy & Eggs",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/dairy-eggs",
    },
    {
      name: "Meat & Fish",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/meat-fish",
    },
    {
      name: "Bakery",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/bakery",
    },
    {
      name: "Pantry Essentials",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/pantry",
    },
    {
      name: "Beverages",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/beverages",
    },
    {
      name: "Snacks",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/snacks",
    },
    {
      name: "Frozen Foods",
      image: "/placeholder.svg?height=200&width=200",
      link: "/category/frozen-foods",
    },
  ]

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={category.link} key={category.name} className="group">
              <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
