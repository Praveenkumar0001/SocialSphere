import { type NextRequest, NextResponse } from "next/server"
import { Server } from "socket.io"
import { createServer } from "http"

let io: Server

export async function GET(request: NextRequest) {
  if (!io) {
    const httpServer = createServer()
    io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    })

    // Socket.io connection handling
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      socket.on("join_conversation", (conversationId) => {
        socket.join(conversationId)
      })

      socket.on("send_message", async (data) => {
        // Handle encrypted messaging
        io.to(data.conversationId).emit("receive_message", {
          ...data,
          timestamp: new Date(),
        })
      })

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
      })
    })
  }

  return NextResponse.json({ message: "Socket.io server initialized" })
}
