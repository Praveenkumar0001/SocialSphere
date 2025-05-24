"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [transaction, setTransaction] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Fetch transaction details
      fetch(`/api/payments/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setTransaction(data.transaction)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching transaction:", error)
          setLoading(false)
        })
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>Your purchase has been completed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {transaction && (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold">{transaction.listing?.title}</h3>
                  <p className="text-sm text-muted-foreground">Purchased from {transaction.seller?.name}</p>
                  <p className="font-semibold">${transaction.amount}</p>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Transaction ID: {transaction.id}</p>
                  <p>Date: {new Date(transaction.completedAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/marketplace">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>

              {transaction?.seller && (
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/messages?user=${transaction.seller.id}`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Seller
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-xs text-muted-foreground text-center">
              <p>You will receive an email confirmation shortly.</p>
              <p>For support, contact us at support@socialsphere.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
