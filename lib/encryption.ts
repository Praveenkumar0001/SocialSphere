// Real E2E encryption using Web Crypto API

export class E2EEncryption {
  private static instance: E2EEncryption
  private keyPair: CryptoKeyPair | null = null

  private constructor() {}

  static getInstance(): E2EEncryption {
    if (!E2EEncryption.instance) {
      E2EEncryption.instance = new E2EEncryption()
    }
    return E2EEncryption.instance
  }

  // Generate RSA key pair for the user
  async generateKeyPair(): Promise<CryptoKeyPair> {
    this.keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true, // extractable
      ["encrypt", "decrypt"],
    )

    return this.keyPair
  }

  // Export public key to share with others
  async exportPublicKey(publicKey?: CryptoKey): Promise<string> {
    const key = publicKey || this.keyPair?.publicKey
    if (!key) throw new Error("No public key available")

    const exported = await window.crypto.subtle.exportKey("spki", key)
    const exportedAsString = String.fromCharCode.apply(null, Array.from(new Uint8Array(exported)))
    return btoa(exportedAsString)
  }

  // Import public key from string
  async importPublicKey(publicKeyString: string): Promise<CryptoKey> {
    const binaryString = atob(publicKeyString)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return await window.crypto.subtle.importKey(
      "spki",
      bytes,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"],
    )
  }

  // Export private key for storage
  async exportPrivateKey(): Promise<string> {
    if (!this.keyPair?.privateKey) throw new Error("No private key available")

    const exported = await window.crypto.subtle.exportKey("pkcs8", this.keyPair.privateKey)
    const exportedAsString = String.fromCharCode.apply(null, Array.from(new Uint8Array(exported)))
    return btoa(exportedAsString)
  }

  // Import private key from storage
  async importPrivateKey(privateKeyString: string): Promise<CryptoKey> {
    const binaryString = atob(privateKeyString)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const privateKey = await window.crypto.subtle.importKey(
      "pkcs8",
      bytes,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"],
    )

    // Update the key pair
    if (this.keyPair) {
      this.keyPair = { ...this.keyPair, privateKey }
    }

    return privateKey
  }

  // Encrypt message with recipient's public key
  async encryptMessage(message: string, recipientPublicKey: CryptoKey): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      recipientPublicKey,
      data,
    )

    const encryptedArray = new Uint8Array(encrypted)
    const encryptedString = String.fromCharCode.apply(null, Array.from(encryptedArray))
    return btoa(encryptedString)
  }

  // Decrypt message with own private key
  async decryptMessage(encryptedMessage: string, privateKey?: CryptoKey): Promise<string> {
    const key = privateKey || this.keyPair?.privateKey
    if (!key) throw new Error("No private key available")

    const binaryString = atob(encryptedMessage)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      bytes,
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }

  // Generate symmetric key for group chats
  async generateSymmetricKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    )
  }

  // Export symmetric key
  async exportSymmetricKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("raw", key)
    const exportedAsString = String.fromCharCode.apply(null, Array.from(new Uint8Array(exported)))
    return btoa(exportedAsString)
  }

  // Import symmetric key
  async importSymmetricKey(keyString: string): Promise<CryptoKey> {
    const binaryString = atob(keyString)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return await window.crypto.subtle.importKey(
      "raw",
      bytes,
      {
        name: "AES-GCM",
      },
      false,
      ["encrypt", "decrypt"],
    )
  }

  // Encrypt with symmetric key (for group chats)
  async encryptWithSymmetricKey(message: string, key: CryptoKey): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const iv = window.crypto.getRandomValues(new Uint8Array(12))

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data,
    )

    const encryptedArray = new Uint8Array(encrypted)
    const combined = new Uint8Array(iv.length + encryptedArray.length)
    combined.set(iv)
    combined.set(encryptedArray, iv.length)

    const combinedString = String.fromCharCode.apply(null, Array.from(combined))
    return btoa(combinedString)
  }

  // Decrypt with symmetric key (for group chats)
  async decryptWithSymmetricKey(encryptedMessage: string, key: CryptoKey): Promise<string> {
    const binaryString = atob(encryptedMessage)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const iv = bytes.slice(0, 12)
    const data = bytes.slice(12)

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data,
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }
}

// Utility functions for easier use
export const encryptMessage = async (message: string, recipientPublicKeyString: string): Promise<string> => {
  const encryption = E2EEncryption.getInstance()
  const recipientPublicKey = await encryption.importPublicKey(recipientPublicKeyString)
  return await encryption.encryptMessage(message, recipientPublicKey)
}

export const decryptMessage = async (encryptedMessage: string, privateKeyString?: string): Promise<string> => {
  const encryption = E2EEncryption.getInstance()

  if (privateKeyString) {
    const privateKey = await encryption.importPrivateKey(privateKeyString)
    return await encryption.decryptMessage(encryptedMessage, privateKey)
  }

  return await encryption.decryptMessage(encryptedMessage)
}

export const generateUserKeys = async (): Promise<{ publicKey: string; privateKey: string }> => {
  const encryption = E2EEncryption.getInstance()
  const keyPair = await encryption.generateKeyPair()

  const publicKey = await encryption.exportPublicKey(keyPair.publicKey)
  const privateKey = await encryption.exportPrivateKey()

  return { publicKey, privateKey }
}
