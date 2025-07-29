import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us / Logo */}
        <div className="col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FG</span>
            </div>
            <span className="font-bold text-xl text-green-600">FreshGrocer</span>
          </Link>
          <p className="text-sm text-gray-600">
            Your one-stop shop for fresh, high-quality groceries delivered right to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-green-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-green-600 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-green-600 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-green-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-green-600" />
              <span>info@freshgrocer.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <Facebook className="h-4 w-4 text-green-600" />
              <Link href="#" className="hover:text-green-600 transition-colors">
                Facebook
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Instagram className="h-4 w-4 text-green-600" />
              <Link href="#" className="hover:text-green-600 transition-colors">
                Instagram
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Twitter className="h-4 w-4 text-green-600" />
              <Link href="#" className="hover:text-green-600 transition-colors">
                Twitter
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to our newsletter for the latest updates and special offers.
          </p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Your email address" className="flex-1" />
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} FreshGrocer. All rights reserved.</p>
      </div>
    </footer>
  )
}
