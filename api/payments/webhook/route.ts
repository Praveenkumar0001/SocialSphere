import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        // Update transaction status
        await prisma.transaction.update({
          where: { id: session.id },
          data: {
            status: "completed",
            completedAt: new Date(),
          },
        })

        // Update listing status to sold
        if (session.metadata?.listingId) {
          await prisma.marketplaceListing.update({
            where: { id: session.metadata.listingId },
            data: { status: "sold" },
          })
        }

        // Create notification for seller
        if (session.metadata?.sellerId) {
          await prisma.notification.create({
            data: {
              userId: session.metadata.sellerId,
              type: "sale_completed",
              title: "Item Sold!",
              message: "Your item has been sold successfully.",
              data: {
                transactionId: session.id,
                listingId: session.metadata.listingId,
              },
            },
          })
        }

        break

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update transaction status
        await prisma.transaction.updateMany({
          where: { stripeSessionId: paymentIntent.id },
          data: { status: "failed" },
        })

        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
