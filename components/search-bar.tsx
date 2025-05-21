"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, Hash, FileText } from "lucide-react"
import { search } from "@/lib/data"
import type { SearchResult } from "@/lib/types"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      const searchResults = search(query)
      setResults(searchResults)
      setIsLoading(false)
      setIsOpen(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false)
    setQuery("")

    switch (result.type) {
      case "user":
        router.push(`/profile/${result.subtext.substring(1)}`) // Remove @ from username
        break
      case "hashtag":
        router.push(`/explore?tag=${result.text.substring(1)}`) // Remove # from hashtag
        break
      case "post":
        // Find post ID from the result and navigate to it
        const postId = result.id
        router.push(`/post/${postId}`)
        break
    }
  }

  const getIconForResult = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "hashtag":
        return <Hash className="h-4 w-4" />
      case "post":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          onFocus={() => query.trim() && setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-md z-10 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Searching...</div>
          ) : results.length > 0 ? (
            <div>
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}-${index}`}
                  className="p-3 hover:bg-muted cursor-pointer flex items-center gap-3"
                  onClick={() => handleResultClick(result)}
                >
                  {result.type === "user" && result.image ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={result.image || "/placeholder.svg"} alt={result.text} />
                      <AvatarFallback>{result.text.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                      {getIconForResult(result.type)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{result.text}</p>
                    {result.subtext && <p className="text-xs text-muted-foreground">{result.subtext}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
