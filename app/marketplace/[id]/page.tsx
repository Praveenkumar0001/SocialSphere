"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaymentCheckout } from "@/components/payment-checkout"
import { ArrowLeft, Heart, Share2, MessageCircle, Star } from "lucide-react"
import Link from "next/link"

export default function MarketplaceItemPage() {
  const params = useParams()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCheckout, setShowCheckout] = useState(false)
  const [currentUserId] = useState("user_123") // Replace with actual user ID

  useEffect(() => {
    if (params.id) {
      fetchListing(params.id as string)
    }
  }, [params.id])

  const fetchListing = async (id: string) => {
    try {
      const response = await fetch(`/api/marketplace/${id}`)
      const data = await response.json()
      setListing(data.listing)
    } catch (error) {
      console.error("Error fetching listing:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Item not found</h1>
          <p className="text-muted-foreground">The item you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {listing.images?.[0] ? (
              <img
                src={listing.images[0].url || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          {listing.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1, 5).map((image: any, index: number) => (
                <div key={index} className="aspect-square bg-muted rounded overflow-hidden">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`${listing.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{listing.category}</Badge>
              <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <p className="text-2xl font-bold text-primary mt-2">${listing.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage src={listing.seller.avatar || "/placeholder.svg"} />
              <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{listing.seller.name}</h3>
              <p className="text-sm text-muted-foreground">@{listing.seller.username}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">4.8 (124 reviews)</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {listing.status === "active" && listing.seller.id !== currentUserId && (
            <div className="space-y-4">
              {!showCheckout ? (
                <Button onClick={() => setShowCheckout(true)} className="w-full" size="lg">
                  Buy Now - ${listing.price.toFixed(2)}
                </Button>
              ) : (
                <PaymentCheckout listing={listing} buyerId={currentUserId} />
              )}
            </div>
          )}

          {listing.seller.id === currentUserId && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">This is your listing</p>
              <Button variant="outline" className="mt-2">
                Edit Listing
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
