import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { encryptMessage } from "./utils/encryption"
import { moderateContent } from "./utils/moderation"
import messageRoutes from "./routes/messages"
import userRoutes from "./routes/users"
import marketplaceRoutes from "./routes/marketplace"
import tutorialRoutes from "./routes/tutorials"

// Load environment variables
dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.use("/api/marketplace", marketplaceRoutes)
app.use("/api/tutorials", tutorialRoutes)

// Socket.io for real-time messaging with E2E encryption
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  // Join a room (conversation)
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId)
    console.log(`User ${socket.id} joined conversation: ${conversationId}`)
  })

  // Send encrypted message
  socket.on("send_message", (data) => {
    // Encrypt message before sending
    const encryptedMessage = encryptMessage(data.message, data.recipientPublicKey)

    // Moderate content
    moderateContent(data.message).then((moderationResult) => {
      if (moderationResult.isSafe) {
        io.to(data.conversationId).emit("receive_message", {
          ...data,
          message: encryptedMessage,
          encrypted: true,
          timestamp: new Date(),
        })
      } else {
        // Send moderation warning to sender
        socket.emit("moderation_warning", {
          originalMessage: data.message,
          reason: moderationResult.reason,
        })
      }
    })
  })

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
