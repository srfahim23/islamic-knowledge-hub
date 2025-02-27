"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createPost, getUserPendingPosts, updatePendingPost, deletePendingPost } from "@/lib/posts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function SubmitPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [author, setAuthor] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [pendingPosts, setPendingPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPendingPosts()
  }, [])

  const fetchPendingPosts = async () => {
    // In a real application, you would get the user ID from the authentication system
    const userId = "current-user-id"
    const posts = await getUserPendingPosts(userId)
    setPendingPosts(posts)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would get the user ID from the authentication system
      const userId = "current-user-id"

      await createPost({
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        author: author || "Anonymous",
        date: new Date().toISOString(),
      })

      toast({
        title: "Post Submitted",
        description: "Your post has been submitted for approval. Thank you!",
      })

      // Reset form
      setTitle("")
      setContent("")
      setTags("")
      setAuthor("")

      // Refresh pending posts
      fetchPendingPosts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content)
    setTags(post.tags.join(", "))
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would get the user ID from the authentication system
      const userId = "current-user-id"

      await updatePendingPost(editingPost.id, userId, {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      toast({
        title: "Success!",
        description: "Your post has been updated.",
      })

      setIsEditDialogOpen(false)
      setEditingPost(null)
      fetchPendingPosts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteConfirmation = (post) => {
    setPostToDelete(post)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!postToDelete) return

    try {
      // In a real application, you would get the user ID from the authentication system
      const userId = "current-user-id"

      await deletePendingPost(postToDelete.id, userId)
      toast({
        title: "Success!",
        description: "The post has been deleted.",
      })
      fetchPendingPosts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a Post</h1>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Islamic Post</CardTitle>
          <CardDescription>
            Share your knowledge with our community. Your post will be reviewed before publishing.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Your Name</Label>
              <Input
                id="author"
                placeholder="Enter your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here"
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Enter tags separated by commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <h2 className="text-2xl font-bold mt-12 mb-4">Your Pending Posts</h2>

      {pendingPosts.length > 0 ? (
        <div className="space-y-4">
          {pendingPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>Submitted on: {new Date(post.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content.substring(0, 150)}...</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2" onClick={() => handleEdit(post)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteConfirmation(post)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>You don't have any pending posts.</p>
      )}

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea id="edit-content" value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags</Label>
                <Input id="edit-tags" value={tags} onChange={(e) => setTags(e.target.value)} />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

