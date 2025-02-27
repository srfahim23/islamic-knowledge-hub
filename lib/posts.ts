"use server";
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the Post type
export type Post = {
  id: string
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  content: string
  tags: string[]
  status: "pending" | "approved" | "rejected"
}

// Path to our JSON file that stores posts
const postsFilePath = path.join(process.cwd(), "data", "posts.json")

// Ensure the data directory exists
export const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }

  // Create an empty posts.json file if it doesn't exist
  if (!fs.existsSync(postsFilePath)) {
    fs.writeFileSync(postsFilePath, JSON.stringify([], null, 2))
  }
}

// Get all posts
export async function getPosts(): Promise<Post[]> {
  ensureDataDir()

  try {
    const fileContents = fs.readFileSync(postsFilePath, "utf8")
    const posts = JSON.parse(fileContents)

    // Sort posts by date (newest first)
    return posts.sort((a: Post, b: Post) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

// Create a new post
export async function createPost(postData: Omit<Post, "id" | "slug" | "status">): Promise<Post> {
  ensureDataDir()

  try {
    const posts = await getPosts()

    // Generate a slug from the title
    const slug = postData.title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")

    // Create the new post
    const newPost: Post = {
      id: uuidv4(),
      slug,
      status: "pending",
      ...postData,
    }

    // Add the new post to the array
    posts.unshift(newPost)

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))

    return newPost
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error("Failed to create post")
  }
}

// Update post status
export async function updatePostStatus(id: string, status: "approved" | "rejected"): Promise<Post> {
  ensureDataDir()

  try {
    const posts = await getPosts()
    const postIndex = posts.findIndex((post) => post.id === id)

    if (postIndex === -1) {
      throw new Error("Post not found")
    }

    posts[postIndex].status = status

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))

    return posts[postIndex]
  } catch (error) {
    console.error("Error updating post status:", error)
    throw new Error("Failed to update post status")
  }
}

// Delete a post
export async function deletePost(id: string): Promise<void> {
  ensureDataDir()

  try {
    let posts = await getPosts()
    posts = posts.filter((post) => post.id !== id)

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error deleting post:", error)
    throw new Error("Failed to delete post")
  }
}

// Update a post
export async function updatePost(id: string, updatedData: Partial<Omit<Post, "id" | "slug">>): Promise<Post> {
  ensureDataDir()

  try {
    const posts = await getPosts()
    const postIndex = posts.findIndex((post) => post.id === id)

    if (postIndex === -1) {
      throw new Error("Post not found")
    }

    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedData,
      // If the title is updated, update the slug as well
      slug: updatedData.title
        ? updatedData.title
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, "-")
        : posts[postIndex].slug,
    }

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))

    return posts[postIndex]
  } catch (error) {
    console.error("Error updating post:", error)
    throw new Error("Failed to update post")
  }
}

// Update a pending post
export async function updatePendingPost(
  id: string,
  userId: string,
  updatedData: Partial<Omit<Post, "id" | "slug" | "status">>,
): Promise<Post> {
  ensureDataDir()

  try {
    const posts = await getPosts()
    const postIndex = posts.findIndex((post) => post.id === id && post.author === userId && post.status === "pending")

    if (postIndex === -1) {
      throw new Error("Post not found or not eligible for editing")
    }

    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedData,
      // If the title is updated, update the slug as well
      slug: updatedData.title
        ? updatedData.title
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, "-")
        : posts[postIndex].slug,
    }

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))

    return posts[postIndex]
  } catch (error) {
    console.error("Error updating pending post:", error)
    throw new Error("Failed to update pending post")
  }
}

// Delete a pending post
export async function deletePendingPost(id: string, userId: string): Promise<void> {
  ensureDataDir()

  try {
    const posts = await getPosts()
    const postIndex = posts.findIndex((post) => post.id === id && post.author === userId && post.status === "pending")

    if (postIndex === -1) {
      throw new Error("Post not found or not eligible for deletion")
    }

    posts.splice(postIndex, 1)

    // Write the updated posts back to the file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error deleting pending post:", error)
    throw new Error("Failed to delete pending post")
  }
}

// Get pending posts for a specific user
export async function getUserPendingPosts(userId: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter((post) => post.author === userId && post.status === "pending")
}

