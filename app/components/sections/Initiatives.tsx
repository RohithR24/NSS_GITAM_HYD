"use client";

import React, { useState, useEffect } from "react";
import { Gallery, InitiativesModal } from "@/app/components/ui/index";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchFocusAreas } from "@/api"; // Import Firebase data fetching function
import { InitiativeFocusArea } from "@/types";

export default function Initiatives() {
  const [focusAreas, setFocusAreas] = useState<InitiativeFocusArea[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Fetch data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFocusAreas(); // Fetch data using Firebase API
        setFocusAreas(data);
        setActiveTab(data[0]?.id || null); // Set the first tab as active by default
        setLoading(false);
      } catch (error) {
        setError("Failed to load focus areas");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setActiveTab(sectionId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const selectedInitiative = focusAreas.find((area) => area.id === activeTab);

  if (!selectedInitiative) {
    return <div>Error: Focus area not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-[#000040] mb-6">
          Focus Areas of Impact
        </h1>
        <p className="mt-6 text-xl text-[#000040] max-w-2xl mx-auto">
          Discover how our programs in education, environment, health, and
          community service are driving impactful change in society.
        </p>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-3">
        {focusAreas.map((area) => (
          <div key={area.id} className="rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection(area.id)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-md flex justify-between items-center text-left"
            >
              <span className="text-[#000040] font-medium">{area.name}</span>
              <motion.div
                animate={{ rotate: expandedSection === area.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-[#cc4444]" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedSection === area.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white" onClick={openModal}>
                    <Gallery
                      id={area.id}
                      name={area.name}
                      initiatives={area.initiatives}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg p-1 shadow-sm mb-6">
          <div className="flex rounded-lg bg-gray-100 p-1">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === area.id
                    ? "bg-[#000040] text-white"
                    : "text-[#000040] hover:bg-[#cc4444] hover:text-white"
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>
        <div onClick={openModal}>
          <Gallery
            id={selectedInitiative.id}
            name={selectedInitiative.name}
            initiatives={selectedInitiative.initiatives}
          />
        </div>
      </div>

      {/* Initiatives Modal */}
      {isOpen && (
        <InitiativesModal isModelOpen={isOpen} closeModal={closeModal}  />
      )}
    </div>
  );
}
