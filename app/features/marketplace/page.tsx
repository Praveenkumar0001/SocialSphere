import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Tag, CreditCard, MessageCircle, Star, Search, Map, Shield, ArrowRight } from "lucide-react"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-teal-100 text-teal-600 rounded-lg mb-4">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Marketplace & Shopping</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Buy, sell, and discover products with our integrated shopping platform.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Shop Where You Socialize</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our marketplace brings together the best of Facebook Marketplace, Instagram Shopping, and other e-commerce
            platforms, allowing you to buy and sell without leaving your social experience.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Whether you're selling handmade crafts, used items, or running a full business, our marketplace tools make
            it easy to reach potential customers and manage transactions securely.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                <ShoppingBag className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold">Integrated Shopping</h3>
                <p className="text-gray-600">Browse and purchase products without leaving your social feed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                <Tag className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Listing</h3>
                <p className="text-gray-600">Create product listings in minutes with our user-friendly tools.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                <Shield className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Transactions</h3>
                <p className="text-gray-600">Buy and sell with confidence through our secure payment system.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for products, services, or items..."
                  className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-4 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-4">Featured Items</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border border-gray-100 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-300" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm">
                        {item === 1
                          ? "Vintage Leather Jacket"
                          : item === 2
                            ? "iPhone 13 Pro - Like New"
                            : item === 3
                              ? "Handmade Ceramic Mug"
                              : "Mountain Bike - Great Condition"}
                      </p>
                      <p className="text-teal-600 font-bold mt-1">
                        ${item === 1 ? "85" : item === 2 ? "699" : item === 3 ? "25" : "350"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Map className="h-3 w-3 mr-1" />
                          <span>
                            {item === 1
                              ? "2.5 miles"
                              : item === 2
                                ? "5 miles"
                                : item === 3
                                  ? "Local pickup"
                                  : "3.2 miles"}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {item === 1 ? "2d ago" : item === 2 ? "5h ago" : item === 3 ? "1w ago" : "Just now"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <h3 className="font-bold text-lg mb-4">Your Listings</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Desk Chair - Ergonomic</p>
                    <p className="text-teal-600 font-bold">$120</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">12 views</span>
                      <span>3 interested</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-teal-600 border-teal-200 hover:bg-teal-50">
                    Edit
                  </Button>
                </div>
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                <ShoppingBag className="mr-2 h-4 w-4" /> Create New Listing
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Buy & Sell Locally",
            description: "Connect with local buyers and sellers for in-person transactions.",
            icon: ShoppingBag,
          },
          {
            title: "Product Tagging",
            description: "Tag products in your posts and stories for easy shopping.",
            icon: Tag,
          },
          {
            title: "Secure Payments",
            description: "Process payments securely through our integrated payment system.",
            icon: CreditCard,
          },
          {
            title: "Messaging",
            description: "Communicate with buyers and sellers directly through our messaging system.",
            icon: MessageCircle,
          },
          {
            title: "Ratings & Reviews",
            description: "Build trust with ratings and reviews from previous transactions.",
            icon: Star,
          },
          {
            title: "Search & Filters",
            description: "Find exactly what you're looking for with powerful search and filtering.",
            icon: Search,
          },
          {
            title: "Local Pickup",
            description: "Arrange local pickup for items with integrated map and location features.",
            icon: Map,
          },
          {
            title: "Buyer Protection",
            description: "Shop with confidence knowing you're protected by our buyer guarantee.",
            icon: Shield,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-teal-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to buy and sell?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join our marketplace community and discover a new way to shop socially.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 w-full sm:w-auto">
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Explore More Features
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
