"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useStrapiData } from "@/hooks/use-strapi-data"
import type { Category } from "@/types/strapi"
import { getFullImageUrl } from "@/lib/utils"

export default function CategoryList() {
  const { data, isLoading, isError } = useStrapiData<Category>(
    ["categories"],
    "categories",
    {
      populate: {
        image: {
          populate: "file",
        },
      },
    },
  )

  if (isLoading) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 flex justify-center items-center">
        <p>Loading categories...</p>
      </section>
    )
  }

  if (isError || !data || !Array.isArray(data.data)) {
    console.error("Failed to load categories:", isError ? "Error fetching data" : "No data or invalid data format")
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 flex justify-center items-center">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </section>
    )
  }

  const categories = data.data.map((item: { id: number, attributes: Category}) => {
    const category = item.attributes ?? item
    const imageFile = category.image?.file

    return {
      id: item.id,
      name: category.name,
      image: getFullImageUrl(imageFile?.url ?? ""),
      link: `/category/${category.slug}`,
    }
  })

  if (categories.length === 0) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 flex justify-center items-center">
        <p className="text-gray-500">No categories available.</p>
      </section>
    )
  }


  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={category.link} key={category.id} className="group">
              <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={category.image}
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
