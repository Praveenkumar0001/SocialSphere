"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Unlock, Key, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { E2EEncryption, generateUserKeys } from "@/lib/encryption"

interface SecureMessagingProps {
  currentUserId: string
  recipientId: string
  conversationId: string
}

export function SecureMessaging({ currentUserId, recipientId, conversationId }: SecureMessagingProps) {
  const [message, setMessage] = useState("")
  const [isEncrypted, setIsEncrypted] = useState(false)
  const [userKeys, setUserKeys] = useState<{ publicKey: string; privateKey: string } | null>(null)
  const [recipientPublicKey, setRecipientPublicKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [encryption] = useState(() => E2EEncryption.getInstance())
  const { toast } = useToast()

  useEffect(() => {
    initializeEncryption()
  }, [currentUserId, recipientId])

  const initializeEncryption = async () => {
    try {
      setIsLoading(true)

      // Check if user has keys
      const userResponse = await fetch(`/api/users/keys?userId=${currentUserId}`)
      const userData = await userResponse.json()

      if (!userData.user.publicKey) {
        // Generate new keys for user
        const keys = await generateUserKeys()
        setUserKeys(keys)

        // Save public key to database
        await fetch("/api/users/keys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUserId,
            publicKey: keys.publicKey,
          }),
        })

        // Store private key locally (in real app, use secure storage)
        localStorage.setItem(`privateKey_${currentUserId}`, keys.privateKey)
      } else {
        // Load existing keys
        const privateKey = localStorage.getItem(`privateKey_${currentUserId}`)
        if (privateKey) {
          setUserKeys({
            publicKey: userData.user.publicKey,
            privateKey,
          })
        }
      }

      // Get recipient's public key
      const recipientResponse = await fetch(`/api/users/keys?userId=${recipientId}`)
      const recipientData = await recipientResponse.json()

      if (recipientData.user.publicKey) {
        setRecipientPublicKey(recipientData.user.publicKey)
        setIsEncrypted(true)
      }
    } catch (error) {
      console.error("Error initializing encryption:", error)
      toast({
        title: "Encryption Error",
        description: "Failed to initialize end-to-end encryption",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    try {
      setIsLoading(true)

      let finalMessage = message
      let encrypted = false

      if (isEncrypted && recipientPublicKey && userKeys) {
        // Encrypt the message
        const recipientKey = await encryption.importPublicKey(recipientPublicKey)
        finalMessage = await encryption.encryptMessage(message, recipientKey)
        encrypted = true
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: finalMessage,
          senderId: currentUserId,
          recipientId,
          conversationId,
          encrypted,
          publicKey: recipientPublicKey,
        }),
      })

      if (response.ok) {
        setMessage("")
        toast({
          title: "Message Sent",
          description: encrypted ? "Message sent with end-to-end encryption" : "Message sent",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.reason || "Failed to send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateNewKeys = async () => {
    try {
      setIsLoading(true)
      const keys = await generateUserKeys()
      setUserKeys(keys)

      // Update public key in database
      await fetch("/api/users/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          publicKey: keys.publicKey,
        }),
      })

      // Store private key locally
      localStorage.setItem(`privateKey_${currentUserId}`, keys.privateKey)

      toast({
        title: "Keys Generated",
        description: "New encryption keys have been generated",
      })
    } catch (error) {
      console.error("Error generating keys:", error)
      toast({
        title: "Error",
        description: "Failed to generate new keys",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Secure Messaging
          {isEncrypted ? (
            <Badge variant="default" className="bg-green-500">
              <Lock className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Unlock className="h-3 w-3 mr-1" />
              Not Encrypted
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {isEncrypted
            ? "Messages are protected with end-to-end encryption"
            : "Recipient hasn't enabled encryption yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={isEncrypted ? "Type an encrypted message..." : "Type a message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading || !message.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generateNewKeys} disabled={isLoading}>
            <Key className="h-4 w-4 mr-2" />
            Generate New Keys
          </Button>
        </div>

        {userKeys && (
          <div className="text-xs text-muted-foreground">
            <p>Your public key: {userKeys.publicKey.substring(0, 50)}...</p>
            {recipientPublicKey && <p>Recipient's key: {recipientPublicKey.substring(0, 50)}...</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
