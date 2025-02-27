"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createPost, getPosts, deletePost, updatePost } from "@/lib/posts"
import { useRouter } from "next/navigation"
import { PendingApprovalTable } from "@/components/pending-approval-table"
import { authenticate } from "@/lib/auth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState("")
  const [author, setAuthor] = useState("")
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    }

    fetchPosts()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (authenticate(username, password)) {
      setIsLoggedIn(true)
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      await createPost({
        title,
        content,
        excerpt,
        tags: tagArray,
        author: author || "Anonymous",
        date: new Date().toISOString(),
        status: "pending", // Set status to pending for user submissions
      })

      toast({
        title: "Success!",
        description: "Your post has been submitted for approval.",
      })

      // Reset form
      setTitle("")
      setContent("")
      setExcerpt("")
      setTags("")
      setAuthor("")
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
    setExcerpt(post.excerpt)
    setTags(post.tags.join(", "))
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      const updatedPost = await updatePost(editingPost.id, {
        title,
        content,
        excerpt,
        tags: tagArray,
      })

      toast({
        title: "Success!",
        description: "Your post has been updated.",
      })

      // Update the posts list
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))

      setIsEditDialogOpen(false)
      setEditingPost(null)
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
      await deletePost(postToDelete.id)
      toast({
        title: "Success!",
        description: "The post has been deleted.",
      })
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postToDelete.id))
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

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submit-post">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit-post">Submit Post</TabsTrigger>
            <TabsTrigger value="admin-login">Admin Login</TabsTrigger>
          </TabsList>

          <TabsContent value="submit-post">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Post</CardTitle>
                <CardDescription>
                  Share your knowledge with our community. Your post will be reviewed before publishing.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Your Name (Optional)</Label>
                    <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Post"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="admin-login">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Please log in to access the admin dashboard.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Log In</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="manage-posts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create-post">Create Post</TabsTrigger>
          <TabsTrigger value="manage-posts">Manage Posts</TabsTrigger>
          <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="create-post">
          <Card>
            <CardHeader>
              <CardTitle>Create a Post</CardTitle>
              <CardDescription>
                Share your knowledge with our community. Your post will be reviewed before publishing.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Your Name (Optional)</Label>
                  <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Post"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="pending-approval">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Review and approve posts submitted by contributors.</CardDescription>
            </CardHeader>
            <CardContent>
              <PendingApprovalTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-posts">
          <Card>
            <CardHeader>
              <CardTitle>Manage Posts</CardTitle>
              <CardDescription>View, edit, or delete your existing posts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Title</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-4 py-4 text-sm">{post.title}</td>
                          <td className="px-4 py-4 text-sm">{new Date(post.date).toLocaleDateString()}</td>
                          <td className="px-4 py-4 text-sm">{post.status}</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteConfirmation(post)}>
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-center text-muted-foreground">
                          No posts found. Create your first post!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea id="edit-excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
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

