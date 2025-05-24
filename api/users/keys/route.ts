import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, publicKey } = body

    const user = await prisma.user.update({
      where: { id: userId },
      data: { publicKey },
      select: {
        id: true,
        username: true,
        publicKey: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error updating user keys:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        publicKey: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user keys:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
