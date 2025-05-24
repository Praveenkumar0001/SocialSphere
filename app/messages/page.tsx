"use client"

import { SecureMessaging } from "@/components/secure-messaging"

import { useState, useRef, useEffect } from "react"

const Message = ({ sender, content, timestamp }) => (
  <div className={`message ${sender === "me" ? "sent" : "received"}`}>
    <div className="message-content">{content}</div>
    <div className="message-timestamp">{timestamp}</div>
  </div>
)

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() !== "") {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  )
}

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} sender={message.sender} content={message.content} timestamp={message.timestamp} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

const initialMessages = [
  { sender: "me", content: "Hey there!", timestamp: "10:00 AM" },
  { sender: "them", content: "Hello!", timestamp: "10:01 AM" },
  { sender: "me", content: "How are you doing?", timestamp: "10:02 AM" },
  { sender: "them", content: "I am doing great, thanks! How about you?", timestamp: "10:03 AM" },
  { sender: "me", content: "I am doing well too. Just working on some code.", timestamp: "10:04 AM" },
  { sender: "them", content: "Nice! What are you working on?", timestamp: "10:05 AM" },
  { sender: "me", content: "A messaging app, ironically.", timestamp: "10:06 AM" },
  { sender: "them", content: "Haha, that's funny. Good luck with that!", timestamp: "10:07 AM" },
  { sender: "me", content: "Thanks! I appreciate it.", timestamp: "10:08 AM" },
  { sender: "them", content: "No problem!", timestamp: "10:09 AM" },
  { sender: "me", content: "So, what are you up to today?", timestamp: "10:10 AM" },
  { sender: "them", content: "Just relaxing and watching some TV.", timestamp: "10:11 AM" },
  { sender: "me", content: "Sounds like a good day.", timestamp: "10:12 AM" },
  { sender: "them", content: "Yeah, it is. I needed a break.", timestamp: "10:13 AM" },
  { sender: "me", content: "I understand that completely.", timestamp: "10:14 AM" },
  { sender: "them", content: "Well, I should get back to it. Talk to you later!", timestamp: "10:15 AM" },
  { sender: "me", content: "Sounds good! Talk to you later!", timestamp: "10:16 AM" },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)

  const handleSendMessage = (newMessage) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMessageObject = { sender: "me", content: newMessage, timestamp: timestamp }
    setMessages([...messages, newMessageObject])
  }

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <MessageList messages={messages} />
      {/* Add this before the message input */}
      <SecureMessaging conversationId="conv-1" recipientId="user-2" recipientName="Alex Johnson" />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}
