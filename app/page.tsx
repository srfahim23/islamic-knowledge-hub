import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import RotatingHeading from "@/components/rotating-heading"
import { hadiths } from "@/lib/hadith-data"

export default async function Home() {
  // Fetch all posts to display on the homepage
  const posts = await getPosts()

  // Get 5 random hadiths to display
  const randomHadiths = hadiths.sort(() => 0.5 - Math.random()).slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section with rotating heading */}
      <section className="mb-12">
        <RotatingHeading />
      </section>

      {/* Hadith collection section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Hadiths</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {randomHadiths.map((hadith) => (
            <Card key={hadith.id}>
              <CardHeader>
                <CardTitle className="text-lg">{hadith.narrator}</CardTitle>
                <CardDescription>{hadith.source}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{hadith.textBengali}</p>
                <p className="text-sm text-muted-foreground">{hadith.textEnglish}</p>
                <p className="text-xs text-primary-foreground/70 font-arabic">{hadith.textArabic}</p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {hadith.topics.map((topic) => (
                    <span key={topic} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild>
            <Link href="/hadith">View All Hadiths</Link>
          </Button>
        </div>
      </section>

      {/* Latest posts section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Button asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="line-clamp-2">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{formatDate(post.date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{post.content.substring(0, 150)}...</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/posts/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter section */}
      <section className="mb-12 bg-muted p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">Stay updated with the latest posts and Islamic teachings.</p>
        </div>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>
    </div>
  )
}

