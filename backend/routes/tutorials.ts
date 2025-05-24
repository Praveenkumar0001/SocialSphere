import express from "express"
import { authenticateUser } from "../middleware/auth"

const router = express.Router()

// Get all tutorials
router.get("/", async (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    res.json({
      tutorials: [
        {
          id: "tutorial-1",
          title: "Getting Started with SocialSphere",
          description: "Learn the basics of using SocialSphere",
          steps: [
            {
              id: "step-1",
              title: "Create Your Profile",
              content: "Complete your profile with a photo and bio",
              imageUrl: "tutorial1-step1.jpg",
            },
            {
              id: "step-2",
              title: "Find Friends",
              content: "Search for friends or import contacts",
              imageUrl: "tutorial1-step2.jpg",
            },
            {
              id: "step-3",
              title: "Make Your First Post",
              content: "Share a photo or update with your network",
              imageUrl: "tutorial1-step3.jpg",
            },
          ],
          category: "Beginner",
          createdAt: new Date().toISOString(),
        },
        {
          id: "tutorial-2",
          title: "Secure Messaging",
          description: "Learn how to use end-to-end encrypted messaging",
          steps: [
            {
              id: "step-1",
              title: "Understanding E2E Encryption",
              content: "Learn the basics of end-to-end encryption",
              imageUrl: "tutorial2-step1.jpg",
            },
            {
              id: "step-2",
              title: "Starting a Secure Chat",
              content: "How to initiate an encrypted conversation",
              imageUrl: "tutorial2-step2.jpg",
            },
            {
              id: "step-3",
              title: "Verifying Security",
              content: "How to verify that your chat is secure",
              imageUrl: "tutorial2-step3.jpg",
            },
          ],
          category: "Security",
          createdAt: new Date().toISOString(),
        },
      ],
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get tutorial by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // In a real implementation, this would fetch from a database
    res.json({
      tutorial: {
        id,
        title: "Getting Started with SocialSphere",
        description: "Learn the basics of using SocialSphere",
        steps: [
          {
            id: "step-1",
            title: "Create Your Profile",
            content: "Complete your profile with a photo and bio",
            imageUrl: "tutorial1-step1.jpg",
          },
          {
            id: "step-2",
            title: "Find Friends",
            content: "Search for friends or import contacts",
            imageUrl: "tutorial1-step2.jpg",
          },
          {
            id: "step-3",
            title: "Make Your First Post",
            content: "Share a photo or update with your network",
            imageUrl: "tutorial1-step3.jpg",
          },
        ],
        category: "Beginner",
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Track tutorial progress
router.post("/progress", authenticateUser, async (req, res) => {
  try {
    const { tutorialId, stepId, completed } = req.body

    // In a real implementation, this would save to a database
    res.json({
      progress: {
        userId: req.user?.id,
        tutorialId,
        stepId,
        completed,
        updatedAt: new Date().toISOString(),
      },
      message: "Progress updated successfully",
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
