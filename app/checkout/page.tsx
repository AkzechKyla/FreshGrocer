import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  // Dummy cart items for order summary
  const cartItems = [
    {
      id: "prod1",
      name: "Organic Avocados (Pack of 3)",
      price: 5.99,
      quantity: 2,
    },
    {
      id: "prod2",
      name: "Whole Milk (1 Gallon)",
      price: 4.5,
      quantity: 1,
    },
    {
      id: "prod3",
      name: "Artisan Sourdough Bread",
      price: 5.25,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const estimatedShipping = 7.5 // Example fixed shipping cost
  const total = subtotal + estimatedShipping

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Checkout</h1>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-medium">Shipping</span>
          </div>
          <Separator orientation="horizontal" className="flex-1 mx-4 bg-gray-300 h-0.5" />
          <div className="flex items-center text-gray-500">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-medium">Payment</span>
          </div>
          <Separator orientation="horizontal" className="flex-1 mx-4 bg-gray-300 h-0.5" />
          <div className="flex items-center text-gray-500">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-medium">Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping and Billing Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <section className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" placeholder="Doe" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" type="text" placeholder="123 Main St" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" type="text" placeholder="Anytown" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" type="text" placeholder="12345" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
                </div>
              </form>
            </section>

            {/* Billing Information */}
            <section className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
              <div className="flex items-center space-x-2 mb-4">
                <Input id="sameAsShipping" type="checkbox" className="h-4 w-4" />
                <Label htmlFor="sameAsShipping">Same as Shipping Address</Label>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingFirstName">First Name</Label>
                  <Input id="billingFirstName" type="text" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingLastName">Last Name</Label>
                  <Input id="billingLastName" type="text" placeholder="Doe" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="billingAddress">Address</Label>
                  <Input id="billingAddress" type="text" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingCity">City</Label>
                  <Input id="billingCity" type="text" placeholder="Anytown" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingState">State</Label>
                  <Select>
                    <SelectTrigger id="billingState">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingZip">Zip Code</Label>
                  <Input id="billingZip" type="text" placeholder="12345" />
                </div>
              </form>
            </section>

            {/* Payment Method */}
            <section className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="credit-card" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" type="text" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="text" placeholder="XXX" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apple-pay" id="apple-pay" />
                  <Label htmlFor="apple-pay">Apple Pay</Label>
                </div>
              </RadioGroup>
            </section>
          </div>

          {/* Order Summary (Persistent) */}
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md h-fit sticky top-20">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-700 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-4" />
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
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">Place Order</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
