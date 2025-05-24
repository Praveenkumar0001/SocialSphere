import express from "express"
import { authenticateUser } from "../middleware/auth"
import { encryptMessage } from "../utils/encryption"
import { moderateContent } from "../utils/moderation"

const router = express.Router()

// Get all conversations for a user
router.get("/conversations", authenticateUser, async (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    res.json({
      conversations: [
        {
          id: "conv-1",
          participants: ["user-1", "user-2"],
          lastMessage: "Hello there!",
          updatedAt: new Date().toISOString(),
        },
        {
          id: "conv-2",
          participants: ["user-1", "user-3"],
          lastMessage: "How are you?",
          updatedAt: new Date().toISOString(),
        },
      ],
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get messages for a conversation
router.get("/conversations/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params

    // In a real implementation, this would fetch from a database
    res.json({
      messages: [
        {
          id: "msg-1",
          conversationId: id,
          senderId: "user-2",
          content: "Hello!",
          encrypted: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "msg-2",
          conversationId: id,
          senderId: "user-1",
          content: "Hi there!",
          encrypted: false,
          createdAt: new Date().toISOString(),
        },
      ],
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Send a message
router.post("/send", authenticateUser, async (req, res) => {
  try {
    const { conversationId, recipientId, content, recipientPublicKey } = req.body

    // Moderate content
    const moderationResult = await moderateContent(content)

    if (!moderationResult.isSafe) {
      return res.status(400).json({
        message: "Message contains inappropriate content",
        reason: moderationResult.reason,
      })
    }

    // Encrypt message if public key is provided
    let encryptedContent = content
    let isEncrypted = false

    if (recipientPublicKey) {
      encryptedContent = encryptMessage(content, recipientPublicKey)
      isEncrypted = true
    }

    // In a real implementation, this would save to a database
    res.json({
      message: {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: req.user?.id,
        recipientId,
        content: encryptedContent,
        encrypted: isEncrypted,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
