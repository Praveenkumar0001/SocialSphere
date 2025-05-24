"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Shield, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentCheckoutProps {
  listing: {
    id: string
    title: string
    description: string
    price: number
    category: string
    images: { url: string }[]
    seller: {
      id: string
      name: string
      username: string
      avatar?: string
    }
  }
  buyerId: string
}

export function PaymentCheckout({ listing, buyerId }: PaymentCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: listing.id,
          buyerId,
        }),
      })

      const { sessionId, url } = await response.json()

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        // Use Stripe.js for embedded checkout
        const stripe = await stripePromise
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId })
          if (error) {
            toast({
              title: "Payment Error",
              description: error.message,
              variant: "destructive",
            })
          }
        }
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Purchase Item
        </CardTitle>
        <CardDescription>Complete your purchase securely with Stripe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">{listing.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
          <Badge variant="secondary">{listing.category}</Badge>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <img
            src={listing.seller.avatar || "/placeholder.svg?height=40&width=40"}
            alt={listing.seller.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{listing.seller.name}</p>
            <p className="text-xs text-muted-foreground">@{listing.seller.username}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Item Price</span>
            <span>${listing.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Platform Fee (5%)</span>
            <span>${(listing.price * 0.05).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(listing.price * 1.05).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3" />
            <span>Secure payment powered by Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-3 w-3" />
            <span>Buyer protection included</span>
          </div>
        </div>

        <Button onClick={handleCheckout} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${(listing.price * 1.05).toFixed(2)}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
