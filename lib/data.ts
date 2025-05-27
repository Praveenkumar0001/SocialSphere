
import type { Notification } from "./types"

// Mock current user
// export const currentUser: User = {
//   id: "user-1",
//   name: "John Smith",
//   username: "johnsmith",
//   email: "john@example.com",
//   bio: "Software developer and tech enthusiast",
//   avatar: "/placeholder.svg?height=40&width=40",
//   coverImage: "/placeholder.svg?height=300&width=800",
//   location: "San Francisco, CA",
//   website: "https://johnsmith.dev",
//   followers: ["user-2", "user-3"],
//   following: ["user-2", "user-4"],
//   posts: ["post-1", "post-3", "post-5"],
//   createdAt: "2023-01-15T00:00:00Z",
//   isVerified: true,
// }

// Function to get the current user
// export function getCurrentUser(): User {
//   return currentUser
// }

// Mock users
// export const users: User[] = [
//   currentUser,
//   {
//     id: "user-2",
//     name: "Jane Doe",
//     username: "janedoe",
//     email: "jane@example.com",
//     bio: "Digital artist and designer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     coverImage: "/placeholder.svg?height=300&width=800",
//     location: "New York, NY",
//     website: "https://janedoe.art",
//     followers: ["user-1", "user-3", "user-4"],
//     following: ["user-1"],
//     posts: ["post-2", "post-4"],
//     createdAt: "2023-02-20T00:00:00Z",
//     isVerified: false,
//   },
//   {
//     id: "user-3",
//     name: "Alex Smith",
//     username: "alexsmith",
//     email: "alex@example.com",
//     bio: "Travel photographer and adventurer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     coverImage: "/placeholder.svg?height=300&width=800",
//     location: "London, UK",
//     website: "https://alexsmith.photos",
//     followers: ["user-2"],
//     following: ["user-1", "user-2"],
//     posts: ["post-6"],
//     createdAt: "2023-03-10T00:00:00Z",
//     isVerified: false,
//   },
//   {
//     id: "user-4",
//     name: "Taylor Swift",
//     username: "taylorswift",
//     email: "taylor@example.com",
//     bio: "Singer, songwriter, and music producer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     coverImage: "/placeholder.svg?height=300&width=800",
//     location: "Nashville, TN",
//     website: "https://taylorswift.com",
//     followers: ["user-1", "user-2", "user-3"],
//     following: ["user-2"],
//     posts: ["post-7"],
//     createdAt: "2023-04-05T00:00:00Z",
//     isVerified: true,
//     provider: "twitter",
//   },
// ]

// Mock posts
// export const posts: Post[] = [
//   {
//     id: "post-1",
//     userId: "user-1",
//     content: "Just launched my new website! Check it out at https://johnsmith.dev #webdev #coding",
//     images: ["/placeholder.svg?height=400&width=600"],
//     createdAt: "2023-05-10T14:30:00Z",
//     likes: ["user-2", "user-3"],
//     comments: [
//       {
//         id: "comment-1",
//         userId: "user-2",
//         content: "Looks amazing! Love the design.",
//         createdAt: "2023-05-10T15:00:00Z",
//         likes: ["user-1"],
//       },
//     ],
//     shares: 3,
//     mentions: [],
//     hashtags: ["webdev", "coding"],
//   },
//   {
//     id: "post-2",
//     userId: "user-2",
//     content: "Just finished this new illustration. What do you think? #art #digital",
//     images: ["/placeholder.svg?height=600&width=600"],
//     createdAt: "2023-05-09T10:15:00Z",
//     likes: ["user-1", "user-3", "user-4"],
//     comments: [
//       {
//         id: "comment-2",
//         userId: "user-1",
//         content: "This is incredible! Your style is so unique.",
//         createdAt: "2023-05-09T10:30:00Z",
//         likes: ["user-2"],
//       },
//       {
//         id: "comment-3",
//         userId: "user-4",
//         content: "Love the colors!",
//         createdAt: "2023-05-09T11:45:00Z",
//         likes: [],
//       },
//     ],
//     shares: 7,
//     mentions: [],
//     hashtags: ["art", "digital"],
//   },
//   {
//     id: "post-3",
//     userId: "user-1",
//     content: "Working on a new project with @janedoe. Excited to share more soon! #collaboration",
//     createdAt: "2023-05-08T09:20:00Z",
//     likes: ["user-2"],
//     comments: [],
//     shares: 1,
//     mentions: ["janedoe"],
//     hashtags: ["collaboration"],
//   },
//   {
//     id: "post-4",
//     userId: "user-2",
//     content: "Beautiful sunset at the beach today. #photography #nature",
//     images: ["/placeholder.svg?height=400&width=800"],
//     createdAt: "2023-05-07T19:45:00Z",
//     likes: ["user-1", "user-3"],
//     comments: [
//       {
//         id: "comment-4",
//         userId: "user-3",
//         content: "Stunning shot! Where was this taken?",
//         createdAt: "2023-05-07T20:00:00Z",
//         likes: ["user-2"],
//       },
//     ],
//     shares: 5,
//     mentions: [],
//     hashtags: ["photography", "nature"],
//   },
//   {
//     id: "post-5",
//     userId: "user-1",
//     content: "Just learned a new coding technique that will change how I build applications! #coding #javascript",
//     createdAt: "2023-05-06T16:30:00Z",
//     likes: ["user-2", "user-3"],
//     comments: [
//       {
//         id: "comment-5",
//         userId: "user-3",
//         content: "Care to share more details?",
//         createdAt: "2023-05-06T16:45:00Z",
//         likes: [],
//       },
//     ],
//     shares: 2,
//     mentions: [],
//     hashtags: ["coding", "javascript"],
//   },
//   {
//     id: "post-6",
//     userId: "user-3",
//     content: "Exploring the streets of Tokyo. Such an amazing city! #travel #japan",
//     images: ["/placeholder.svg?height=600&width=800"],
//     createdAt: "2023-05-05T08:10:00Z",
//     likes: ["user-1", "user-2", "user-4"],
//     comments: [
//       {
//         id: "comment-6",
//         userId: "user-1",
//         content: "Looks amazing! I want to visit Japan someday.",
//         createdAt: "2023-05-05T08:30:00Z",
//         likes: ["user-3"],
//       },
//     ],
//     shares: 8,
//     mentions: [],
//     hashtags: ["travel", "japan"],
//   },
//   {
//     id: "post-7",
//     userId: "user-4",
//     content: "Working on a new song today. Can't wait for you all to hear it! #music #newrelease",
//     createdAt: "2023-05-04T14:20:00Z",
//     likes: ["user-1", "user-2", "user-3"],
//     comments: [
//       {
//         id: "comment-7",
//         userId: "user-2",
//         content: "So excited! When will it be released?",
//         createdAt: "2023-05-04T14:35:00Z",
//         likes: ["user-4"],
//       },
//     ],
//     shares: 15,
//     mentions: [],
//     hashtags: ["music", "newrelease"],
//   },
// ]

// Mock conversations
// export const conversations: Conversation[] = [
//   {
//     id: "conv-1",
//     participants: ["user-1", "user-2"],
//     updatedAt: "2023-05-10T16:30:00Z",
//   },
//   {
//     id: "conv-2",
//     participants: ["user-1", "user-3"],
//     updatedAt: "2023-05-09T12:15:00Z",
//   },
//   {
//     id: "conv-3",
//     participants: ["user-1", "user-4"],
//     updatedAt: "2023-05-08T09:45:00Z",
//   },
// ]

// Mock messages with reactions and attachments
// export const messages: Message[] = [
//   {
//     id: "msg-1",
//     senderId: "user-1",
//     receiverId: "user-2",
//     content: "Hey Jane, how's the project coming along?",
//     createdAt: "2023-05-10T16:30:00Z",
//     read: true,
//     readAt: "2023-05-10T16:31:00Z",
//     reactions: [],
//   },
//   {
//     id: "msg-2",
//     senderId: "user-2",
//     receiverId: "user-1",
//     content: "Hi John! It's going well. I'll send you the designs tomorrow.",
//     createdAt: "2023-05-10T16:35:00Z",
//     read: true,
//     readAt: "2023-05-10T16:36:00Z",
//     reactions: [
//       {
//         userId: "user-1",
//         emoji: "👍",
//         createdAt: "2023-05-10T16:36:30Z",
//       },
//     ],
//   },
//   {
//     id: "msg-3",
//     senderId: "user-1",
//     receiverId: "user-2",
//     content: "Sounds good! Looking forward to seeing them.",
//     createdAt: "2023-05-10T16:40:00Z",
//     read: false,
//     reactions: [],
//   },
//   {
//     id: "msg-4",
//     senderId: "user-1",
//     receiverId: "user-3",
//     content: "Hey Alex, are you still planning to visit next month?",
//     createdAt: "2023-05-09T12:15:00Z",
//     read: true,
//     readAt: "2023-05-09T12:20:00Z",
//     reactions: [],
//   },
//   {
//     id: "msg-5",
//     senderId: "user-3",
//     receiverId: "user-1",
//     content: "Yes, I'll be there from the 15th to the 20th!",
//     createdAt: "2023-05-09T12:20:00Z",
//     read: true,
//     readAt: "2023-05-09T12:25:00Z",
//     reactions: [
//       {
//         userId: "user-1",
//         emoji: "🎉",
//         createdAt: "2023-05-09T12:26:00Z",
//       },
//     ],
//   },
//   {
//     id: "msg-6",
//     senderId: "user-1",
//     receiverId: "user-4",
//     content: "Hi Taylor, I loved your latest album!",
//     createdAt: "2023-05-08T09:45:00Z",
//     read: true,
//     readAt: "2023-05-08T10:00:00Z",
//     reactions: [],
//   },
//   {
//     id: "msg-7",
//     senderId: "user-4",
//     receiverId: "user-1",
//     content: "Thanks John! That means a lot to me.",
//     createdAt: "2023-05-08T10:00:00Z",
//     read: true,
//     readAt: "2023-05-08T10:05:00Z",
//     reactions: [
//       {
//         userId: "user-1",
//         emoji: "❤️",
//         createdAt: "2023-05-08T10:06:00Z",
//       },
//     ],
//   },
//   {
//     id: "msg-8",
//     senderId: "user-2",
//     receiverId: "user-1",
//     content: "Here are the design files I promised!",
//     createdAt: "2023-05-11T09:30:00Z",
//     read: true,
//     readAt: "2023-05-11T09:35:00Z",
//     reactions: [
//       {
//         userId: "user-1",
//         emoji: "🙌",
//         createdAt: "2023-05-11T09:36:00Z",
//       },
//     ],
//     attachments: [
//       {
//         id: "attach-1",
//         type: "file",
//         url: "/placeholder.svg?height=100&width=100",
//         name: "project_designs.zip",
//         size: 15000000,
//       },
//     ],
//   },
//   {
//     id: "msg-9",
//     senderId: "user-3",
//     receiverId: "user-1",
//     content: "Check out this photo from my trip!",
//     createdAt: "2023-05-10T14:20:00Z",
//     read: true,
//     readAt: "2023-05-10T14:25:00Z",
//     reactions: [
//       {
//         userId: "user-1",
//         emoji: "😍",
//         createdAt: "2023-05-10T14:26:00Z",
//       },
//     ],
//     attachments: [
//       {
//         id: "attach-2",
//         type: "image",
//         url: "/placeholder.svg?height=600&width=800",
//         name: "tokyo_skyline.jpg",
//         thumbnailUrl: "/placeholder.svg?height=200&width=200",
//       },
//     ],
//   },
// ]

// Mock notifications
// export const notifications: Notification[] = [
//   {
//     id: "notif-1",
//     userId: "user-1",
//     type: "like",
//     actorId: "user-2",
//     postId: "post-1",
//     read: false,
//     createdAt: "2023-05-10T15:00:00Z",
//   },
//   {
//     id: "notif-2",
//     userId: "user-1",
//     type: "comment",
//     actorId: "user-2",
//     postId: "post-1",
//     commentId: "comment-1",
//     read: false,
//     createdAt: "2023-05-10T15:05:00Z",
//   },
//   {
//     id: "notif-3",
//     userId: "user-1",
//     type: "follow",
//     actorId: "user-3",
//     read: true,
//     createdAt: "2023-05-09T14:30:00Z",
//   },
//   {
//     id: "notif-4",
//     userId: "user-1",
//     type: "mention",
//     actorId: "user-4",
//     postId: "post-7",
//     read: true,
//     createdAt: "2023-05-08T11:20:00Z",
//   },
//   {
//     id: "notif-5",
//     userId: "user-1",
//     type: "message",
//     actorId: "user-2",
//     read: false,
//     createdAt: "2023-05-10T16:35:00Z",
//   },
// ]

// Helper functions for data manipulation
// export function toggleLike(postId: string, userId: string): Post {
//   const post = posts.find((p) => p.id === postId)
//   if (!post) throw new Error("Post not found")

//   const likeIndex = post.likes.indexOf(userId)
//   if (likeIndex === -1) {
//     post.likes.push(userId)
//   } else {
//     post.likes.splice(likeIndex, 1)
//   }

//   return post
// }

// export function addComment(postId: string, userId: string, content: string): Comment {
//   const post = posts.find((p) => p.id === postId)
//   if (!post) throw new Error("Post not found")

//   const newComment: Comment = {
//     id: `comment-${Date.now()}`,
//     userId,
//     content,
//     createdAt: new Date().toISOString(),
//     likes: [],
//   }

//   post.comments.push(newComment)
//   return newComment
// }

// export function sharePost(postId: string): Post {
//   const post = posts.find((p) => p.id === postId)
//   if (!post) throw new Error("Post not found")

//   post.shares += 1
//   return post
// }

// export function followUser(followerId: string, followeeId: string): User {
//   const follower = users.find((u) => u.id === followerId)
//   const followee = users.find((u) => u.id === followeeId)

//   if (!follower || !followee) throw new Error("User not found")

//   if (!follower.following.includes(followeeId)) {
//     follower.following.push(followeeId)
//   }

//   if (!followee.followers.includes(followerId)) {
//     followee.followers.push(followerId)
//   }

//   return followee
// }

// export function unfollowUser(followerId: string, followeeId: string): User {
//   const follower = users.find((u) => u.id === followerId)
//   const followee = users.find((u) => u.id === followeeId)

//   if (!follower || !followee) throw new Error("User not found")

//   const followingIndex = follower.following.indexOf(followeeId)
//   if (followingIndex !== -1) {
//     follower.following.splice(followingIndex, 1)
//   }

//   const followerIndex = followee.followers.indexOf(followerId)
//   if (followerIndex !== -1) {
//     followee.followers.splice(followerIndex, 1)
//   }

//   return followee
// }

// export function updateUserProfile(userId: string, data: Partial<User>): User {
//   const user = users.find((u) => u.id === userId)
//   if (!user) throw new Error("User not found")

//   Object.assign(user, data)
//   return user
// }

// export function searchUsers(query: string): SearchResult[] {
//   if (!query.trim()) return []

//   const lowerQuery = query.toLowerCase()
//   return users
//     .filter((user) => user.name.toLowerCase().includes(lowerQuery) || user.username.toLowerCase().includes(lowerQuery))
//     .map((user) => ({
//       type: "user",
//       id: user.id,
//       text: user.name,
//       subtext: `@${user.username}`,
//       image: user.avatar,
//     }))
// }

// export function searchPosts(query: string): SearchResult[] {
//   if (!query.trim()) return []

//   const lowerQuery = query.toLowerCase()
//   return posts
//     .filter((post) => post.content.toLowerCase().includes(lowerQuery))
//     .map((post) => {
//       const author = users.find((u) => u.id === post.userId)
//       return {
//         type: "post",
//         id: post.id,
//         text: post.content.length > 60 ? post.content.substring(0, 60) + "..." : post.content,
//         subtext: author ? `Posted by @${author.username}` : "",
//         image: post.images && post.images.length > 0 ? post.images[0] : undefined,
//       }
//     })
// }

// export function searchHashtags(query: string): SearchResult[] {
//   if (!query.trim()) return []

//   const lowerQuery = query.toLowerCase()
//   const allHashtags = Array.from(new Set(posts.flatMap((post) => post.hashtags)))

//   return allHashtags
//     .filter((tag) => tag.toLowerCase().includes(lowerQuery))
//     .map((tag) => ({
//       type: "hashtag",
//       id: tag,
//       text: `#${tag}`,
//       subtext: `${posts.filter((p) => p.hashtags.includes(tag)).length} posts`,
//     }))
// }

// export function search(query: string): SearchResult[] {
//   if (!query.trim()) return []

//   return [...searchUsers(query), ...searchPosts(query), ...searchHashtags(query)]
// }

// // Get posts by user ID
// export function getPostsByUserId(userId: string): Post[] {
//   return posts
//     .filter((post) => post.userId === userId)
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
// }

// // Message reaction functions
// export function addMessageReaction(messageId: string, userId: string, emoji: string): Message {
//   if (!messageId) {
//     throw new Error("Invalid message ID")
//   }

//   const message = messages.find((m) => m.id === messageId)
//   if (!message) {
//     console.error(`Message not found with ID: ${messageId}`)
//     throw new Error("Message not found")
//   }

//   // Check if user already reacted with this emoji
//   const existingReaction = message.reactions.findIndex((r) => r.userId === userId && r.emoji === emoji)

//   if (existingReaction !== -1) {
//     // Remove reaction if it already exists (toggle behavior)
//     message.reactions.splice(existingReaction, 1)
//   } else {
//     // Add new reaction
//     message.reactions.push({
//       userId,
//       emoji,
//       createdAt: new Date().toISOString(),
//     })
//   }

//   return message
// }

// // Mark message as read
// export function markMessageAsRead(messageId: string): Message {
//   const message = messages.find((m) => m.id === messageId)
//   if (!message) throw new Error("Message not found")

//   if (!message.read) {
//     message.read = true
//     message.readAt = new Date().toISOString()
//   }

//   return message
// }

// // Add attachment to message
// export function addMessageAttachment(messageId: string, attachment: Omit<MessageAttachment, "id">): MessageAttachment {
//   const message = messages.find((m) => m.id === messageId)
//   if (!message) throw new Error("Message not found")

//   const newAttachment: MessageAttachment = {
//     id: `attach-${Date.now()}`,
//     ...attachment,
//   }

//   if (!message.attachments) {
//     message.attachments = []
//   }

//   message.attachments.push(newAttachment)
//   return newAttachment
// }

// export type {
//   User,
//   Post,
//   Comment,
//   Message,
//   MessageReaction,
//   MessageAttachment,
//   Conversation,
//   Notification,
//   SearchResult,
// }

export interface User {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio?: string
  verified?: boolean
  followersCount: number
  followingCount: number
  postsCount: number
}

export interface Post {
  id: string
  authorId: string
  content: string
  imageUrl?: string
  videoUrl?: string
  likes: number
  comments: number
  shares: number
  createdAt: Date
  tags?: string[]
}

export interface Story {
  id: string
  authorId: string
  content: string
  imageUrl?: string
  videoUrl?: string
  expiresAt: Date
  views: number
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  content: string
  encrypted: boolean
  createdAt: Date
  readAt?: Date
}

// Mock data for demonstration
export const getCurrentUser = (): User => ({
  id: "current-user",
  name: "Your Name",
  username: "yourusername",
  email: "you@example.com",
  avatar: "/placeholder.svg?height=100&width=100&text=You",
  bio: "Welcome to SocialSphere! 🌟",
  verified: true,
  followersCount: 1250,
  followingCount: 890,
  postsCount: 156,
})

export const getSamplePosts = (): Post[] => [
  {
    id: "1",
    authorId: "user-1",
    content:
      "Just discovered SocialSphere! 🚀 This platform has everything I need in one place. #SocialSphere #Innovation",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Amazing+Discovery",
    likes: 234,
    comments: 45,
    shares: 12,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: ["SocialSphere", "Innovation"],
  },
  {
    id: "2",
    authorId: "user-2",
    content: "The future of social media is here! Love how all my favorite features are combined seamlessly. 💫",
    likes: 189,
    comments: 23,
    shares: 8,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "3",
    authorId: "user-3",
    content: "Live streaming, stories, reels, secure messaging - SocialSphere has it all! This is revolutionary. 🌟",
    videoUrl: "/placeholder.svg?height=400&width=600&text=Demo+Video",
    likes: 567,
    comments: 89,
    shares: 34,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
]

export const getTrendingTopics = () => [
  { tag: "#SocialSphere", posts: 125000 },
  { tag: "#AllInOne", posts: 89000 },
  { tag: "#Innovation", posts: 67000 },
  { tag: "#SocialMedia", posts: 234000 },
  { tag: "#TechNews", posts: 156000 },
]

export const getFeatureStats = () => ({
  totalFeatures: 50,
  activeUsers: 2500000,
  postsShared: 15000000,
  messagesSent: 45000000,
  liveStreams: 125000,
  storiesPosted: 8900000,
})

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "like",
    sender: { id: "2", name: "Jane Doe", username: "janedoe", avatar: "JD" },
    postId: "1",
    content: undefined,
    read: false,
    createdAt: new Date().toISOString(),
  },
]
