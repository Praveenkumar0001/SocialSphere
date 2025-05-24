import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as {
      id: string
      email: string
      role: string
    }

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" })
  }

  next()
}
