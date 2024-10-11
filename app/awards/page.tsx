"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {hero} from'@/public/images/index'
// Define the awards data outside of the component to avoid potential issues with serialization
const awards = [
  { id: 1, title: "Best NSS Unit Award", image: "/placeholder.svg?height=300&width=300" },
  { id: 2, title: "Outstanding Community Service", image: "/placeholder.svg?height=300&width=300" },
  { id: 3, title: "Environmental Conservation Award", image: "/placeholder.svg?height=300&width=300" },
  { id: 4, title: "Youth Leadership Excellence", image: "/placeholder.svg?height=300&width=300" },
  { id: 5, title: "Best NSS Programme Officer", image: "/placeholder.svg?height=300&width=300" },
  { id: 6, title: "National Integration Camp Award", image: "/placeholder.svg?height=300&width=300" },
]

export default function Awards() {
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 
        className="text-4xl font-bold text-center text-blue-900 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        NSS Awards Gallery
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((award) => (
          <motion.div
            key={award.id}
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative overflow-hidden rounded-lg" style={{ paddingBottom: '100%' }}>
              <div className="absolute inset-0 border-8 border-yellow-500 rounded-lg">
                <Image
                fill
                  src={hero}
                  alt={award.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center text-blue-800">{award.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  )
}