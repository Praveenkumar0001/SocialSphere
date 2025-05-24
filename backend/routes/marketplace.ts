import express from "express"
import { authenticateUser } from "../middleware/auth"
import { moderateContent } from "../utils/moderation"

const router = express.Router()

// Get all marketplace listings
router.get("/listings", async (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    res.json({
      listings: [
        {
          id: "listing-1",
          title: "iPhone 13 Pro",
          description: "Like new, barely used",
          price: 799.99,
          category: "Electronics",
          sellerId: "user-2",
          images: ["image1.jpg", "image2.jpg"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "listing-2",
          title: "Mountain Bike",
          description: "Great condition, 1 year old",
          price: 350,
          category: "Sports",
          sellerId: "user-3",
          images: ["bike1.jpg"],
          createdAt: new Date().toISOString(),
        },
      ],
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get listing by ID
router.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params

    // In a real implementation, this would fetch from a database
    res.json({
      listing: {
        id,
        title: "iPhone 13 Pro",
        description: "Like new, barely used",
        price: 799.99,
        category: "Electronics",
        sellerId: "user-2",
        sellerName: "Jane Smith",
        images: ["image1.jpg", "image2.jpg"],
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new listing
router.post("/listings", authenticateUser, async (req, res) => {
  try {
    const { title, description, price, category, images } = req.body

    // Moderate content
    const titleModeration = await moderateContent(title)
    const descriptionModeration = await moderateContent(description)

    if (!titleModeration.isSafe || !descriptionModeration.isSafe) {
      return res.status(400).json({
        message: "Listing contains inappropriate content",
        reason: !titleModeration.isSafe ? titleModeration.reason : descriptionModeration.reason,
      })
    }

    // In a real implementation, this would save to a database
    res.json({
      listing: {
        id: `listing-${Date.now()}`,
        title,
        description,
        price,
        category,
        sellerId: req.user?.id,
        images: images || [],
        createdAt: new Date().toISOString(),
      },
      message: "Listing created successfully",
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update a listing
router.put("/listings/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, price, category, images } = req.body

    // Moderate content
    const titleModeration = await moderateContent(title)
    const descriptionModeration = await moderateContent(description)

    if (!titleModeration.isSafe || !descriptionModeration.isSafe) {
      return res.status(400).json({
        message: "Listing contains inappropriate content",
        reason: !titleModeration.isSafe ? titleModeration.reason : descriptionModeration.reason,
      })
    }

    // In a real implementation, this would update in a database
    res.json({
      listing: {
        id,
        title,
        description,
        price,
        category,
        sellerId: req.user?.id,
        images: images || [],
        updatedAt: new Date().toISOString(),
      },
      message: "Listing updated successfully",
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a listing
router.delete("/listings/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params

    // In a real implementation, this would delete from a database
    res.json({
      message: `Listing ${id} deleted successfully`,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
