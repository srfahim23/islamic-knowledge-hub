import { hadiths } from "@/lib/hadith-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HadithPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hadith Collection</h1>

      <div className="grid gap-6">
        {hadiths.map((hadith) => (
          <Card key={hadith.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Narrated by {hadith.narrator}</span>
                {hadith.grade && (
                  <Badge variant={hadith.grade === "sahih" ? "default" : "secondary"}>{hadith.grade}</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Source: {hadith.source}
                {hadith.book && ` | ${hadith.book}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{hadith.text}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {hadith.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

