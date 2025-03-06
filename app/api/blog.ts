// app/api/blog.ts

export async function GET() {
    // Example static data or fetch from a blog API or database
    const blogData = [
      { id: 1, title: "Understanding the Quran", content: "A brief discussion on the Quran..." },
      { id: 2, title: "The Importance of Prayer", content: "Why prayer is important in Islam..." },
      // Add more blog posts here
    ];
  
    return new Response(JSON.stringify(blogData), { status: 200 });
  }
  