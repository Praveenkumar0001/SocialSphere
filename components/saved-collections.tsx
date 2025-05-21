"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, Plus, MoreHorizontal, Grid2X2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import type { SavedCollection } from "@/lib/types"

interface SavedCollectionsProps {
  collections: SavedCollection[]
  onCreateCollection: (collection: Omit<SavedCollection, "id" | "userId" | "createdAt" | "updatedAt">) => void
  onDeleteCollection: (collectionId: string) => void
  onUpdateCollection: (collectionId: string, data: Partial<SavedCollection>) => void
}

export function SavedCollections({
  collections,
  onCreateCollection,
  onDeleteCollection,
  onUpdateCollection,
}: SavedCollectionsProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    isPrivate: false,
  })
  const { toast } = useToast()

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast({
        variant: "destructive",
        title: "Collection name required",
        description: "Please enter a name for your collection.",
      })
      return
    }

    onCreateCollection({
      name: newCollection.name,
      description: newCollection.description,
      posts: [],
      isPrivate: newCollection.isPrivate,
    })

    setNewCollection({
      name: "",
      description: "",
      isPrivate: false,
    })

    setIsCreating(false)

    toast({
      title: "Collection created",
      description: "Your new collection has been created successfully.",
    })
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Saved Collections</h2>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new collection</DialogTitle>
              <DialogDescription>
                Create a new collection to save and organize posts you want to revisit later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Travel Inspiration"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What's this collection about?"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="private">Private collection</Label>
                  <p className="text-sm text-muted-foreground">Only you can see private collections</p>
                </div>
                <Switch
                  id="private"
                  checked={newCollection.isPrivate}
                  onCheckedChange={(checked) => setNewCollection({ ...newCollection, isPrivate: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCollection}>Create Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium mb-1">No collections yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Save posts to collections to organize content you want to revisit.
          </p>
          <Button variant="outline" onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create your first collection
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {collections.map((collection) => (
            <div key={collection.id} className="border border-border rounded-lg overflow-hidden group">
              <div className="relative aspect-square bg-muted">
                {collection.posts.length > 0 ? (
                  <div className="grid grid-cols-2 h-full">
                    {collection.posts.slice(0, 4).map((postId, index) => (
                      <div key={postId} className="overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=${100 + index * 10}&width=${100 + index * 10}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Grid2X2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}

                {collection.isPrivate && (
                  <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-full">
                    <Lock className="h-3 w-3" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/collections/${collection.id}`}>View Collection</Link>
                  </Button>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{collection.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit collection</DropdownMenuItem>
                      <DropdownMenuItem>Share collection</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => onDeleteCollection(collection.id)}>
                        Delete collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground">
                  {collection.posts.length} {collection.posts.length === 1 ? "post" : "posts"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
