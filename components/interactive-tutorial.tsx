"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, X } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  content: string
  image?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface Tutorial {
  id: string
  title: string
  description: string
  steps: TutorialStep[]
  category: string
}

interface InteractiveTutorialProps {
  onComplete?: () => void
  onDismiss?: () => void
  initialTutorial?: string
}

export function InteractiveTutorial({ onComplete, onDismiss, initialTutorial }: InteractiveTutorialProps) {
  const [isOpen, setIsOpen] = useState(!!initialTutorial)
  const [currentTutorialId, setCurrentTutorialId] = useState<string | null>(initialTutorial || null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([])
  const [showTutorialList, setShowTutorialList] = useState(!initialTutorial)

  // Sample tutorials data
  const tutorials: Tutorial[] = [
    {
      id: "getting-started",
      title: "Getting Started with SocialSphere",
      description: "Learn the basics of using SocialSphere",
      category: "Beginner",
      steps: [
        {
          id: "profile",
          title: "Create Your Profile",
          content: "Complete your profile with a photo and bio to help friends recognize you.",
          image: "/placeholder.svg?height=200&width=400&text=Profile+Setup",
          action: {
            label: "Go to Profile Settings",
            onClick: () => console.log("Navigate to profile settings"),
          },
        },
        {
          id: "find-friends",
          title: "Find Friends",
          content: "Search for friends or import contacts to start building your network.",
          image: "/placeholder.svg?height=200&width=400&text=Find+Friends",
          action: {
            label: "Find Friends",
            onClick: () => console.log("Navigate to friend finder"),
          },
        },
        {
          id: "first-post",
          title: "Make Your First Post",
          content: "Share a photo or update with your network to start engaging with the community.",
          image: "/placeholder.svg?height=200&width=400&text=Create+Post",
          action: {
            label: "Create a Post",
            onClick: () => console.log("Navigate to post creator"),
          },
        },
      ],
    },
    {
      id: "secure-messaging",
      title: "Secure Messaging",
      description: "Learn how to use end-to-end encrypted messaging",
      category: "Security",
      steps: [
        {
          id: "e2e-basics",
          title: "Understanding E2E Encryption",
          content: "End-to-end encryption ensures that only you and the recipient can read your messages.",
          image: "/placeholder.svg?height=200&width=400&text=E2E+Encryption",
        },
        {
          id: "start-secure-chat",
          title: "Starting a Secure Chat",
          content: "Enable encryption for your conversations by clicking the lock icon in any chat.",
          image: "/placeholder.svg?height=200&width=400&text=Secure+Chat",
          action: {
            label: "Try Secure Messaging",
            onClick: () => console.log("Navigate to messages"),
          },
        },
        {
          id: "verify-security",
          title: "Verifying Security",
          content: "Verify the security of your conversation by comparing security codes with your contact.",
          image: "/placeholder.svg?height=200&width=400&text=Verify+Security",
        },
      ],
    },
    {
      id: "marketplace",
      title: "Using the Marketplace",
      description: "Learn how to buy and sell items on SocialSphere Marketplace",
      category: "Features",
      steps: [
        {
          id: "browse-listings",
          title: "Browse Listings",
          content: "Explore items for sale in your area or by category.",
          image: "/placeholder.svg?height=200&width=400&text=Browse+Marketplace",
          action: {
            label: "Explore Marketplace",
            onClick: () => console.log("Navigate to marketplace"),
          },
        },
        {
          id: "create-listing",
          title: "Create a Listing",
          content: "List your items for sale by adding photos, description, and price.",
          image: "/placeholder.svg?height=200&width=400&text=Create+Listing",
          action: {
            label: "Create Listing",
            onClick: () => console.log("Navigate to create listing"),
          },
        },
        {
          id: "message-seller",
          title: "Message Sellers",
          content: "Contact sellers securely through our messaging system.",
          image: "/placeholder.svg?height=200&width=400&text=Message+Seller",
        },
      ],
    },
  ]

  const currentTutorial = tutorials.find((t) => t.id === currentTutorialId) || null
  const currentStep = currentTutorial?.steps[currentStepIndex] || null
  const progress = currentTutorial ? ((currentStepIndex + 1) / currentTutorial.steps.length) * 100 : 0

  const handleNextStep = () => {
    if (!currentTutorial) return

    if (currentStepIndex < currentTutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      // Tutorial completed
      setCompletedTutorials((prev) => [...prev, currentTutorial.id])
      if (onComplete) onComplete()
      setShowTutorialList(true)
      setCurrentStepIndex(0)
      setCurrentTutorialId(null)
    }
  }

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const startTutorial = (tutorialId: string) => {
    setCurrentTutorialId(tutorialId)
    setCurrentStepIndex(0)
    setShowTutorialList(false)
  }

  const handleDismiss = () => {
    setIsOpen(false)
    if (onDismiss) onDismiss()
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        <span>Tutorials</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{showTutorialList ? "Interactive Tutorials" : currentTutorial?.title}</DialogTitle>
            <DialogDescription>
              {showTutorialList
                ? "Learn how to use SocialSphere with these interactive tutorials"
                : currentTutorial?.description}
            </DialogDescription>
          </DialogHeader>

          {showTutorialList ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card
                    key={tutorial.id}
                    className={completedTutorials.includes(tutorial.id) ? "border-green-200" : ""}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        {completedTutorials.includes(tutorial.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        onClick={() => startTutorial(tutorial.id)}
                        variant={completedTutorials.includes(tutorial.id) ? "outline" : "default"}
                      >
                        {completedTutorials.includes(tutorial.id) ? "Review Tutorial" : "Start Tutorial"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="beginner" className="space-y-4">
                {tutorials
                  .filter((t) => t.category === "Beginner")
                  .map((tutorial) => (
                    <Card
                      key={tutorial.id}
                      className={completedTutorials.includes(tutorial.id) ? "border-green-200" : ""}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          {completedTutorials.includes(tutorial.id) && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          onClick={() => startTutorial(tutorial.id)}
                          variant={completedTutorials.includes(tutorial.id) ? "outline" : "default"}
                        >
                          {completedTutorials.includes(tutorial.id) ? "Review Tutorial" : "Start Tutorial"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                {tutorials
                  .filter((t) => t.category !== "Beginner")
                  .map((tutorial) => (
                    <Card
                      key={tutorial.id}
                      className={completedTutorials.includes(tutorial.id) ? "border-green-200" : ""}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          {completedTutorials.includes(tutorial.id) && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          onClick={() => startTutorial(tutorial.id)}
                          variant={completedTutorials.includes(tutorial.id) ? "outline" : "default"}
                        >
                          {completedTutorials.includes(tutorial.id) ? "Review Tutorial" : "Start Tutorial"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {currentStep && (
                <div className="space-y-4">
                  <Progress value={progress} className="h-2" />

                  <div className="text-sm text-muted-foreground">
                    Step {currentStepIndex + 1} of {currentTutorial?.steps.length}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{currentStep.title}</h3>

                    {currentStep.image && (
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={currentStep.image || "/placeholder.svg"}
                          alt={currentStep.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    <p>{currentStep.content}</p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex gap-2">
                      {currentStep.action && (
                        <Button onClick={currentStep.action.onClick}>{currentStep.action.label}</Button>
                      )}

                      <Button onClick={handleNextStep}>
                        {currentStepIndex === (currentTutorial?.steps.length || 0) - 1 ? (
                          <>
                            Complete
                            <CheckCircle className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={handleDismiss} className="flex items-center">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>

            {!showTutorialList && (
              <Button variant="outline" onClick={() => setShowTutorialList(true)}>
                Back to Tutorials
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
