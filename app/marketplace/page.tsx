"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Heart,
  MessageCircle,
  Star,
  Plus,
  ShoppingBag,
  Smartphone,
  Car,
  Home,
  Shirt,
  Book,
} from "lucide-react"

interface MarketplaceListing {
  id: string
  title: string
  description: string
  price: number
  category: string
  location: string
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
    verified: boolean
  }
  images: string[]
  condition: "new" | "like-new" | "good" | "fair"
  createdAt: string
  isFavorited: boolean
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")

  const categories = [
    { id: "all", name: "All Categories", icon: ShoppingBag },
    { id: "electronics", name: "Electronics", icon: Smartphone },
    { id: "vehicles", name: "Vehicles", icon: Car },
    { id: "home", name: "Home & Garden", icon: Home },
    { id: "clothing", name: "Clothing", icon: Shirt },
    { id: "books", name: "Books & Media", icon: Book },
  ]

  const listings: MarketplaceListing[] = [
    {
      id: "1",
      title: "iPhone 14 Pro Max - 256GB",
      description:
        "Excellent condition iPhone 14 Pro Max in Space Black. Includes original box, charger, and screen protector already applied.",
      price: 899,
      category: "electronics",
      location: "San Francisco, CA",
      seller: {
        id: "seller1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        verified: true,
      },
      images: [
        "/placeholder.svg?height=300&width=300&text=iPhone+Front",
        "/placeholder.svg?height=300&width=300&text=iPhone+Back",
      ],
      condition: "like-new",
      createdAt: "2024-01-15",
      isFavorited: false,
    },
    {
      id: "2",
      title: "2019 Honda Civic - Low Mileage",
      description: "Well-maintained Honda Civic with only 35,000 miles. Regular maintenance, clean title, non-smoker.",
      price: 18500,
      category: "vehicles",
      location: "Los Angeles, CA",
      seller: {
        id: "seller2",
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        verified: true,
      },
      images: ["/placeholder.svg?height=300&width=300&text=Honda+Civic"],
      condition: "good",
      createdAt: "2024-01-14",
      isFavorited: true,
    },
    {
      id: "3",
      title: "Vintage Leather Sofa",
      description:
        "Beautiful vintage leather sofa in excellent condition. Perfect for any living room or office space.",
      price: 450,
      category: "home",
      location: "New York, NY",
      seller: {
        id: "seller3",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        verified: false,
      },
      images: ["/placeholder.svg?height=300&width=300&text=Leather+Sofa"],
      condition: "good",
      createdAt: "2024-01-13",
      isFavorited: false,
    },
    {
      id: "4",
      title: "Designer Winter Jacket",
      description: "Brand new designer winter jacket, never worn. Size Medium. Originally $300, selling for much less.",
      price: 120,
      category: "clothing",
      location: "Chicago, IL",
      seller: {
        id: "seller4",
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
        verified: true,
      },
      images: ["/placeholder.svg?height=300&width=300&text=Winter+Jacket"],
      condition: "new",
      createdAt: "2024-01-12",
      isFavorited: false,
    },
  ]

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const toggleFavorite = (listingId: string) => {
    // In a real app, this would update the database
    console.log("Toggle favorite for listing:", listingId)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-100 text-green-800"
      case "like-new":
        return "bg-blue-100 text-blue-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "fair":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-400">Buy and sell items with your local community</p>
        </div>
        <Link href="/marketplace/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Listing</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-200">$50 - $200</SelectItem>
                    <SelectItem value="200-500">$200 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="over-1000">Over $1,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">{sortedListings.length} items found</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${listing.isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </Button>
                  <Badge className={`absolute top-2 left-2 ${getConditionColor(listing.condition)}`}>
                    {listing.condition}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-green-600">${listing.price.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {listing.location}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{listing.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={listing.seller.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{listing.seller.name}</span>
                        {listing.seller.verified && (
                          <Badge variant="secondary" className="text-xs px-1">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{listing.seller.rating}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <div className="flex gap-2 w-full">
                    <Link href={`/marketplace/${listing.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sortedListings.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No items found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search criteria or browse different categories.
              </p>
              <Link href="/marketplace/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Listing
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
