import { type NextRequest, NextResponse } from "next/server"
import { moderateContent } from "@/lib/moderation"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const result = await moderateContent(content)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Moderation API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
