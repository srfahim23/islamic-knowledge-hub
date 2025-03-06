import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
}

const BlogPage = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Islamic Blogs</h1>
      <ul>
        {blogData.length > 0 ? (
          blogData.map((blog) => (
            <li key={blog.id} className="mb-4">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p>{blog.content}</p>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default BlogPage;
