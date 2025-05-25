import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log("✅ Database connection successful")
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

export async function testStripeConnection() {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    await stripe.accounts.retrieve()
    console.log("✅ Stripe connection successful")
    return true
  } catch (error) {
    console.error("❌ Stripe connection failed:", error)
    return false
  }
}

export async function testOpenAIConnection() {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })

    if (response.ok) {
      console.log("✅ OpenAI connection successful")
      return true
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    console.error("❌ OpenAI connection failed:", error)
    return false
  }
}

export async function runAllTests() {
  console.log("🧪 Running connection tests...\n")

  const results = await Promise.all([testDatabaseConnection(), testStripeConnection(), testOpenAIConnection()])

  const allPassed = results.every((result) => result)

  console.log("\n📊 Test Results:")
  console.log(`Database: ${results[0] ? "✅" : "❌"}`)
  console.log(`Stripe: ${results[1] ? "✅" : "❌"}`)
  console.log(`OpenAI: ${results[2] ? "✅" : "❌"}`)
  console.log(`\nOverall: ${allPassed ? "✅ All tests passed" : "❌ Some tests failed"}`)

  return allPassed
}
