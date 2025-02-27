import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    // Real-time data fetching
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());
      setPosts(fetchedPosts);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title} - {post.status}</li>
        ))}
      </ul>
    </div>
  );
}
