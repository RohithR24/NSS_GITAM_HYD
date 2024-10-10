"use client";

import React, { useState } from "react";
import { Gallery, Tabs } from "@/components/ui/index";
import { initiativeFocusAreas } from "@/constants";

export default function Initiatives() {
  // Only track the active tab in the state
  const [activeTab, setActiveTab] = useState(initiativeFocusAreas[0].id);

  // Get selected initiative dynamically from the focusAreas array
  const selectedInitiative = initiativeFocusAreas.find(
    (area) => area.id === activeTab
  );

  // If for any reason the selectedInitiative isn't found (edge case), provide fallback
  if (!selectedInitiative) {
    return <div>Error: Focus area not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Focus Areas of Impact
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Discover how our programs in education, environment, health, and
          community service are driving impactful change in society.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        title={initiativeFocusAreas.map((area) => ({
          id: area.id,
          name: area.name,
        }))}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />

      {/* Gallery */}
      <Gallery
        id={selectedInitiative.id}
        name={selectedInitiative.name}
        initiatives={selectedInitiative.initiatives}
      />
    </div>
  );
}
