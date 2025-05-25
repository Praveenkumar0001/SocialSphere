"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Heart,
  MessageCircle,
  Star,
  MapPin,
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PaymentCheckout } from "@/components/payment-checkout"

interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  condition: "new" | "like-new" | "good" | "fair"
  images: string[]
  seller: {
    id: string
    name: string
    username: string
    avatar: string
    rating: number
    verified: boolean
    responseTime: string
    totalSales: number
  }
  location: string
  shipping: {
    free: boolean
    cost?: number
    estimatedDays: number
  }
  features: string[]
  tags: string[]
  createdAt: string
  views: number
  likes: number
  isLiked: boolean
  inStock: boolean
  quantity: number
}

export function EnhancedMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showPayment, setShowPayment] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const { toast } = useToast()

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "item-1",
      title: "iPhone 14 Pro Max - 256GB Space Black",
      description:
        "Excellent condition iPhone 14 Pro Max with original box, charger, and screen protector. No scratches or damage. Battery health at 98%.",
      price: 899,
      originalPrice: 1099,
      category: "Electronics",
      condition: "like-new",
      images: [
        "/placeholder.svg?height=400&width=400&text=iPhone+Front",
        "/placeholder.svg?height=400&width=400&text=iPhone+Back",
        "/placeholder.svg?height=400&width=400&text=iPhone+Box",
      ],
      seller: {
        id: "seller-1",
        name: "Sarah Johnson",
        username: "sarahj_tech",
        avatar: "/placeholder.svg?height=50&width=50&text=SJ",
        rating: 4.9,
        verified: true,
        responseTime: "Usually responds within 1 hour",
        totalSales: 47,
      },
      location: "San Francisco, CA",
      shipping: {
        free: true,
        estimatedDays: 2,
      },
      features: ["Face ID", "5G", "Pro Camera System", "A16 Bionic"],
      tags: ["smartphone", "apple", "premium", "unlocked"],
      createdAt: "2024-01-15T10:30:00Z",
      views: 234,
      likes: 18,
      isLiked: false,
      inStock: true,
      quantity: 1,
    },
    {
      id: "item-2",
      title: "MacBook Air M2 - 13 inch, 8GB RAM, 256GB SSD",
      description:
        "Barely used MacBook Air M2 in pristine condition. Perfect for students and professionals. Includes original charger and box.",
      price: 999,
      originalPrice: 1199,
      category: "Electronics",
      condition: "like-new",
      images: [
        "/placeholder.svg?height=400&width=400&text=MacBook+Closed",
        "/placeholder.svg?height=400&width=400&text=MacBook+Open",
        "/placeholder.svg?height=400&width=400&text=MacBook+Ports",
      ],
      seller: {
        id: "seller-2",
        name: "Alex Chen",
        username: "alexc_gadgets",
        avatar: "/placeholder.svg?height=50&width=50&text=AC",
        rating: 4.8,
        verified: true,
        responseTime: "Usually responds within 30 minutes",
        totalSales: 23,
      },
      location: "Austin, TX",
      shipping: {
        free: false,
        cost: 15,
        estimatedDays: 3,
      },
      features: ["M2 Chip", "Retina Display", "All-day Battery", "Touch ID"],
      tags: ["laptop", "apple", "portable", "work"],
      createdAt: "2024-01-14T15:20:00Z",
      views: 156,
      likes: 12,
      isLiked: true,
      inStock: true,
      quantity: 1,
    },
    {
      id: "item-3",
      title: "Vintage Leather Sofa - Mid-Century Modern",
      description:
        "Beautiful vintage leather sofa in excellent condition. Perfect centerpiece for any living room. Professionally cleaned and conditioned.",
      price: 450,
      category: "Furniture",
      condition: "good",
      images: [
        "/placeholder.svg?height=400&width=400&text=Sofa+Front",
        "/placeholder.svg?height=400&width=400&text=Sofa+Side",
        "/placeholder.svg?height=400&width=400&text=Sofa+Detail",
      ],
      seller: {
        id: "seller-3",
        name: "Emma Wilson",
        username: "emmaw_vintage",
        avatar: "/placeholder.svg?height=50&width=50&text=EW",
        rating: 4.7,
        verified: false,
        responseTime: "Usually responds within 2 hours",
        totalSales: 15,
      },
      location: "Brooklyn, NY",
      shipping: {
        free: false,
        cost: 75,
        estimatedDays: 7,
      },
      features: ["Genuine Leather", "Solid Wood Frame", "Mid-Century Design"],
      tags: ["furniture", "vintage", "leather", "living-room"],
      createdAt: "2024-01-13T09:45:00Z",
      views: 89,
      likes: 7,
      isLiked: false,
      inStock: true,
      quantity: 1,
    },
  ]

  const categories = [
    "All Categories",
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Sports",
    "Automotive",
    "Home & Garden",
  ]

  const handleLike = (itemId: string) => {
    toast({
      title: "Added to favorites",
      description: "Item saved to your favorites list",
    })
  }

  const handleMessage = (seller: any) => {
    toast({
      title: "Message sent",
      description: `Started conversation with ${seller.name}`,
    })
  }

  const handleBuyNow = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setShowPayment(true)
  }

  const handleAddToCart = (item: MarketplaceItem) => {
    toast({
      title: "Added to cart",
      description: `${item.title} added to your cart`,
    })
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

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
        <p className="text-gray-600">Buy and sell with your community</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="over-1000">Over $1,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative">
              <img src={item.images[0] || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => handleLike(item.id)}
              >
                <Heart className={`h-4 w-4 ${item.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <Badge className={`absolute top-2 left-2 ${getConditionColor(item.condition)}`}>{item.condition}</Badge>
              {item.originalPrice && (
                <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item.location}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {item.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.features.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{item.seller.name}</span>
                    {item.seller.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{item.seller.rating}</span>
                  <span className="text-xs text-gray-500">({item.seller.totalSales})</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Truck className="h-3 w-3" />
                {item.shipping.free ? (
                  <span className="text-green-600 font-medium">Free shipping</span>
                ) : (
                  <span>Shipping: ${item.shipping.cost}</span>
                )}
                <span>• {item.shipping.estimatedDays} days</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{item.views} views</span>
                <span>{item.likes} likes</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleMessage(item.seller)}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleBuyNow(item)}>
                  <CreditCard className="h-4 w-4 mr-1" />
                  Buy Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create Listing Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Sell Item
        </Button>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedItem && (
        <PaymentCheckout
          item={selectedItem}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false)
            toast({
              title: "Purchase successful!",
              description: "Your order has been placed successfully",
            })
          }}
        />
      )}
    </div>
  )
}
