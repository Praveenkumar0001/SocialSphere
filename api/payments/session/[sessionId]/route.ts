import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const { sessionId } = params

    const transaction = await prisma.transaction.findUnique({
      where: { id: sessionId },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ transaction })
  } catch (error) {
    console.error("Error fetching transaction:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
