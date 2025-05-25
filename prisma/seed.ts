import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        id: "user_1",
        email: "john@example.com",
        username: "johndoe",
        name: "John Doe",
        bio: "Software developer and tech enthusiast",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "jane@example.com" },
      update: {},
      create: {
        id: "user_2",
        email: "jane@example.com",
        username: "janesmith",
        name: "Jane Smith",
        bio: "Designer and creative professional",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "mike@example.com" },
      update: {},
      create: {
        id: "user_3",
        email: "mike@example.com",
        username: "mikejohnson",
        name: "Mike Johnson",
        bio: "Entrepreneur and startup founder",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: false,
      },
    }),
  ])

  console.log("✅ Created users:", users.length)

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        id: "post_1",
        content: "Just launched my new project! Excited to share it with everyone. 🚀",
        type: "TEXT",
        authorId: "user_1",
        tags: ["launch", "project", "excited"],
      },
    }),
    prisma.post.create({
      data: {
        id: "post_2",
        content: "Beautiful sunset today! Nature never fails to amaze me.",
        type: "IMAGE",
        mediaUrls: ["/placeholder.svg?height=400&width=600&text=Sunset"],
        authorId: "user_2",
        tags: ["nature", "sunset", "photography"],
      },
    }),
    prisma.post.create({
      data: {
        id: "post_3",
        content: "What's your favorite programming language?",
        type: "POLL",
        authorId: "user_3",
        pollOptions: {
          options: [
            { id: "1", text: "JavaScript", votes: 45 },
            { id: "2", text: "Python", votes: 38 },
            { id: "3", text: "TypeScript", votes: 32 },
            { id: "4", text: "Go", votes: 15 },
          ],
        },
        pollEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        tags: ["programming", "poll", "languages"],
      },
    }),
  ])

  console.log("✅ Created posts:", posts.length)

  // Create sample marketplace listings
  const listings = await Promise.all([
    prisma.marketplaceListing.create({
      data: {
        id: "listing_1",
        title: "iPhone 14 Pro Max - 256GB",
        description: "Excellent condition iPhone 14 Pro Max in Space Black. Includes original box and charger.",
        price: 899.99,
        category: "Electronics",
        condition: "like-new",
        location: "San Francisco, CA",
        sellerId: "user_1",
        status: "ACTIVE",
        images: [
          { url: "/placeholder.svg?height=400&width=400&text=iPhone+Front" },
          { url: "/placeholder.svg?height=400&width=400&text=iPhone+Back" },
        ],
        specifications: {
          brand: "Apple",
          model: "iPhone 14 Pro Max",
          storage: "256GB",
          color: "Space Black",
          carrier: "Unlocked",
        },
        moderationStatus: "approved",
      },
    }),
    prisma.marketplaceListing.create({
      data: {
        id: "listing_2",
        title: 'MacBook Pro 16" M2 Max',
        description: "Powerful MacBook Pro with M2 Max chip. Perfect for developers and creators.",
        price: 2499.99,
        category: "Electronics",
        condition: "new",
        location: "New York, NY",
        sellerId: "user_2",
        status: "ACTIVE",
        images: [{ url: "/placeholder.svg?height=400&width=400&text=MacBook+Pro" }],
        specifications: {
          brand: "Apple",
          model: 'MacBook Pro 16"',
          processor: "M2 Max",
          memory: "32GB",
          storage: "1TB SSD",
        },
        moderationStatus: "approved",
      },
    }),
  ])

  console.log("✅ Created marketplace listings:", listings.length)

  // Create sample tutorials
  const tutorials = await Promise.all([
    prisma.tutorial.create({
      data: {
        id: "tutorial_1",
        title: "Getting Started with SocialSphere",
        description: "Learn the basics of using SocialSphere platform",
        category: "basics",
        difficulty: "beginner",
        estimatedTime: 10,
        steps: [
          {
            id: 1,
            title: "Create Your Profile",
            description: "Set up your profile with a photo and bio",
            action: "navigate",
            target: "/profile/edit",
          },
          {
            id: 2,
            title: "Make Your First Post",
            description: "Share something with the community",
            action: "navigate",
            target: "/create-post",
          },
          {
            id: 3,
            title: "Follow Other Users",
            description: "Connect with people you find interesting",
            action: "navigate",
            target: "/explore",
          },
        ],
        tags: ["basics", "getting-started", "profile"],
      },
    }),
    prisma.tutorial.create({
      data: {
        id: "tutorial_2",
        title: "Secure Messaging",
        description: "Learn how to use end-to-end encrypted messaging",
        category: "security",
        difficulty: "intermediate",
        estimatedTime: 15,
        steps: [
          {
            id: 1,
            title: "Enable Encryption",
            description: "Turn on end-to-end encryption for your messages",
            action: "click",
            target: "#enable-encryption",
          },
          {
            id: 2,
            title: "Send Encrypted Message",
            description: "Send your first encrypted message",
            action: "navigate",
            target: "/messages",
          },
          {
            id: 3,
            title: "Verify Encryption",
            description: "Check that your messages are properly encrypted",
            action: "click",
            target: "#verify-encryption",
          },
        ],
        tags: ["security", "messaging", "encryption"],
      },
    }),
  ])

  console.log("✅ Created tutorials:", tutorials.length)

  // Create sample conversations
  const conversation = await prisma.conversation.create({
    data: {
      id: "conv_1",
      name: "General Chat",
      isGroup: false,
    },
  })

  await Promise.all([
    prisma.conversationParticipant.create({
      data: {
        userId: "user_1",
        conversationId: conversation.id,
      },
    }),
    prisma.conversationParticipant.create({
      data: {
        userId: "user_2",
        conversationId: conversation.id,
      },
    }),
  ])

  console.log("✅ Created conversation with participants")

  // Create sample messages
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        id: "msg_1",
        content: "Hey! How are you doing?",
        senderId: "user_1",
        receiverId: "user_2",
        conversationId: conversation.id,
      },
    }),
    prisma.message.create({
      data: {
        id: "msg_2",
        content: "I'm doing great! Thanks for asking. How about you?",
        senderId: "user_2",
        receiverId: "user_1",
        conversationId: conversation.id,
      },
    }),
  ])

  console.log("✅ Created messages:", messages.length)

  console.log("🎉 Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
