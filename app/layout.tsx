import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Naskh_Arabic } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-noto-naskh-arabic" })

export const metadata: Metadata = {
  title: "Islamic Knowledge Hub",
  description: "A collection of authentic hadith and Islamic teachings",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoNaskhArabic.variable}`}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Header should only appear once in the root layout */}
          <Header />
          {/* This will render page content based on the current route */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
