import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrderConfirmationPage() {
  // Dummy order data for demonstration
  const order = {
    orderNumber: "FG-20240730-12345",
    orderDate: "July 30, 2024",
    totalCost: 23.73,
    items: [
      { name: "Organic Avocados (Pack of 3)", quantity: 2, price: 5.99 },
      { name: "Whole Milk (1 Gallon)", quantity: 1, price: 4.5 },
      { name: "Artisan Sourdough Bread", quantity: 1, price: 5.25 },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    estimatedDelivery: "August 2, 2024",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="text-left mb-8 space-y-4">
            {/* Order Summary */}
            <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Order Number:</span> {order.orderNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Order Date:</span> {order.orderDate}
            </p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-2">Items Purchased:</h3>
              <ul className="space-y-1 text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total Cost:</span>
                <span>${order.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Information */}
            <h2 className="text-2xl font-bold mt-6 mb-2">Shipping Information</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Estimated Delivery:</span> {order.estimatedDelivery}
            </p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-2">Shipping Address:</h3>
              <p className="text-gray-700">{order.shippingAddress.name}</p>
              <p className="text-gray-700">{order.shippingAddress.address}</p>
              <p className="text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>

            {/* Contact Information */}
            <h2 className="text-2xl font-bold mt-6 mb-2">Need Help?</h2>
            <p className="text-gray-700">
              If you have any questions about your order, please contact our customer support:
            </p>
            <p className="text-gray-700">
              Email:{" "}
              <Link href="mailto:support@freshgrocer.com" className="text-green-600 hover:underline">
                support@freshgrocer.com
              </Link>
            </p>
            <p className="text-gray-700">
              Phone:{" "}
              <Link href="tel:+15551234567" className="text-green-600 hover:underline">
                +1 (555) 123-4567
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/orders">
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                View Order Details
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent py-3 text-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
