"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { getPosts, updatePostStatus } from "@/lib/posts"

type PendingPost = {
  id: string
  title: string
  author: string
  date: string
  status: "pending"
  excerpt: string
  content: string
}

export function PendingApprovalTable() {
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<PendingPost | null>(null)
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchPendingPosts = async () => {
      const allPosts = await getPosts()
      const pending = allPosts.filter((post) => post.status === "pending")
      setPendingPosts(pending)
    }
    fetchPendingPosts()
  }, [])

  const handleView = (post: PendingPost) => {
    setSelectedPost(post)
    setOpen(true)
  }

  const handleApprove = async (id: string) => {
    try {
      await updatePostStatus(id, "approved")
      setPendingPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
      toast({
        title: "Post Approved",
        description: "The post has been approved and published.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updatePostStatus(id, "rejected")
      setPendingPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
      toast({
        title: "Post Rejected",
        description: "The post has been rejected and removed from the queue.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr>
              <th className="px-4 py-3.5 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3.5 text-left text-sm font-semibold">Author</th>
              <th className="px-4 py-3.5 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3.5 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pendingPosts.length > 0 ? (
              pendingPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4 text-sm">{post.title}</td>
                  <td className="px-4 py-4 text-sm">{post.author}</td>
                  <td className="px-4 py-4 text-sm">{new Date(post.date).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-sm">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Pending
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(post)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50"
                        onClick={() => handleApprove(post.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
                        onClick={() => handleReject(post.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-muted-foreground">
                  No pending posts to review at this time.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedPost?.author} on {selectedPost && new Date(selectedPost.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Excerpt:</h4>
            <p className="text-muted-foreground mb-4">{selectedPost?.excerpt}</p>

            <h4 className="font-medium mb-2">Content:</h4>
            <div className="prose prose-sm max-w-none">
              <p>{selectedPost?.content}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={() => {
                handleReject(selectedPost?.id || "")
                setOpen(false)
              }}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              variant="outline"
              className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50"
              onClick={() => {
                handleApprove(selectedPost?.id || "")
                setOpen(false)
              }}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

