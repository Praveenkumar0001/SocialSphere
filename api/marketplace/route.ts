import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { moderateContent } from "@/lib/moderation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const where: any = {
      status: "active",
    }

    if (category && category !== "all") {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const listings = await prisma.marketplaceListing.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.marketplaceListing.count({ where })

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching marketplace listings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, category, images, sellerId } = body

    // Moderate content
    const titleModeration = await moderateContent(title)
    const descriptionModeration = await moderateContent(description)

    if (!titleModeration.isSafe || !descriptionModeration.isSafe) {
      return NextResponse.json(
        {
          error: "Content moderation failed",
          reason: !titleModeration.isSafe ? titleModeration.reason : descriptionModeration.reason,
        },
        { status: 400 },
      )
    }

    // Create Stripe product
    const stripeProduct = await stripe.products.create({
      name: title,
      description: description,
      images: images || [],
    })

    // Create Stripe price
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: "usd",
    })

    const listing = await prisma.marketplaceListing.create({
      data: {
        title,
        description,
        price,
        category,
        sellerId,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        status: "active",
        images: {
          create:
            images?.map((url: string, index: number) => ({
              url,
              order: index,
            })) || [],
        },
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        images: true,
      },
    })

    return NextResponse.json({ listing })
  } catch (error) {
    console.error("Error creating marketplace listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
