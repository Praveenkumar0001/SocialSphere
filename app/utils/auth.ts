// Simple auth utility functions

// Check if user is logged in
export function isLoggedIn(): boolean {
  // In a real app, this would check for a valid token or session
  // For this demo, we'll just return true
  return true
}

// Get current user from localStorage or session
export function getCurrentUser() {
  // In a real app, this would decode the token or fetch from an API
  // For this demo, we'll just return a hardcoded user
  return {
    id: "user-1",
    name: "John Smith",
    username: "johnsmith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Software developer and tech enthusiast",
    followers: [],
    following: [],
    posts: [],
    createdAt: new Date().toISOString(),
  }
}

// Log out the current user
export function logout() {
  // In a real app, this would clear tokens and redirect
  localStorage.removeItem("auth")
  window.location.href = "/login"
}

// Protect a route
export function protectRoute(router: any) {
  if (!isLoggedIn()) {
    router.push("/login")
    return false
  }
  return true
}
