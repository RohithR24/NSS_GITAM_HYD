"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { TJIYLC, NtrTrust, LionsClub, GHMC1, HarithHaramLogo } from "../../../public/images/index"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CollaboratorProps {
  src: any
  alt: string
}

const Collaborator: React.FC<CollaboratorProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white rounded-lg shadow-lg p-4 w-40 h-40 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain"
            className="transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  )
}

export default function Collaborations() {
  const collaborators = [
    { src: TJIYLC, alt: "TJIYLC" },
    { src: NtrTrust, alt: "NTR Trust" },
    { src: LionsClub, alt: "Lions Club" },
    { src: GHMC1, alt: "GHMC" },
    { src: HarithHaramLogo, alt: "HarithaHaram Logo" },
    { src: TJIYLC, alt: "TJIYLC" },
    { src: NtrTrust, alt: "NTR Trust" },
    { src: LionsClub, alt: "Lions Club" },
    { src: GHMC1, alt: "GHMC" },
    { src: HarithHaramLogo, alt: "HarithaHaram Logo" }
    
    // Add more collaborators if needed to ensure at least 5 are always visible
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % collaborators.length)
    }, 10000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % collaborators.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + collaborators.length) % collaborators.length)
  }

  return (
    <section className="bg-[#000040] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Collaborations
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            {/* <AnimatePresence initial={false}> */}
              <div
                key={currentIndex}
                className="flex justify-center items-center"
              >
                <div className="flex space-x-8">
                  {[...Array(5)].map((_, i) => (
                    <Collaborator
                      key={i}
                      {...collaborators[(currentIndex + i) % collaborators.length]}
                    />
                  ))}
                </div>
              </div>
            {/* </AnimatePresence> */}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#cc4444] text-white p-2 rounded-full hover:bg-[#aa3333] transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#cc4444] text-white p-2 rounded-full hover:bg-[#aa3333] transition-colors duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {collaborators.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-[#cc4444]' : 'bg-white opacity-50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}