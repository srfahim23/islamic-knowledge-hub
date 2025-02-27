import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Islamic Knowledge Hub</h3>
            <p className="text-muted-foreground">
              Sharing authentic Islamic knowledge and teachings to help guide and inspire.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-muted-foreground hover:text-primary transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">Follow us on social media for daily reminders and updates.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Islamic Knowledge Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

