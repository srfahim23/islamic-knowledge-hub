"use server";
import { db } from "./firebase";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Define the Post type
export type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "pending" | "approved" | "rejected";
};

const postsCollection = collection(db, "posts");

// Get all posts
export async function getPosts(): Promise<Post[]> {
  try {
    const querySnapshot = await getDocs(postsCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Create a new post
export async function createPost(postData: Omit<Post, "id" | "slug" | "status">): Promise<Post> {
  try {
    const id = uuidv4();
    const slug = postData.title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
    const newPost: Post = { id, slug, status: "pending", ...postData };
    await setDoc(doc(postsCollection, id), newPost);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}

// Update post status
export async function updatePostStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  try {
    await updateDoc(doc(postsCollection, id), { status });
  } catch (error) {
    console.error("Error updating post status:", error);
    throw new Error("Failed to update post status");
  }
}

// Delete a post
export async function deletePost(id: string): Promise<void> {
  try {
    await deleteDoc(doc(postsCollection, id));
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}

// Update a post
export async function updatePost(id: string, updatedData: Partial<Omit<Post, "id" | "slug">>): Promise<void> {
  try {
    const updateFields: Partial<Post> = { ...updatedData };
    if (updatedData.title) {
      updateFields.slug = updatedData.title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
    }
    await updateDoc(doc(postsCollection, id), updateFields);
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
}

// Get pending posts for a specific user
export async function getUserPendingPosts(userId: string): Promise<Post[]> {
  try {
    const q = query(postsCollection, where("author", "==", userId), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post);
  } catch (error) {
    console.error("Error fetching user pending posts:", error);
    return [];
  }
}

// Function to update pending posts
export async function updatePendingPost(id: string, status: "approved" | "rejected"): Promise<void> {
  return updatePostStatus(id, status);
}

// Function to delete pending posts
export async function deletePendingPost(id: string): Promise<void> {
  return deletePost(id);
}
