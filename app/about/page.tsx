import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Heart, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Islamic Knowledge Hub</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-lg mb-4">
            Islamic Knowledge Hub is dedicated to sharing authentic Islamic knowledge and teachings to help guide and
            inspire Muslims around the world. Our mission is to provide reliable and accessible Islamic content that can
            benefit people in their daily lives.
          </p>

          <p className="text-lg mb-4">
            We believe in the importance of seeking knowledge in Islam, as the Prophet Muhammad ﷺ said: "Seeking
            knowledge is obligatory upon every Muslim." Through this platform, we aim to make Islamic knowledge more
            accessible to everyone.
          </p>

          <p className="text-lg mb-4">
            Our content is carefully researched and verified to ensure authenticity. We focus on providing hadith,
            Quranic interpretations, and Islamic teachings that are relevant to contemporary life while staying true to
            the principles of Islam.
          </p>

          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>Spreading authentic knowledge</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              To provide authentic Islamic knowledge that is accessible to everyone, helping Muslims connect with their
              faith and apply Islamic teachings in their daily lives.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Our Values</CardTitle>
                <CardDescription>What guides our work</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Authenticity in all content we share</li>
                <li>Respect for diverse Islamic perspectives</li>
                <li>Clarity and accessibility in presentation</li>
                <li>Relevance to contemporary life</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Our Community</CardTitle>
                <CardDescription>Growing together in faith</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              We're building a community of knowledge seekers who are passionate about learning and sharing Islamic
              teachings. Join us in this journey of growth and enlightenment.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

