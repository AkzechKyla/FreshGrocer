import Link from "next/link"
import { Search, User, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FG</span>
            </div>
            <span className="font-bold text-xl text-green-600">FreshGrocer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium hover:text-green-600">
                  Shop by Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/category/fruits-vegetables">Fruits & Vegetables</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/dairy-eggs">Dairy & Eggs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/meat-fish">Meat & Fish</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/bakery">Bakery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/pantry">Pantry Essentials</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search for products..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/register">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Order History</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
                <span className="sr-only">Shopping cart with 3 items</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/fruits-vegetables">Fruits & Vegetables</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/dairy-eggs">Dairy & Eggs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/meat-fish">Meat & Fish</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/bakery">Bakery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/pantry">Pantry Essentials</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search for products..." className="pl-10 pr-4 w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
