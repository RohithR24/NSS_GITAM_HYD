'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react'

// NSS Colors
const NSS_NAVY = '#000040'

// Define the initial awards data
const initialAwards = [
  { id: 1, title: "Best NSS Unit Award", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
  { id: 2, title: "Outstanding Community Service", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
  { id: 3, title: "Environmental Conservation Award", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
  { id: 4, title: "Youth Leadership Excellence", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
  { id: 5, title: "Best NSS Programme Officer", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
  { id: 6, title: "National Integration Camp Award", image: "/placeholder.svg?height=300&width=300", location: "", date: "", description: "" },
]

interface Award {
  id: number
  title: string
  image: string
  location: string
  date: string
  description: string
}

export default function AdminDashboard() {
  const [awards, setAwards] = useState<Award[]>(initialAwards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAward, setCurrentAward] = useState<Award>({ id: 0, title: '', image: '', location: '', date: '', description: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openModal = (award: Award = { id: 0, title: '', image: '', location: '', date: '', description: '' }) => {
    setCurrentAward(award)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAward({ id: 0, title: '', image: '', location: '', date: '', description: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentAward.id) {
      setAwards(awards.map(award => award.id === currentAward.id ? currentAward : award))
    } else {
      setAwards([...awards, { ...currentAward, id: Date.now() }])
    }
    closeModal()
  }

  const deleteAward = (id: number) => {
    setAwards(awards.filter(award => award.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentAward({ ...currentAward, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12"
        style={{ color: NSS_NAVY }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        NSS Awards Admin Dashboard
      </motion.h1>

      <div className="mb-8 text-center">
        <button
          onClick={() => openModal()}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Plus className="mr-2" />
          Add New Award
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((award) => (
          <motion.div
            key={award.id}
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-lg" style={{ paddingBottom: '100%' }}>
              <Image
                fill
                src={award.image}
                alt={award.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center" style={{ color: NSS_NAVY }}>{award.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{award.location}</p>
            <p className="mt-1 text-sm text-gray-600">{award.date}</p>
            <p className="mt-2 text-sm text-gray-700">{award.description}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => openModal(award)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Edit className="mr-2" size={16} />
                Edit
              </button>
              <button
                onClick={() => deleteAward(award.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Trash2 className="mr-2" size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ color: NSS_NAVY }}>
              {currentAward.id ? 'Edit Award' : 'Add New Award'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={currentAward.title}
                  onChange={(e) => setCurrentAward({ ...currentAward, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Upload className="mr-2" size={16} />
                    Upload Image
                  </button>
                  {currentAward.image && (
                    <span className="ml-3 text-sm text-gray-600">Image selected</span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  value={currentAward.location}
                  onChange={(e) => setCurrentAward({ ...currentAward, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  value={currentAward.date}
                  onChange={(e) => setCurrentAward({ ...currentAward, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={currentAward.description}
                  onChange={(e) => setCurrentAward({ ...currentAward, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <X className="mr-2" size={16} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <Plus className="mr-2" size={16} />
                  {currentAward.id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}