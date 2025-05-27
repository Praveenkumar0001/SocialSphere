import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SocialSphere - All Social Media Features in One Platform",
  description:
    "Experience Instagram, WhatsApp, Twitter, Facebook, and Snapchat features all in one beautiful, secure platform. Stories, reels, messaging, live streaming, and more!",
  keywords: "social media, instagram, whatsapp, twitter, facebook, snapchat, stories, reels, messaging, live streaming",
  authors: [{ name: "SocialSphere Team" }],
  openGraph: {
    title: "SocialSphere - All Social Media Features in One Platform",
    description: "The ultimate social media experience combining the best features from all major platforms.",
    type: "website",
    url: "https://socialsphere.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialSphere - All Social Media Features in One Platform",
    description: "The ultimate social media experience combining the best features from all major platforms.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
