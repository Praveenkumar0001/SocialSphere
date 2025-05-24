import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, tutorialId, currentStep, completed } = body

    const progress = await prisma.tutorialProgress.upsert({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId,
        },
      },
      update: {
        currentStep,
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId,
        tutorialId,
        currentStep,
        completed,
        completedAt: completed ? new Date() : null,
      },
    })

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error updating tutorial progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
