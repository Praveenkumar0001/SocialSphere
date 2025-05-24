import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const listing = await prisma.marketplaceListing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    return NextResponse.json({ listing })
  } catch (error) {
    console.error("Error fetching marketplace listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, description, price, category, status } = body

    const listing = await prisma.marketplaceListing.update({
      where: { id },
      data: {
        title,
        description,
        price,
        category,
        status,
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
    console.error("Error updating marketplace listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.marketplaceListing.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting marketplace listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
