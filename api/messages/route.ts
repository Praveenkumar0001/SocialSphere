import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { moderateContent } from "@/lib/moderation"
import { encryptMessage } from "@/lib/encryption"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")
    const userId = searchParams.get("userId")

    if (!conversationId || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        reactions: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, senderId, recipientId, conversationId, encrypted, publicKey } = body

    // Moderate content before saving
    const moderationResult = await moderateContent(content)

    if (!moderationResult.isSafe) {
      return NextResponse.json(
        {
          error: "Content moderation failed",
          reason: moderationResult.reason,
        },
        { status: 400 },
      )
    }

    // Encrypt message if public key provided
    let finalContent = content
    if (encrypted && publicKey) {
      finalContent = await encryptMessage(content, publicKey)
    }

    const message = await prisma.message.create({
      data: {
        content: finalContent,
        senderId,
        recipientId,
        conversationId,
        encrypted: encrypted || false,
        type: "text",
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
