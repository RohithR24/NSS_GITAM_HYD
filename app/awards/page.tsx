"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award } from "@/types";
import { fetchAwardsFromFirebase } from "@/api";
// Define the awards data outside of the component to avoid potential issues with serialization

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);

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
  });
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
            className="bg-[#000080] p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="relative overflow-hidden rounded-lg "
              style={{ paddingBottom: "100%" }}
            >
              <div className="absolute inset-0 border-8 border-[#CCA43B] rounded-lg">
                <Image
                  fill
                  src={award.image}
                  alt={award.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="bg-[#D4AF37] rounded-full py-2 px-6 flex items-center justify-between">
                <div className="w-2 h-2 rounded-full bg-[#000040]" />
                <h1 className="text-[#000040] text-xl font-medium">
                  {award.title}
                </h1>
                <div className="w-2 h-2 rounded-full bg-[#000040]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
