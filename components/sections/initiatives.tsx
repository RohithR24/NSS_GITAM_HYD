;"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {BookDistribution} from '@/public/images/index'
interface FocusArea {
  id: string
  name: string
  initiatives: {
    image: string
    caption: string
  }[]
}

const focusAreas: FocusArea[] = [
  {
    id: 'education',
    name: 'Education',
    initiatives: [
      { image: '/placeholder.svg?height=300&width=400', caption: 'Literacy campaign in rural areas' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Computer education for underprivileged children' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Adult education programs' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Adult education programs' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Adult education programs' }
    ],
  },
  {
    id: 'environment',
    name: 'Environment',
    initiatives: [
      { image: '/placeholder.svg?height=300&width=400', caption: 'Tree plantation drive' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Plastic-free campus campaign' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Water conservation project' },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    initiatives: [
      { image: '/placeholder.svg?height=300&width=400', caption: 'Blood donation camp' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'COVID-19 awareness program' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Yoga and meditation workshop' },
    ],
  },
  {
    id: 'community',
    name: 'Community Service',
    initiatives: [
      { image: '/placeholder.svg?height=300&width=400', caption: 'Village adoption program' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Cleanliness drive in local community' },
      { image: '/placeholder.svg?height=300&width=400', caption: 'Elderly care initiative' },
    ],
  },
]

export default function Initiatives() {
  const [activeTab, setActiveTab] = useState(focusAreas[0].id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Focus Areas of Impact
      </h2>
      <p className="text-xl text-gray-600 text-center mb-12">
        Explore the diverse initiatives of the National Service Scheme across various domains.
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === area.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={activeTab === area.id ? 'page' : undefined}
              >
                {area.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {focusAreas
            .find((area) => area.id === activeTab)
            ?.initiatives.map((initiative, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={BookDistribution}
                  alt={initiative.caption}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">{initiative.caption}</p>
                </div>
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
