import crypto from "crypto"

// Generate key pair for E2E encryption
export const generateKeyPair = () => {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  })
}

// Encrypt message using recipient's public key
export const encryptMessage = (message: string, recipientPublicKey: string): string => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: recipientPublicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(message),
  )

  return encryptedData.toString("base64")
}

// Decrypt message using recipient's private key
export const decryptMessage = (encryptedMessage: string, privateKey: string): string => {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(encryptedMessage, "base64"),
  )

  return decryptedData.toString()
}

// Generate a symmetric key for group messaging
export const generateSymmetricKey = (): string => {
  return crypto.randomBytes(32).toString("hex")
}

// Encrypt with symmetric key (for group chats)
export const encryptWithSymmetricKey = (message: string, key: string): string => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv)

  let encrypted = cipher.update(message, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag()

  return iv.toString("hex") + ":" + encrypted + ":" + authTag.toString("hex")
}

// Decrypt with symmetric key (for group chats)
export const decryptWithSymmetricKey = (encryptedMessage: string, key: string): string => {
  const parts = encryptedMessage.split(":")
  const iv = Buffer.from(parts[0], "hex")
  const encrypted = parts[1]
  const authTag = Buffer.from(parts[2], "hex")

  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}
