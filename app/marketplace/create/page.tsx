"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ContentModeration } from "@/components/content-moderation"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, Upload, DollarSign, MapPin, Tag } from "lucide-react"
import Link from "next/link"

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    images: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "home", label: "Home & Garden" },
    { value: "clothing", label: "Clothing & Accessories" },
    { value: "books", label: "Books & Media" },
    { value: "sports", label: "Sports & Recreation" },
    { value: "toys", label: "Toys & Games" },
    { value: "other", label: "Other" },
  ]

  const conditions = [
    { value: "new", label: "New" },
    { value: "like-new", label: "Like New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContentCheck = (content: string, callback: (result: any) => void) => {
    // Simulate content moderation
    setTimeout(() => {
      const isSafe = !content.toLowerCase().includes("scam") && !content.toLowerCase().includes("fake")
      callback({
        isSafe,
        reason: isSafe ? undefined : "Content may contain inappropriate terms for marketplace listings",
      })
    }, 1000)
  }

  const handleSubmit = async (content: string) => {
    if (!formData.title || !formData.price || !formData.category || !formData.condition) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would call the API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Creating listing:", {
        ...formData,
        description: content,
      })

      router.push("/marketplace")
    } catch (error) {
      console.error("Error creating listing:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/marketplace">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Listing</h1>
          <p className="text-gray-600 dark:text-gray-400">List an item for sale in the marketplace</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Provide the essential details about your item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="What are you selling?"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Photos
            </CardTitle>
            <CardDescription>Add photos to help buyers see your item (up to 10 photos)</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload maxImages={10} onImagesChange={handleImageUpload} existingImages={formData.images} />
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>
              Describe your item in detail. Our content moderation will check for appropriate content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContentModeration
              onContentCheck={handleContentCheck}
              placeholder="Describe your item's condition, features, and any other relevant details..."
              maxLength={1000}
              buttonText={isSubmitting ? "Creating Listing..." : "Create Listing"}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>

        {/* Preview */}
        {formData.title && formData.price && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your listing will appear to buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{formData.title}</h3>
                  {formData.condition && (
                    <Badge variant="secondary" className="capitalize">
                      {formData.condition}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  ${Number.parseFloat(formData.price || "0").toLocaleString()}
                </p>
                {formData.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {formData.location}
                  </div>
                )}
                {formData.category && (
                  <Badge variant="outline" className="capitalize">
                    {categories.find((c) => c.value === formData.category)?.label}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
