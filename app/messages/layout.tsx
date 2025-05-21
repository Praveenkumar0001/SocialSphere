import type React from "react"
import AuthCheck from "@/app/components/auth-check"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthCheck>{children}</AuthCheck>
}
