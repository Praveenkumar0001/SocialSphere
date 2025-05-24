import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listingId, buyerId } = body

    // Get listing details
    const listing = await prisma.marketplaceListing.findUnique({
      where: { id: listingId },
      include: {
        seller: true,
      },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: listing.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/marketplace/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/marketplace/${listingId}`,
      metadata: {
        listingId,
        buyerId,
        sellerId: listing.sellerId,
      },
      payment_intent_data: {
        application_fee_amount: Math.round(listing.price * 100 * 0.05), // 5% platform fee
        transfer_data: {
          destination: listing.seller.stripeAccountId || undefined,
        },
      },
    })

    // Create transaction record
    await prisma.transaction.create({
      data: {
        id: session.id,
        listingId,
        buyerId,
        sellerId: listing.sellerId,
        amount: listing.price,
        status: "pending",
        stripeSessionId: session.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
