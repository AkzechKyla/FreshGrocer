"use client"

import Link from "next/link"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"

export default function HeroSliders() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  const slides = [
    {
      id: 1,
      image: "/placeholder.svg?height=600&width=1200",
      alt: "Fresh Organic Vegetables",
      title: "Fresh Organic Vegetables",
      description: "Discover the best organic produce, straight from the farm to your table.",
      ctaText: "Shop Vegetables",
      ctaLink: "/category/fruits-vegetables",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=600&width=1200",
      alt: "Dairy & Eggs Selection",
      title: "Farm Fresh Dairy & Eggs",
      description: "High-quality dairy products and eggs for your daily needs.",
      ctaText: "Explore Dairy",
      ctaLink: "/category/dairy-eggs",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=600&width=1200",
      alt: "Premium Meat & Seafood",
      title: "Premium Meat & Seafood",
      description: "Sustainably sourced meats and fresh seafood for gourmet meals.",
      ctaText: "View Meats",
      ctaLink: "/category/meat-fish",
    },
  ]

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
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.alt}
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                        priority={slide.id === 1} // Prioritize loading for the first image
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
