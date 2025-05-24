import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const userId = searchParams.get("userId")

    const where: any = { isActive: true }
    if (category && category !== "all") {
      where.category = category
    }

    const tutorials = await prisma.tutorial.findMany({
      where,
      include: userId
        ? {
            progress: {
              where: { userId },
              select: {
                currentStep: true,
                completed: true,
                completedAt: true,
              },
            },
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ tutorials })
  } catch (error) {
    console.error("Error fetching tutorials:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
