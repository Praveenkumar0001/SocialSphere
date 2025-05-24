"use client"

import { ContentModeration } from "@/components/content-moderation"

export default function CreatePostPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

      <ContentModeration
        onContentCheck={(content, callback) => {
          // Simulate content moderation
          setTimeout(() => {
            const isSafe = !content.toLowerCase().includes("hate") && !content.toLowerCase().includes("violence")
            callback({
              isSafe,
              reason: isSafe ? undefined : "Content may violate community guidelines",
            })
          }, 1000)
        }}
        placeholder="What's on your mind?"
        maxLength={500}
        buttonText="Share Post"
        onSubmit={(content) => {
          console.log("Posting content:", content)
          // Handle post submission
        }}
      />
    </div>
  )
}
