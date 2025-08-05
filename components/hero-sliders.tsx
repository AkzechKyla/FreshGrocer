"use client"

import Link from "next/link"
import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { useStrapiData } from "@/hooks/use-strapi-data"
import type { Slider } from "@/types/strapi"
import { getFullImageUrl } from "@/lib/utils"

export default function HeroSliders() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  const { data, isLoading, isError } = useStrapiData<Slider>(
    ["sliders"],
    "sliders",
    {
      populate: {
        description: true,
        image: {
          populate: {
            file: true,
          }
        }
      }
    }
  )

  if (isLoading) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p>Loading sliders...</p>
      </section>
    )
  }

  if (isError || !data || !Array.isArray(data.data)) {
    console.error("Failed to load sliders:", isError ? "Error fetching data" : "No data or invalid data format")
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p className="text-red-500">Failed to load hero sliders. Please try again later.</p>
      </section>
    )
  }

  const slides = data.data.map((item: { id: number; attributes: Slider }) => {
    const slide = item.attributes ?? item
    const imageFile = slide.image?.file

    return {
      id: item.id,
      title: slide.title,
      description: slide.description?.body ?? "",
      ctaText: slide.ctaText ?? "Learn more",
      ctaLink: slide.ctaLink ?? "#",
      imageUrl: getFullImageUrl(imageFile?.formats?.medium?.url ?? imageFile?.url ?? "/placeholder.svg"),
      alt: imageFile?.alternativeText ?? slide.title ?? "Slide image",
    };
  });

  if (slides.length === 0) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 flex justify-center items-center">
        <p className="text-gray-500">No sliders available.</p>
      </section>
    )
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="p-1">
                  <Card className="relative overflow-hidden rounded-lg shadow-lg">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.alt}
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                        priority={slide.id === slides[0].id} // Prioritize loading for the first image
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                        <p className="text-base md:text-lg mb-4 max-w-md">{slide.description}</p>
                        <Link href={slide.ctaLink}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">{slide.ctaText}</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}
