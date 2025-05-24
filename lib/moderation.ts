import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ModerationResult {
  isSafe: boolean
  reason?: string
  categories?: Record<string, number>
  flagged?: boolean
}

export async function moderateContent(content: string): Promise<ModerationResult> {
  try {
    // Use OpenAI's Moderation API
    const response = await openai.moderations.create({
      input: content,
    })

    const result = response.results[0]

    if (result.flagged) {
      const flaggedCategories = Object.entries(result.categories)
        .filter(([_, flagged]) => flagged)
        .map(([category]) => category)

      return {
        isSafe: false,
        flagged: true,
        reason: `Content flagged for: ${flaggedCategories.join(", ")}`,
        categories: result.category_scores,
      }
    }

    return {
      isSafe: true,
      flagged: false,
      categories: result.category_scores,
    }
  } catch (error) {
    console.error("Moderation API error:", error)

    // Fallback to basic keyword filtering
    const sensitiveWords = [
      "hate",
      "violence",
      "abuse",
      "explicit",
      "offensive",
      "harassment",
      "threat",
      "spam",
      "scam",
      "fraud",
    ]

    const lowerContent = content.toLowerCase()
    const foundWords = sensitiveWords.filter((word) => lowerContent.includes(word))

    if (foundWords.length > 0) {
      return {
        isSafe: false,
        reason: `Content contains potentially inappropriate words: ${foundWords.join(", ")}`,
      }
    }

    // Default to safe if both AI and fallback don't flag
    return { isSafe: true }
  }
}

export async function moderateImage(imageUrl: string): Promise<ModerationResult> {
  try {
    // For image moderation, you would typically use a service like:
    // - Google Cloud Vision API
    // - AWS Rekognition
    // - Azure Computer Vision
    // - Clarifai

    // For now, we'll return safe as a placeholder
    return { isSafe: true }
  } catch (error) {
    console.error("Image moderation error:", error)
    return { isSafe: true }
  }
}

export async function moderateVideo(videoUrl: string): Promise<ModerationResult> {
  try {
    // Video moderation would require specialized services
    // For now, we'll return safe as a placeholder
    return { isSafe: true }
  } catch (error) {
    console.error("Video moderation error:", error)
    return { isSafe: true }
  }
}
