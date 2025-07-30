import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrderHistoryPage() {
  // Dummy order history data for demonstration
  const orders = [
    {
      id: "FG-20240725-001",
      date: "July 25, 2024",
      total: 45.75,
      status: "Delivered",
      items: [
        { name: "Organic Apples", quantity: 3, price: 3.99 },
        { name: "Boneless Chicken Breast", quantity: 1, price: 12.99 },
        { name: "Artisan Sourdough Bread", quantity: 1, price: 5.25 },
      ],
    },
    {
      id: "FG-20240720-002",
      date: "July 20, 2024",
      total: 28.1,
      status: "Shipped",
      items: [
        { name: "Whole Milk (1 Gallon)", quantity: 2, price: 4.5 },
        { name: "Organic Brown Eggs (Dozen)", quantity: 1, price: 4.2 },
        { name: "Fresh Broccoli", quantity: 2, price: 2.5 },
      ],
    },
    {
      id: "FG-20240715-003",
      date: "July 15, 2024",
      total: 62.0,
      status: "Delivered",
      items: [
        { name: "Wild Caught Salmon Fillet", quantity: 1, price: 18.75 },
        { name: "Organic Avocados (Pack of 3)", quantity: 2, price: 5.99 },
        { name: "Cheddar Cheese Block", quantity: 1, price: 7.99 },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">You have no past orders.</p>
            <Link href="/" className="text-green-600 hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-sm">
                <CardHeader className="flex flex-col md:flex-row justify-between md:items-center pb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold mb-1">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600">Placed on: {order.date}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="text-lg font-bold text-gray-900">Total: ${order.total.toFixed(2)}</span>
                    <span
                      className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item, itemIndex) => (
                        <TableRow key={itemIndex}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                    <Link href={`/order-details/${order.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">Reorder</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
