export interface User {
  id: string
  name: string
  username: string
  email: string
  bio?: string
  avatar?: string
  coverImage?: string
  location?: string
  website?: string
  followers: string[]
  following: string[]
  posts: string[]
  createdAt: string
  isVerified?: boolean
  provider?: "email" | "google" | "facebook" | "twitter" | "instagram"
  savedCollections?: SavedCollection[]
  stories?: Story[]
}

export interface Post {
  id: string
  userId: string
  content: string
  images?: string[]
  createdAt: string
  likes: string[]
  comments: Comment[]
  shares: number
  mentions: string[]
  hashtags: string[]
  location?: Location
  poll?: Poll
}

export interface Comment {
  id: string
  userId: string
  content: string
  createdAt: string
  likes: string[]
  replies?: Comment[]
}

export interface MessageReaction {
  userId: string
  emoji: string
  createdAt: string
}

export interface MessageAttachment {
  id: string
  type: "image" | "file" | "audio" | "video"
  url: string
  name: string
  size?: number
  thumbnailUrl?: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  read: boolean
  readAt?: string
  reactions: MessageReaction[]
  attachments?: MessageAttachment[]
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  updatedAt: string
}

// export interface Notification {
//   id: string
//   userId: string
//   type: "like" | "comment" | "follow" | "mention" | "message"
//   actorId: string
//   postId?: string
//   commentId?: string
//   read: boolean
//   createdAt: string
// }

export interface SearchResult {
  type: "user" | "post" | "hashtag"
  id: string
  text: string
  subtext?: string
  image?: string
}

export interface Location {
  name: string
  latitude: number
  longitude: number
}

export interface PollOption {
  id: string
  text: string
  votes: string[] // Array of user IDs who voted for this option
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  expiresAt: string
  isMultipleChoice: boolean
}

export interface Story {
  id: string
  userId: string
  type: "image" | "video" | "text"
  content: string
  background?: string
  createdAt: string
  expiresAt: string
  views: string[] // Array of user IDs who viewed the story
  reactions: MessageReaction[]
}

export interface SavedCollection {
  id: string
  userId: string
  name: string
  description?: string
  posts: string[] // Array of post IDs
  createdAt: string
  updatedAt: string
  isPrivate: boolean
}

export interface TrendingTopic {
  id: string
  name: string
  count: number
  category?: string
  posts: string[] // Array of post IDs
}
export type NotificationType = "like" | "comment" | "follow" | "mention" | "message"

// export type User = {
//   id: string
//   name: string
//   username: string
//   avatar: string
// }

export type Notification = {
  id: string
  type: NotificationType
  sender: User
  postId?: string
  content?: string
  read: boolean
  createdAt: string
}
