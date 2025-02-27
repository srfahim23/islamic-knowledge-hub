"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, BookOpen, PenTool } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" || window.matchMedia("(prefers-color-scheme: dark)").matches

    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!darkMode).toString())
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Islamic Knowledge Hub
          </Link>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/posts" className="hover:text-primary transition-colors">
              All Posts
            </Link>
            <Link href="/hadith" className="hover:text-primary transition-colors">
              Hadith Collection
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/submit-post" className="hover:text-primary transition-colors flex items-center">
              <PenTool className="mr-1 h-4 w-4" />
              Submit Post
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun /> : <Moon />}
            </Button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/posts"
                className="hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Posts
              </Link>
              <Link
                href="/hadith"
                className="hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hadith Collection
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/submit-post"
                className="hover:text-primary transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PenTool className="mr-1 h-4 w-4" />
                Submit Post
              </Link>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun /> : <Moon />}
                </Button>
                <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

