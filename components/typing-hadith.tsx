"use client"

import { useState, useEffect } from "react"

// Sample hadith excerpts to display with typing animation
const hadithExcerpts = [
  "The Prophet ﷺ said: 'The best of you are those who learn the Quran and teach it.'",
  "The Prophet ﷺ said: 'None of you truly believes until he loves for his brother what he loves for himself.'",
  "The Prophet ﷺ said: 'The strong person is not the one who can wrestle someone down. The strong person is the one who can control himself when he is angry.'",
  "The Prophet ﷺ said: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.'",
  "The Prophet ﷺ said: 'Smiling in the face of your brother is an act of charity.'",
  "The Prophet ﷺ said: 'Make things easy and do not make them difficult, cheer people up and do not drive them away.'",
  "The Prophet ﷺ said: 'The most beloved of deeds to Allah are those that are most consistent, even if they are small.'",
]

// This component displays a hadith excerpt with a typing animation effect
export default function TypingHadith() {
  // State to track the current hadith excerpt index
  const [excerptIndex, setExcerptIndex] = useState(0)
  // State to track the currently displayed text (for typing animation)
  const [displayText, setDisplayText] = useState("")
  // State to track if we're currently typing or deleting
  const [isTyping, setIsTyping] = useState(true)
  // State to track the current character position
  const [charIndex, setCharIndex] = useState(0)

  // Effect to handle the typing animation
  useEffect(() => {
    const currentExcerpt = hadithExcerpts[excerptIndex]

    // If typing, add characters; if deleting, remove characters
    if (isTyping) {
      // If we haven't typed the full excerpt yet
      if (charIndex < currentExcerpt.length) {
        // Set a timeout to add the next character
        const timeout = setTimeout(() => {
          setDisplayText(currentExcerpt.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 50) // Typing speed

        return () => clearTimeout(timeout)
      } else {
        // Once we've typed the full excerpt, wait a bit then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000) // Pause at the end of typing

        return () => clearTimeout(timeout)
      }
    } else {
      // If we still have characters to delete
      if (charIndex > 0) {
        // Set a timeout to remove the next character
        const timeout = setTimeout(() => {
          setDisplayText(currentExcerpt.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 30) // Deleting speed (faster than typing)

        return () => clearTimeout(timeout)
      } else {
        // Once we've deleted all characters, move to the next excerpt
        const timeout = setTimeout(() => {
          setExcerptIndex((prevIndex) => (prevIndex + 1) % hadithExcerpts.length)
          setIsTyping(true)
        }, 500) // Pause before starting the next excerpt

        return () => clearTimeout(timeout)
      }
    }
  }, [charIndex, excerptIndex, isTyping])

  return (
    <div className="bg-muted p-6 rounded-lg shadow-md">
      <p className="text-lg font-medium text-primary mb-2">Hadith of the Moment:</p>
      <p className="text-xl min-h-[4rem]">
        {displayText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  )
}

