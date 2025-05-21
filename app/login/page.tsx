"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [socialLoginStatus, setSocialLoginStatus] = useState<{
    [key: string]: { connected: boolean; email?: string }
  }>({
    google: { connected: false },
    facebook: { connected: false },
    twitter: { connected: false },
    instagram: { connected: false },
  })

  // Simulate checking for existing social connections
  useEffect(() => {
    // In a real app, this would check with your backend
    const checkSocialConnections = async () => {
      // Simulate API call
      setTimeout(() => {
        setSocialLoginStatus({
          google: { connected: true, email: "user@gmail.com" },
          facebook: { connected: false },
          twitter: { connected: false },
          instagram: { connected: false },
        })
      }, 1000)
    }

    checkSocialConnections()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    const newErrors: {
      email?: string
      password?: string
    } = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    // Show loading state
    setIsLoading(true)

    // Clear any previous general errors
    setErrors((prev) => ({ ...prev, general: undefined }))

    // Simulate API call with a timeout
    setTimeout(() => {
      try {
        // For demo purposes, let's make any login work
        console.log("User logged in:", formData)

        // In a real app, you would store tokens securely
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName: "Demo User",
            username: formData.email.split("@")[0],
            email: formData.email,
            provider: "email",
          }),
        )

        toast({
          title: "Login successful",
          description: "Welcome back to SocialSphere!",
        })

        router.push("/dashboard")
      } catch (error) {
        // Failed login
        setIsLoading(false)
        setErrors((prev) => ({
          ...prev,
          general: error instanceof Error ? error.message : "An error occurred during login. Please try again.",
        }))
      }
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    // If already connected, just log in
    if (socialLoginStatus[provider]?.connected) {
      setSocialLoading(provider)

      // Simulate quick login
      setTimeout(() => {
        const userData = {
          fullName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          username: `${provider}user`,
          email: socialLoginStatus[provider].email || `user@${provider}.example.com`,
          provider: provider,
        }

        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify(userData))

        toast({
          title: "Login successful",
          description: `Welcome back! You've been logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`,
        })

        router.push("/dashboard")
      }, 800)
      return
    }

    setSocialLoading(provider)

    // Simulate social login authorization flow
    setTimeout(() => {
      // Simulate popup window for auth
      const authWindow = window.open("", "Social Login", "width=500,height=600")

      if (authWindow) {
        // In a real app, this would redirect to the provider's OAuth page
        authWindow.document.write(`
          <html>
            <head>
              <title>${provider.charAt(0).toUpperCase() + provider.slice(1)} Login</title>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .loader { border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 20px auto; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                button { background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <h2>Connecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)}</h2>
              <div class="loader"></div>
              <p>Please authorize SocialSphere to access your ${provider.charAt(0).toUpperCase() + provider.slice(1)} account.</p>
              <button onclick="window.close()">Authorize</button>
            </body>
          </html>
        `)

        // Simulate successful auth after window closes
        const checkClosed = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(checkClosed)

            const userData = {
              fullName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
              username: `${provider}user`,
              email: `user@${provider}.example.com`,
              provider: provider,
            }

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("user", JSON.stringify(userData))

            toast({
              title: "Account connected",
              description: `Your ${provider.charAt(0).toUpperCase() + provider.slice(1)} account has been connected successfully!`,
            })

            router.push("/dashboard")
          }
        }, 100)

        // Fallback in case user doesn't close the window
        setTimeout(() => {
          if (!authWindow.closed) {
            authWindow.close()
            setSocialLoading(null)

            toast({
              title: "Login canceled",
              description: "You canceled the login process.",
              variant: "destructive",
            })
          }
        }, 10000)
      } else {
        // Popup blocked
        setSocialLoading(null)
        toast({
          title: "Popup blocked",
          description: "Please allow popups for this site to use social login.",
          variant: "destructive",
        })
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold dark:text-white">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Log in to your SocialSphere account</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {errors.general && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="dark:text-gray-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging in...
                      </div>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading !== null}
                  className={`flex items-center justify-center gap-2 ${
                    socialLoginStatus.google.connected
                      ? "border-green-500 text-green-600 dark:border-green-600 dark:text-green-500"
                      : ""
                  }`}
                >
                  {socialLoading === "google" ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className={socialLoginStatus.google.connected ? "text-green-600 dark:text-green-500" : ""}
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  )}
                  {socialLoginStatus.google.connected ? "Connected" : "Google"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={socialLoading !== null}
                  className={`flex items-center justify-center gap-2 ${
                    socialLoginStatus.facebook.connected
                      ? "border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-500"
                      : ""
                  }`}
                >
                  {socialLoading === "facebook" ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  {socialLoginStatus.facebook.connected ? "Connected" : "Facebook"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("twitter")}
                  disabled={socialLoading !== null}
                  className={`flex items-center justify-center gap-2 ${
                    socialLoginStatus.twitter.connected
                      ? "border-blue-400 text-blue-500 dark:border-blue-500 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {socialLoading === "twitter" ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  )}
                  {socialLoginStatus.twitter.connected ? "Connected" : "Twitter"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("instagram")}
                  disabled={socialLoading !== null}
                  className={`flex items-center justify-center gap-2 ${
                    socialLoginStatus.instagram.connected
                      ? "border-pink-500 text-pink-600 dark:border-pink-600 dark:text-pink-500"
                      : ""
                  }`}
                >
                  {socialLoading === "instagram" ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {socialLoginStatus.instagram.connected ? "Connected" : "Instagram"}
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
