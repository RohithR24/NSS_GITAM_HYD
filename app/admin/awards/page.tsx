'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { uploadImageToFirebase, saveAwardToFirebase, deleteAwardFromFirebase, fetchAwardsFromFirebase } from '@/api'; 
import { Award } from '@/types';
const NSS_NAVY = '#000040';

export default function AdminDashboard() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAward, setCurrentAward] = useState<Award>({ id: '', title: '', image: '', location: '', date: '', description: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const fetchedAwards = await fetchAwardsFromFirebase();
        setAwards(fetchedAwards);
      } catch (error) {
        console.error("Error loading awards:", error);
      }
    };
    loadAwards();
  }, []);

  const openModal = (award: Award = { id: '', title: '', image: '', location: '', date: '', description: '' }) => {
    setCurrentAward(award);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAward({ id: '', title: '', image: '', location: '', date: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const awardId = currentAward.id || Date.now().toString();

    try {
      // Upload image if a new one is selected
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const imageUrl = await uploadImageToFirebase(file);
        currentAward.image = imageUrl;
      }

      // Save award data to Firestore
      await saveAwardToFirebase({ ...currentAward, id: awardId });
      setAwards((prevAwards) =>
        currentAward.id ? prevAwards.map((a) => (a.id === currentAward.id ? currentAward : a)) : [...prevAwards, { ...currentAward, id: awardId }]
      );

      closeModal();
    } catch (error) {
      console.error("Error saving award:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAwardFromFirebase(id);
      setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      uploadImageToFirebase(file)
        .then((imageUrl) => setCurrentAward((prev) => ({ ...prev, image: imageUrl })))
        .catch(console.error)
        .finally(() => setUploading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 className="text-4xl font-bold text-center mb-12" style={{ color: NSS_NAVY }}>NSS Awards Admin Dashboard</motion.h1>

      <div className="mb-8 text-center">
        <button onClick={() => openModal()} className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Plus className="mr-2" /> Add New Award
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-8">
        {awards.map((award) => (
          <motion.div key={award.id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="relative overflow-hidden rounded-lg" style={{ paddingBottom: '100%' }}>
              <Image fill src={award.image} alt={award.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center" style={{ color: NSS_NAVY }}>{award.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{award.location}</p>
            <p className="mt-1 text-sm text-gray-600">{award.date}</p>
            <p className="mt-2 text-sm text-gray-700">{award.description}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={() => openModal(award)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Edit</button>
              <button onClick={() => handleDelete(award.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ color: NSS_NAVY }}>{currentAward.id ? 'Edit Award' : 'Add New Award'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" value={currentAward.title} onChange={(e) => setCurrentAward({ ...currentAward, title: e.target.value })} className="mt-1 block w-full rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="mt-1" accept="image/*" />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" id="location" value={currentAward.location} onChange={(e) => setCurrentAward({ ...currentAward, location: e.target.value })} className="mt-1 block w-full rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" id="date" value={currentAward.date} onChange={(e) => setCurrentAward({ ...currentAward, date: e.target.value })} className="mt-1 block w-full rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" value={currentAward.description} onChange={(e) => setCurrentAward({ ...currentAward, description: e.target.value })} className="mt-1 block w-full rounded-md" rows={3}></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded" disabled={uploading || saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
