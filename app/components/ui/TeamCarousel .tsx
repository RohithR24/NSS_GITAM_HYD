"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export const  TeamCarousel: React.FC<{ years: string[], selectedYear: string, onYearSelect: (year: string) => void }> = 
  ({ years, selectedYear, onYearSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0)
        setShowRightArrow(
          scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        )
      }
    }

    scrollRef.current?.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => scrollRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12 flex items-center justify-center">
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-[#000040]" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {years.map((year) => (
          <motion.button
            key={year}
            className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              selectedYear === year
                ? 'bg-[#000040] text-white'
                : 'bg-white text-[#000040] border border-[#000040] hover:bg-[#cc4444] hover:text-white hover:border-[#cc4444]'
            }`}
            onClick={() => onYearSelect(year)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Team {year}
          </motion.button>
        ))}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-[#000040]" />
        </button>
      )}
    </div>
  )
}