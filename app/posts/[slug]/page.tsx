import { getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await getPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center text-muted-foreground mb-8">
          <div className="flex items-center mr-6">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t">
          <h3 className="text-xl font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

