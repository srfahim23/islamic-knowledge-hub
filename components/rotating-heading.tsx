"use client"

import { useState, useEffect } from "react"
import { hadiths } from "@/lib/hadith-data"

export default function RotatingHeading() {
  // Get 5 random hadiths
  const randomHadiths = hadiths.sort(() => 0.5 - Math.random()).slice(0, 5)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomHadiths.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [randomHadiths.length])

  const currentHadith = randomHadiths[currentIndex]

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 transition-opacity duration-500">
        {currentHadith.textBengali}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground">{currentHadith.textEnglish}</p>
      <p className="text-sm md:text-base text-primary-foreground/70 font-arabic">{currentHadith.textArabic}</p>
    </div>
  )
}

