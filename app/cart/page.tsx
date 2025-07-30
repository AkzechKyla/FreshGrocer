import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CartPage() {
  // Dummy cart items for demonstration
  const cartItems = [
    {
      id: "prod1",
      name: "Organic Avocados (Pack of 3)",
      price: 5.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "prod2",
      name: "Whole Milk (1 Gallon)",
      price: 4.5,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "prod3",
      name: "Artisan Sourdough Bread",
      price: 5.25,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const estimatedShipping = 7.5 // Example fixed shipping cost
  const total = subtotal + estimatedShipping

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/" className="text-green-600 hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4 shadow-sm">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div className="md:col-span-1">
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-1 justify-start md:justify-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                        -
                      </Button>
                      <Input type="number" value={item.quantity} className="w-16 text-center h-8" readOnly />
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                        +
                      </Button>
                    </div>
                    <div className="flex items-center justify-between md:col-span-1 md:justify-end">
                      <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span>${estimatedShipping.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full mt-3 bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
